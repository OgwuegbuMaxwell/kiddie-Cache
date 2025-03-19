import { auth } from '@/auth';
import Orders from '@/components/admin/orders/orders';
import OrdersSkeleton from '@/components/admin/orders/orders-skeleton';
import React, { Suspense } from 'react'


export default async function AdminOrdersPage(props: {searchParams: Promise<{page: string; query: string}>}) {


    // const { page = '1' } = await props.searchParams;

    // query: searchText ---> simply renaming query to searhcText
    const { page = '1', query: searchText } = await props.searchParams;

    const session = await auth();

    if(session?.user?.role !== 'admin') throw new Error('User is not authorized')

    

    return (
        <Suspense fallback={<OrdersSkeleton />}>
            <Orders page={page} query={searchText}/>
        </Suspense>
    )
}
