import React from 'react'
import ProductCard from './product-card';
import { StoreProductReturnType } from '@/types';



export default function ProductList({data, title, limit}: {data: StoreProductReturnType[]; title?: string; limit?: number}) {

    const limitedData = limit ? data.slice(0, limit) : data;

    return (
        <div className='my-10'>
            <h2 className="h2-bold">{title}</h2>
            {
                limitedData.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {
                            limitedData.map((product: StoreProductReturnType) => (
                                <ProductCard product={product} key={product.slug}/>
                            ))
                        }
                    </div>
                ) 
                : (
                    <div>
                        <p>No products found</p>
                    </div>
                )
            }
        </div>
    )

}
