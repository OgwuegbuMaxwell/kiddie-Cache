import { Button } from '@/components/ui/button'
import React from 'react'
import sampleData from '@/db/sample-data'
import ProductList from '@/components/shared/product/product-list'

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// call it
// await delay(2000);

export default function page() {


  return (
    <div>
      <ProductList data={sampleData.products} title='Newest Arrivals' limit={4}/>
          
    </div>

  )
}
