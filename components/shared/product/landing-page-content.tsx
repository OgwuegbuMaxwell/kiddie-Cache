import { auth } from '@/auth';
import { getLatestProducts } from '@/lib/actions/product-actions';
import React from 'react'
import ProductList from './product-list';

export default async function LandingPageContent() {
  const latestProduct = await getLatestProducts();

  const session = await auth();
  console.log('Session: ', session)


  return (
    <div>
      
      <ProductList data={latestProduct} title='Newest Arrivals' limit={12}/>
          
    </div>

  )
}
