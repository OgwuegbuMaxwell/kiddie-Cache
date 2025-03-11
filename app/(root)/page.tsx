import LandingPageContent from '@/components/shared/product/landing-page-content'
import ProductListSkeleton from '@/components/shared/product/product-list-skeleton'
import React, { Suspense } from 'react'


export default async function page() {

  return (
      <section>
          <Suspense fallback={<ProductListSkeleton />}>
              <LandingPageContent/>
          </Suspense>
      </section>

  )
}
