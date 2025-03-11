import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductPrice from './product-price'

import { StoreProductReturnType } from '@/types'

export default function ProductCard({product} : {product: StoreProductReturnType}) {
  return (
    <Card className='w-full max-w-sm'>
        {/* Card header */}
        <CardHeader className='p-0 items-center'>
            <Link
                href={`/product/${product.slug}` }
            >
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    height={300}
                    width={300}
                    priority={true}
                />
            </Link>
        </CardHeader>

        {/* Card content */}
        <CardContent className='p-4 grid gap-4'>
            <div className="text-xs">{product.brand}</div>
            <Link
                href={`/product/${product.slug}`} 
            >
                <h2 className="text-sm font-medium">{product.name}</h2>
            </Link>
            <div className="flex-between gap-4">
                <p>{product.rating} Stars</p>
                {
                    product.stock > 0 ? (
                        <ProductPrice value={Number(product.price)}/>
                    ): (
                        <p className="text-destructive">Out of Stock</p>
                    )
                }
            </div>
        </CardContent>
    </Card>
  )
}



// "use client";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React from "react";
// import ProductPrice from "./product-price";

// import { StoreProductReturnType } from "@/types";

// export default function ProductCard({ product }: { product: StoreProductReturnType }) {
//   const router = useRouter();

//   const handleNavigate = (slug: string) => {
//     router.push(`/product/${slug}`); // Instantly navigates
//   };

//   return (
//     <Card className="w-full max-w-sm">
//       {/* Card header */}
//       <CardHeader className="p-0 items-center">
//         <Image
//           src={product.images[0]}
//           alt={product.name}
//           height={300}
//           width={300}
//           priority={true} // Ensure image loads quickly
//           onClick={() => handleNavigate(product.slug)} // Navigate instantly
//           className="cursor-pointer"
//         />
//       </CardHeader>

//       {/* Card content */}
//       <CardContent className="p-4 grid gap-4">
//         <div className="text-xs">{product.brand}</div>
//         <h2
//           className="text-sm font-medium cursor-pointer hover:underline"
//           onClick={() => handleNavigate(product.slug)} // Navigate instantly
//         >
//           {product.name}
//         </h2>
//         <div className="flex-between gap-4">
//           <p>{product.rating} Stars</p>
//           {product.stock > 0 ? <ProductPrice value={Number(product.price)} /> : <p className="text-destructive">Out of Stock</p>}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
