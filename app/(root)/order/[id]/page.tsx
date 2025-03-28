import { getOrderById } from '@/lib/actions/order.actions';
import { Metadata } from 'next'
import { notFound } from 'next/navigation';
import React from 'react'
import OrderDetailsTable from './order-details-table';
import { ShippingAddressType } from '@/types';
import { auth } from '@/auth';

export const metadata: Metadata  = {
    title: 'Order Detail'
}

export default async function OrderDetailsPage(props: {params: Promise<{id: string}>}) {

    const { id } = await props.params;

    const order = await getOrderById(id);
    if(!order)  notFound();

    const session = await auth()

    return (
        <OrderDetailsTable order={{
                ...order,
                shippingAddress: order.shippingAddress as ShippingAddressType,
                
            }}

            paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}

            isAdmin={session?.user?.role === 'admin' || false}

        />
       
    )
}
