import React from 'react'
import ProductList from '@/components/shared/product/product-list'

import { getLatestProducts } from '@/lib/actions/product-actions'

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// call it
// await delay(2000);

export default async function page() {

  const latestProduct = await getLatestProducts();


  return (
    <div>
      <ProductList data={latestProduct} title='Newest Arrivals' limit={4}/>
          
    </div>

  )
}
