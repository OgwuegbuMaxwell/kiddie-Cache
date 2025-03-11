import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import React from 'react'

export default function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        <Card className='w-full max-w-sm'>
            {/* Card header */}
            <CardHeader className='p-0 items-center'>
            <Skeleton className="h-[200px] w-[250px] rounded-xl" />
            </CardHeader>

            {/* Card content */}
            <CardContent className='p-4 grid gap-4'>
                <div className="text-xs"><Skeleton className="h-4 w-[200px]" /></div>
                <Link
                    href={`/`} 
                >
                    <h2 className="text-sm font-medium"><Skeleton className="h-4 w-[100px]" /></h2>
                </Link>
                <div className="flex-between gap-4">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[80px]" />
                </div>
            </CardContent>
        </Card>


        <Card className='w-full max-w-sm'>
            {/* Card header */}
            <CardHeader className='p-0 items-center'>
            <Skeleton className="h-[200px] w-[250px] rounded-xl" />
            </CardHeader>

            {/* Card content */}
            <CardContent className='p-4 grid gap-4'>
                <div className="text-xs"><Skeleton className="h-4 w-[200px]" /></div>
                <Link
                    href={`/`} 
                >
                    <Skeleton className="h-4 w-[100px]" />
                </Link>
                <div className="flex-between gap-4">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[80px]" />
                </div>
            </CardContent>
        </Card>


        <Card className='w-full max-w-sm'>
            {/* Card header */}
            <CardHeader className='p-0 items-center'>
            <Skeleton className="h-[200px] w-[250px] rounded-xl" />
            </CardHeader>

            {/* Card content */}
            <CardContent className='p-4 grid gap-4'>
                <div className="text-xs"><Skeleton className="h-4 w-[200px]" /></div>
                <Link
                    href={`/`} 
                >
                    <Skeleton className="h-4 w-[100px]" />
                </Link>
                <div className="flex-between gap-4">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[80px]" />
                </div>
            </CardContent>
        </Card>


        <Card className='w-full max-w-sm'>
            {/* Card header */}
            <CardHeader className='p-0 items-center'>
            <Skeleton className="h-[200px] w-[250px] rounded-xl" />
            </CardHeader>

            {/* Card content */}
            <CardContent className='p-4 grid gap-4'>
                <div className="text-xs"><Skeleton className="h-4 w-[200px]" /></div>
                <Link
                    href={`/`} 
                >
                  <Skeleton className="h-4 w-[100px]" />
                </Link>
                <div className="flex-between gap-4">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[80px]" />
                </div>
            </CardContent>
        </Card>


        <Card className='w-full max-w-sm'>
            {/* Card header */}
            <CardHeader className='p-0 items-center'>
            <Skeleton className="h-[200px] w-[250px] rounded-xl" />
            </CardHeader>

            {/* Card content */}
            <CardContent className='p-4 grid gap-4'>
                <div className="text-xs"><Skeleton className="h-4 w-[200px]" /></div>
                <Link
                    href={`/`} 
                >
                    <Skeleton className="h-4 w-[100px]" />
                </Link>
                <div className="flex-between gap-4">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[80px]" />
                </div>
            </CardContent>
        </Card>



        <Card className='w-full max-w-sm'>
            {/* Card header */}
            <CardHeader className='p-0 items-center'>
            <Skeleton className="h-[200px] w-[250px] rounded-xl" />
            </CardHeader>

            {/* Card content */}
            <CardContent className='p-4 grid gap-4'>
                <div className="text-xs"><Skeleton className="h-4 w-[200px]" /></div>
                <Link
                    href={`/`} 
                >
                   <Skeleton className="h-4 w-[100px]" />
                </Link>
                <div className="flex-between gap-4">
                   <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[80px]" />
                </div>
            </CardContent>
        </Card>



    </div>
  )
}
