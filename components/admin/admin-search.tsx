'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function AdminSearch() {
    const pathname = usePathname();
    const formActionUrl = pathname.includes('/admin/orders') ? 
        '/admin/orders' : pathname.includes('/admin/users') ? 
        '/admin/users': '/admin/products';

        const searchParams = useSearchParams();
        const [queryValue, setQueryValue] = useState(searchParams.get('query') || '');

        useEffect(() => {
            setQueryValue(searchParams.get('query') || '')
        }, [searchParams])



  return (
    <form action={formActionUrl} method="GET">
        <input type="search" 
            placeholder="Search..."
            name="query"
            value={queryValue}
            onChange={(e) => setQueryValue(e.target.value)}
            className="md:w-[100px] lg:w-[200px] focus:outline-none border-none focus:ring-1 focus:ring-gray-300"
        />
        <button className="sr-only">
            Search
        </button>
    </form>
  )
}
