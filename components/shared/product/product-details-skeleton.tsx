import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'


export default function ProductDetailsSkeleton() {
  return (

        <section>
            <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Images Columns */}
                <Skeleton className="h-[300px] w-[250px] rounded-xl" />
                

                {/* Details Column */}
                <div className="col-span-2 p-5">
                    {/* brand || product category || product name || product price */}
                    <div className="flex flex-col gap-6">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[250px]" />
                        <div className="flex flex-col sm:flex-row sm:items-center ">
                            <Skeleton className="h-4 w-24 rounded-full" />
                        </div>
                    </div>

                    {/* discription */}
                    <div className="mt-10">
                    <Skeleton className="h-4 w-[250px]" />
                    </div>

                </div>

                {/* Action column */}
                <div>
                    <Card>
                        <CardContent className="p-4">
                            <div className="mb-2 flex justify-between">
                                <Skeleton className="h-4 w-24 rounded-full" />
                                <div>
                                <Skeleton className="h-4 w-24 rounded-full" />
                                </div>
                            </div>

                            <div className="mb-2 flex justify-between">
                                <Skeleton className="h-4 w-24 rounded-full" />
                                <Skeleton className="h-4 w-[250px]" />
                            </div>

                            <Skeleton className="h-4 w-24" />
                        </CardContent>
                    </Card>
                </div>

            </div>
            

        </section>

  
  )
}


// import React from 'react'
// import Image  from 'next/image'
// import loader from '@/assets/loader.gif'


// export default function ProductDetailsSkeleton() {
//   return (
//     <div className="flex justify-center items-center h-screen w-full">
//       <Image src={loader} alt="Loading.." height={150} width={150} />
//     </div>
//   )
// }
