import Pagination from '@/components/shared/pagination'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

export default function OrdersSkeleton() {
  return (
    <div className='space-y-2'>
        {/* <h2 className='h2-bold'>Orders</h2> */}
        <Skeleton className="h-4 w-[100px]" />

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
                    <TableRow >
                        <TableCell>
                            {/* {formatId(order.id)} */}
                            <Skeleton className="h-4 w-[120px]" />
                        </TableCell>
                        <TableCell>
                            {/* {formatDateTime(order.createdAt).dateTime} */}
                            <Skeleton className="h-4 w-[130px]" />
                        </TableCell>
                        <TableCell>
                            {/* {formatCurrency(order.totalPrice)} */}
                            <Skeleton className="h-4 w-[70px]" />
                        </TableCell>
                        <TableCell>
                            {/* {order.isPaid && order.paidAt
                            ? formatDateTime(order.paidAt).dateTime
                            : 'Not Paid'} */}
                            <Skeleton className="h-4 w-[130px]" />
                        </TableCell>
                        <TableCell>
                            {/* {order.isDelivered && order.deliveredAt
                            ? formatDateTime(order.deliveredAt).dateTime
                            : 'Not Delivered'} */}
                            <Skeleton className="h-4 w-[130px]" />
                        </TableCell>
                    <TableCell>
                        <Button asChild variant='outline' size='sm' disabled>
                            <Link href={`/`}>
                                {/* Details */}
                                <Skeleton className="h-4 w-[60px]" />
                            </Link>
                        </Button>
                        <Button asChild variant='outline' size='sm' disabled>
                            <Link href={`/`}>
                                {/* Details */}
                                <Skeleton className="h-4 w-[60px]" />
                            </Link>
                        </Button>
                    </TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>
                            {/* {formatId(order.id)} */}
                            <Skeleton className="h-4 w-[120px]" />
                        </TableCell>
                        <TableCell>
                            {/* {formatDateTime(order.createdAt).dateTime} */}
                            <Skeleton className="h-4 w-[130px]" />
                        </TableCell>
                        <TableCell>
                            {/* {formatCurrency(order.totalPrice)} */}
                            <Skeleton className="h-4 w-[70px]" />
                        </TableCell>
                        <TableCell>
                            {/* {order.isPaid && order.paidAt
                            ? formatDateTime(order.paidAt).dateTime
                            : 'Not Paid'} */}
                            <Skeleton className="h-4 w-[130px]" />
                        </TableCell>
                        <TableCell>
                            {/* {order.isDelivered && order.deliveredAt
                            ? formatDateTime(order.deliveredAt).dateTime
                            : 'Not Delivered'} */}
                            <Skeleton className="h-4 w-[130px]" />
                        </TableCell>
                    <TableCell>
                        <Button asChild variant='outline' size='sm' disabled>
                            <Link href={`/`}>
                                {/* Details */}
                                <Skeleton className="h-4 w-[60px]" />
                            </Link>
                        </Button>
                        <Button asChild variant='outline' size='sm' disabled>
                            <Link href={`/`}>
                                {/* Details */}
                                <Skeleton className="h-4 w-[60px]" />
                            </Link>
                        </Button>
                    </TableCell>
                    </TableRow>
               
                </TableBody>
                
            </Table>

            
            <Pagination
                page={Number(1)}
                totalPage={1}
            />
                
        </div>
    </div>
  )
}
