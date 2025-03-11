import { z } from "zod";
import { insertProductSchema, cartItemSchema, insertCartSchema, signInFormSchema, shippingAddressSchema } from "@/lib/validators";
import { Prisma } from "@prisma/client";

import { prisma } from "@/db/prisma"
import { getMyCart } from "@/lib/actions/cart.actions";


export type Product = z.infer<typeof insertProductSchema> & {
    id: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
};



// Store product Return type
// Extract the return type of the Prisma instance *after* modifications
export type StoreProductReturnType = Prisma.PromiseReturnType<typeof prisma.product.findMany>[0];


// Cart
export type CartType = z.infer<typeof insertCartSchema>;
export type CartItemType = z.infer<typeof cartItemSchema>;
export type  UserCartReturnType = Prisma.PromiseReturnType<
    typeof getMyCart
>;

// Shipping
export type ShippingAddressType = z.infer<typeof shippingAddressSchema>;



// Login and Logout
export type LoginType = z.infer<typeof signInFormSchema>
