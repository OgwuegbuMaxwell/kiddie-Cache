'use client'
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils"
import { OrderType } from "@/types"
import Image from "next/image";
import Link from "next/link";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import { createPayPalOrder, approvePayPalOrder, updateOrderToPaidCOD, deliverOrder }  from '@/lib/actions/order.actions'

import { toast  } from "sonner"
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export default function OrderDetailsTable({order, paypalClientId, isAdmin}: {order: OrderType, paypalClientId: string, isAdmin: boolean}) {

    const {
        id,
        shippingAddress, 
        orderItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        paymentMethod,
        isDelivered,
        isPaid,
        paidAt,
        deliveredAt
    } = order;


    const PrintLoadingState = () => {
        const [{isPending, isRejected}] = usePayPalScriptReducer();
        let status = '';
        if (isPending) {
            status = 'Loading PayPal...'
        } else if (isRejected) {
            status = 'Error Loading PayPal'
        }

        return status;

    }

    const handleCreatePaypalOrder = async () => {
        const res = await createPayPalOrder(order.id)

        if (!res.success) {
            toast.error(res.message, { className: "!bg-red-600 !text-white" });
        }

        return res.data;

    }


    const handleApprovePaypalOrder = async (data: {orderID: string}) => {
        const res = await approvePayPalOrder(order.id, data)

        if (!res.success) {
            toast.error(res.message, { className: "!bg-red-600 !text-white" });
            return;
        }

        if (res.success) {
            toast.success(res.message, { className: "bg-green-600 text-white" });
        }
    }

    // Button to mark order as paid
    const MarkAsPaidButton = () => {
        const [isPending, startTransition] = useTransition();
        return (
            <Button
                type="button"
                disabled={isPending}
                onClick={() => startTransition(async () => {
                    const res = await updateOrderToPaidCOD(order.id)
                    if (res.success) {
                        toast.success(res.message)
                    } else {
                        toast.error(res.message)
                    }
                })}
            >
                {
                    isPending ? 'Processing...' : 'Mark as Paid'
                }
            </Button>
        )
    }


    // Button to mark order as paid
    const MarkAsDeliveredButton = () => {
        const [isPending, startTransition] = useTransition();
        return (
            <Button
                type="button"
                disabled={isPending}
                onClick={() => startTransition(async () => {
                    const res = await deliverOrder(order.id)
                    if (res.success) {
                        toast.success(res.message)
                    } else {
                        toast.error(res.message)
                    }
                })}
            >
                {
                    isPending ? 'Processing...' : 'Mark as Delivered'
                }
            </Button>
        )
    }

    return (
        <>
            <h1 className="py-4 text-2xl">Order: {formatId(id)}</h1>

            <div className="grid md:grid-cols-3 md: gap-5">
                <div className="col-span-2 space-y-4 overflow-x-auto">
                    <Card>
                        <CardContent className="p-4 gap-4">
                            <h2 className="text-xl pb-4">Payment Method</h2>
                            <p className="mb-2">{paymentMethod}</p>
                            {
                                isPaid ? (
                                    <Badge variant='secondary'>
                                        Paid at {formatDateTime(paidAt!).dateOnly}
                                    </Badge>
                                ) : (
                                <Badge variant='destructive'>
                                    Not Paid
                                </Badge>
                                )
                            }
                        </CardContent>
                    </Card>

                    <Card className="my-2">
                        <CardContent className="p-4 gap-4">
                            <h2 className="text-xl pb-4">Shipping Address</h2>
                            <p>{shippingAddress.fullName}</p>

                            <p className="mb-2">
                                {shippingAddress.streetAddress}, {shippingAddress.city}
                                {shippingAddress.postalCode}, {shippingAddress.country}
                            </p>
                            {
                                isDelivered ? (
                                    <Badge variant='secondary'>
                                        Delivered at {formatDateTime(deliveredAt!).dateOnly}
                                    </Badge>
                                ) : (
                                <Badge variant='destructive'>
                                    Not Delivered
                                </Badge>
                                )
                            }
                        </CardContent>
                    </Card>

                    <Card className="p-4 gap-4">
                        <CardContent className="p-2 gap-4">
                            <h2 className="text-xl pb-4">Order Items</h2>
                            <Table>
                                {/* table header */}
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                    </TableRow>
                                </TableHeader>

                                {/* table body */}
                                <TableBody>
                                    {
                                    orderItems.map((item) => (
                                        <TableRow key={item.slug}>
                                            <TableCell>
                                                <Link href={`/product/${item.slug}`} className='flex items-center'>
                                                    <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={50}
                                                    height={50}
                                                    
                                                    />
                                                    <span className="px-2">{item.name}</span>
                                                </Link>
                                            </TableCell>

                                            <TableCell>
                                                <span className='px-2'>{item.qty}</span>
                                            </TableCell>

                                            <TableCell>
                                                <span className='text-right'>${item.price}</span>
                                            </TableCell>


                                        </TableRow>
                                    ))
                                    }
                                </TableBody>
                        </Table>
                        </CardContent>
                    </Card>
                </div>


                <div>
                    <Card>
                        <CardContent className='p-4 gap-4 space-y-4'>
                            <div className="flex justify-between">
                                <div>Item</div>
                                <div>{formatCurrency(itemsPrice)}</div>
                            </div>
    
                            <div className="flex justify-between">
                                <div>Tax</div>
                                <div>{formatCurrency(taxPrice)}</div>
                            </div>
    
                            <div className="flex justify-between">
                                <div>Shipping</div>
                                <div>{formatCurrency(shippingPrice)}</div>
                            </div>
    
                            <div className="flex justify-between">
                                <div>Total</div>
                                <div>{formatCurrency(totalPrice)}</div>
                            </div>

                            {/* Paypal payment */}
                            {
                                !isPaid && paymentMethod === 'PayPal' && (
                                    <PayPalScriptProvider options={{clientId: paypalClientId}}>
                                        <PrintLoadingState/>
                                        <PayPalButtons
                                            createOrder={handleCreatePaypalOrder}
                                            onApprove={handleApprovePaypalOrder}
                                        />
                                    </PayPalScriptProvider>
                                )
                            }
    
                            {/* Cash on delivery */}
                            {
                                isAdmin && !isPaid && paymentMethod === 'CashOnDelivery' && (
                                    <MarkAsPaidButton/>
                                )
                            }

                            {
                                isAdmin && isPaid && !isDelivered && (
                                    <MarkAsDeliveredButton/>
                                    
                                )
                            }
    
                        </CardContent>
                        
                    </Card>
                </div>
            </div>
        </>
    )
}
