import DeleteDialog from '@/components/shared/delete-dialog'
import Pagination from '@/components/shared/pagination'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deleteOrder, getAllOrders } from '@/lib/actions/order.actions'
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

export default async function Orders({page}: {page: string}) {
    const orders = await getAllOrders({
        page: Number(page),
        limit: 2,
        query: 'all'
    })

    console.log('Orders: ',orders)

  return (
    <div className='space-y-2'>
        <h2 className='h2-bold'>Orders</h2>

        <div className="overflow-x-auto">
            <Table>
                {/* Header */}
                <TableHeader>
                    <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>DATE</TableHead>
                    <TableHead>TOTAL</TableHead>
                    <TableHead>PAID</TableHead>
                    <TableHead>DELIVERED</TableHead>
                    <TableHead>ACTIONS</TableHead>
                    </TableRow>
                </TableHeader>

                {/* Body */}
                <TableBody>
                {orders.data.map((order) => (
                    <TableRow key={order.id}>
                    <TableCell>{formatId(order.id)}</TableCell>
                    <TableCell>
                        {formatDateTime(order.createdAt).dateTime}
                    </TableCell>
                    <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                    <TableCell>
                        {order.isPaid && order.paidAt
                        ? formatDateTime(order.paidAt).dateTime
                        : 'Not Paid'}
                    </TableCell>
                    <TableCell>
                        {order.isDelivered && order.deliveredAt
                        ? formatDateTime(order.deliveredAt).dateTime
                        : 'Not Delivered'}
                    </TableCell>
                    <TableCell>
                        <Button asChild variant='outline' size='sm'>
                            <Link href={`/order/${order.id}`}>
                                Details
                            </Link>
                        </Button>
                        <DeleteDialog id={order.id} action={deleteOrder}/>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
                
            </Table>

            {
                orders.totalPages > 1 && (
                    <Pagination
                    page={Number(page) || 1}
                    totalPage={orders?.totalPages}
                    />
                )
                }
        </div>
    </div>
  )
}
