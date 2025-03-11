"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserCartReturnType } from '@/types'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useRef, useState, useTransition } from 'react'
import { toast  } from "sonner"
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { ArrowRight, Loader, Minus, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

export default function CartTable({cart}: {cart?: UserCartReturnType}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isCheckoutPending, setCheckoutPending] = useState(false); // Separate state for this button

     // ✅ UseRef for tracking loading state per item (does not trigger re-renders)
     const loadingItemRef = useRef<{ [key: string]: boolean }>({});

     const handleRemoveItem = async (productId: string) => {
         if (loadingItemRef.current[productId]) return; // Prevent duplicate clicks
 
         loadingItemRef.current[productId] = true;
         startTransition(async () => {
             const res = await removeItemFromCart(productId);
             loadingItemRef.current[productId] = false;
 
             if (!res.success) {
                 toast.error(res.message, { className: "!bg-red-600 !text-white" });
                 return;
             }
 
             toast.success(res.message, { className: "bg-green-600 text-white" });
         });
     };
 
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     const handleAddItem = async (item: any) => {
         if (loadingItemRef.current[item.productId]) return;
 
         loadingItemRef.current[item.productId] = true;
         startTransition(async () => {
             const res = await addItemToCart(item);
             loadingItemRef.current[item.productId] = false;
 
             if (!res.success) {
                 toast.error(res.message, { className: "!bg-red-600 !text-white" });
                 return;
             }
 
             toast.success(res.message, { className: "bg-green-600 text-white" });
         });
     };


     const handleCheckout = () => {
        setCheckoutPending(true); // Start loading
        startTransition(() => {
            router.push('/shipping-address'); // Navigate to shipping
            setCheckoutPending(false); // Stop loading after navigation
        });
    };


  return (
    <>
        <h1 className="py-4 h2-bold">Shopping Cart</h1>

        {
            !cart || cart?.items.length === 0 ? (
                <div>
                    Cart is empty. &nbsp;
                    <Link href={'/'}>Go Shopping {'>>'}</Link>
                    
                </div>
            ) : (
                <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <Table>
                            {/*Table Header */}
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Item</TableHead>
                                    <TableHead className='text-center'>Quantity</TableHead>
                                    <TableHead className='text-right'>Price</TableHead>
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody>
                                {
                                    cart.items.map((item) => (
                                        <TableRow key={item.slug}>
                                            <TableCell>
                                                <Link 
                                                    href={`/product/${item.slug}`}
                                                    className='flex items-center'
                                                    >
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            width={50}
                                                            height={50}
                                                        />
                                                        <span className='px-2'>{item.name}</span>
                                                </Link>
                                            </TableCell>

                                            <TableCell className='flex-center gap-2'>
                                                <Button 
                                                    disabled={isPending} 
                                                    variant={'outline'} 
                                                    type='button'
                                                    onClick={() => handleRemoveItem(item.productId)}
                                                >
                                                    
                                                    {
                                                         loadingItemRef.current[item.productId] ? (
                                                            <Loader className='w-4 h-4 animate-spin'/>
                                                        ) : (
                                                            <Minus className='w-4 h-4'/>
                                                        )
                                                    }
                                                </Button>

                                                <span>{item.qty}</span>

                                                <Button 
                                                    disabled={isPending} 
                                                    variant={'outline'} 
                                                    type='button'
                                                    onClick={() => handleAddItem(item)}
                                                >
                                                    {
                                                        loadingItemRef.current[item.productId]  ? (
                                                            <Loader className='w-4 h-4 animate-spin'/>
                                                        ) : (
                                                            <Plus className='w-4 h-4'/>
                                                        )
                                                    }
                                                </Button>
                                            </TableCell>

                                            <TableCell className='text-right'>
                                                    ${item.price}
                                            </TableCell>


                                        </TableRow>
                                    ))
                                }
                            </TableBody>


                        </Table>
                    </div>

                    <Card>
                        <CardContent className='p-4 gap-4'>
                                <div className="pb-3 text-xl">
                                    Subtotal (
                                        {
                                            cart.items.reduce((a, c) => a + c.qty, 0)
                                        }
                                    ):
                                    <span className='font-bold'>
                                        &nbsp;{formatCurrency(cart.itemsPrice)}
                                    </span>
                                </div>

                                <Button
                                    disabled={isCheckoutPending}
                                    className='w-full'
                                    onClick={handleCheckout}
                                >
                                    {
                                        isCheckoutPending  ? (
                                            <Loader className='w-4 h-4 animate-spin'/>
                                        ) : (
                                            <ArrowRight className='w-4 h-4'/>
                                        )
                                    }
                                    Proceed to Checkout
                                </Button>
                        </CardContent>
                        
                    </Card>
                </div>
            )
        }

    </>
  )
}
