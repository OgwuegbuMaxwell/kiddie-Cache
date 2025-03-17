import { auth } from '@/auth';
import React, { Suspense } from 'react'
import Orders from './orders';
import OrdersSkeleton from './orders-skeleton';

export default async function AdminOrdersPage(props: {searchParams: Promise<{page: string}>}) {

    const { page = '1' } = await props.searchParams;
    const session = await auth();

    if(session?.user?.role !== 'admin') throw new Error('User is not authorized')

    

    return (
        <Suspense fallback={<OrdersSkeleton />}>
            <Orders page={page}/>
        </Suspense>
    )
}
