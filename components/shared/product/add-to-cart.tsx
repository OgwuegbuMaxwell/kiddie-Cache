"use client"
import { toast  } from "sonner"
// import loader from '@/assets/loader.gif'


import { CartItemType, UserCartReturnType } from "@/types"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Loader, Minus, Plus } from "lucide-react";
import { useTransition } from "react";

export default function AddToCart({item, cart} : {item: CartItemType, cart?: UserCartReturnType}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleAddToCart = async () => {
        startTransition(async () => {
            const res = await addItemToCart(item);

            if (!res.success) {
                // ❌ Show error toast when adding to cart fails
                toast.error(res.message, {
                    className: "!bg-red-600 !text-white",
                });

                return;
            }
    
            if(res.success) {
                // ✅ Show success toast when item is added to cart
                toast.success(res.message, {
                    className: "bg-green-600 text-white",
                    icon: "🛒",
                    action: {
                        label: "Go To Cart",
                        onClick: () => router.push('/cart'),
                    },
                });
            }

        })


    }

    // Handle remove from cart
    const handleRemoveFromCart = async() => {

        startTransition(async () => {
            const res = await removeItemFromCart(item.productId);

            if (!res.success) {
                // ❌ Show error toast when removing item from cart fails
                toast.error(res.message, {
                    className: "!bg-red-600 !text-white",
                });
    
                return;
            }
    
            if(res.success) {
                // ✅ Show success toast when item is added to cart
                toast.success(res.message, {
                    className: "bg-green-600 text-white",
                    // icon: "🛒",
                    // action: {
                    //     label: "Go To Cart",
                    //     onClick: () => router.push('/cart'),
                    // },
                });
            }
    
            return;
        })

    }

    // Check if item is in cart
    const existItem = cart && cart.items.find((x) =>x.productId === item.productId)

    return existItem ? (
        <div>
            <Button
                type="button"
                variant={'outline'}
                onClick={handleRemoveFromCart}
            >
                {
                    isPending ? (
                        <Loader className="w-4 h-4 animate-spin"/>
                    ) : (
                        <Minus className="w-4 h-4"/>
                    )
                }
            </Button>

            <span className="p-2">{existItem.qty}</span>

            <Button
                type="button"
                variant={'outline'}
                onClick={handleAddToCart}
            >
                {
                    isPending ? (
                        <Loader className="w-4 h-4 animate-spin"/>
                    ) : (
                        <Plus className="w-4 h-4"/>
                    )
                }
            </Button>

        </div>
    ) : (
        <Button
            className="w-full"
            type="button"
            onClick={handleAddToCart}
        >
                {
                    isPending ? (
                        <Loader className="w-4 h-4 animate-spin"/>
                    ) : (
                        <Plus className="w-4 h-4"/>
                    )
                }
            Add To Cart
        </Button>
      )

}




