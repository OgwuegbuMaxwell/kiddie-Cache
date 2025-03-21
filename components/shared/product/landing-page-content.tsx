
import { getFeaturedProducts, getLatestProducts } from '@/lib/actions/product-actions';
import React from 'react'
import ProductList from './product-list';
import ProductCarousel from './product-carousel';
import ViewAllProductButton from '@/components/buttons/view-all-product-button';

export default async function LandingPageContent() {
  const latestProduct = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();


  return (
    <div>
      
      {
        featuredProducts .length > 0 && <ProductCarousel data={featuredProducts}/>
      }

      <ProductList data={latestProduct} title='Newest Arrivals' limit={4}/>

      <ViewAllProductButton/>
          
    </div>

  )
}
