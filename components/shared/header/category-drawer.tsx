import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { getAllCategories } from '@/lib/actions/product-actions'
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default async function CategoryDrawer() {
    const categories = await getAllCategories();


  return (
    <Drawer direction='left'>
        <DrawerTrigger asChild>
            <Button variant='outline'>
                <MenuIcon/>
            </Button>
        </DrawerTrigger>

        <DrawerContent className='h-full max-w-sm'>
            <DrawerHeader>
                <DrawerTitle>Select a Category</DrawerTitle>
                <div className='space-y-1 mt-4'>
                {
                    categories.map((category, i) => (
                        <Button
                            asChild
                            key={i}
                            variant='ghost'
                            className='w-full justify-start'
                        >
                            <DrawerClose>
                                <Link 
                                    href={`/search?category=${category.category}`}
                                    className='w-full flex-start'
                                >
                                    {category.category} ({category._count})
                                </Link>
                            </DrawerClose>
                        </Button>
                    ))
                }
                </div>
            </DrawerHeader>
        </DrawerContent>
    </Drawer>
  )
}
