"use server"

import { CartItemType } from "@/types";
import { convertToPlainObject, formatError, round2 } from "../utils";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { cartItemSchema, insertCartSchema } from "../validators";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

// Calculate cart prices
const calcPrice = (items: CartItemType[]) => {
    const itemsPrice = round2(
        items.reduce((acc, item) => acc + Number(item.price) *  item.qty, 0)
    ),

    shippingPrice = round2(itemsPrice > 100 ? 0 : 10),


   taxPrice = round2(0.15 * itemsPrice) ,

   totalPrice = round2(itemsPrice + taxPrice + shippingPrice);


   return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2)
   }

    
}


export async function addItemToCart(data: CartItemType) {

    try {
        // Check for cart cookie
        const sessionCartId = (await cookies()).get('sessionCartId')?.value;
        if(!sessionCartId) throw new Error('Cart session not found')

        // Get session and user Id
        const session = await auth();

        // if not logged in, return undefined
        const userId =  session?.user?.id ? (session.user.id as string) : undefined

        // Get cart
        const cart = await getMyCart();

        // parse and validate item
        const item = cartItemSchema.parse(data);

        // Find product in database
        const product  = await prisma.product.findFirst({
            where: {id: item.productId}
        })

        // Throw error if the product was not found
        if(!product) throw new Error('Product not found');

        // If no cart
        if (!cart) {
            // Create new cart object
            const newCart = insertCartSchema.parse({
                userId: userId,
                items: [item],
                sessionCartId: sessionCartId,
                ...calcPrice([item]),

            })

            // console.log(newCart)

            // Add to the database
            await prisma.cart.create({
                data: newCart
            });

            // Revalidate the product page
            revalidatePath(`/product/${product.slug}`)

            return {
                success: true,
                message: `${product.name} added to cart`,
            }
        } else {

            // Check if item is already in the cart
            const existItem = (cart.items as CartItemType[]).find((x) => x.productId === item.productId);
            if(existItem) {
                // Check stock
                if(product.stock < existItem.qty + 1) {
                    throw new Error('Not enough stock')
                }

                // Increase the quantity
                (cart.items as CartItemType[]).find((x) => x.productId === item.productId)!.qty = 
                    existItem.qty + 1;

            } else {
                // If item does not exist in cart

                // check stock
                if(product.stock < 1) throw new Error('Not enough stock')

                // Add item to cart.items
                cart.items.push(item);

            }

            // Save to database
            await prisma.cart.update({
                where: {id: cart.id},
                data: {
                    items: cart.items as Prisma.CartUpdateitemsInput[],
                    ...calcPrice(cart.items as CartItemType[])
                    // Spreading (...) ensures all those fields return by calcPrice included in the update.
                }
            })

            // Revalidate the product page
            revalidatePath(`/product/${product.slug}`)

            return {
                success: true,
                message: `${product.name} ${existItem ? 'updated in' : 'added to '} cart`,
            }


        }


        // console.log({
        //     'Session Cart ID': sessionCartId,
        //     'User ID': userId,
        //     // item requested to add to cart
        //     'Item Requested': item,
        //     'Product Found': product,
        //     'User Previous Cart': cart

        // })

        // return {
        //     success: true,
        //     message: 'Item added to the cart',
        // }
        
    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }


}


export async function getMyCart() {
    // Check for cart cookie
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if(!sessionCartId) throw new Error('Cart session not found')

    // Get session and user Id
    const session = await auth();
    // if not logged in, return undefined
    const userId =  session?.user?.id ? (session.user.id as string) : undefined

    // Get user cart from the database
    const cart = await prisma.cart.findFirst({
        where: userId? {userId: userId} : {sessionCartId: sessionCartId}
    })

    if(!cart) return undefined;

    // Convert decimals and return

    return convertToPlainObject({
        ...cart,
        items: cart.items as CartItemType[],
        itemsPrice: cart.itemsPrice.toString(),
        totalPrice: cart.totalPrice.toString(),
        shippingPrice: cart.shippingPrice.toString(),
        taxPrice: cart.taxPrice.toString(),
    });
    
}




// Remove item from cart

export async function removeItemFromCart(productId:string) {
    try {
        // Check for cart cookie
        const sessionCartId = (await cookies()).get('sessionCartId')?.value;
        if(!sessionCartId) throw new Error('Cart session not found')

        // Get product
        const product = await prisma.product.findFirst({
            where: {id: productId}
        });

        if(!product) throw new Error('Product not found')

        
        // Get user cart
        const cart = await getMyCart();
        if(!cart) throw new Error('Cart not found')

        // Check for item
        const exist = (cart.items as CartItemType[]).find((x) => x.productId === productId)
        
        if(!exist) throw new Error('Item not found')
        
        // Check if only one in qty
        if(exist.qty === 1) {
            // Remove from cart
            cart.items = (cart.items as CartItemType[]).filter((x) => x.productId !== exist.productId) 
        } else {
            // Decrease the quantity
            (cart.items as CartItemType[]).find((x) => x.productId === productId)!.qty = exist.qty - 1;
        }


        // Update cart in database
        await prisma.cart.update({
            where: {id: cart.id},
            data: {
                items: cart.items as Prisma.CartUpdateitemsInput[],
                ...calcPrice(cart.items as CartItemType[])
            }
        })

         // Revalidate the product page
         revalidatePath(`/product/${product.slug}`)

         return {
            success: true,
            message: `${product.name} was removed from cart`,
        }

            
    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
    
}




