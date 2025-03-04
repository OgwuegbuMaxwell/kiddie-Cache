import CenteredDot from "@/components/globals/centered-dot";
import ProductImages from "@/components/shared/product/product-images";
import ProductPrice from "@/components/shared/product/product-price";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProductBySlug } from "@/lib/actions/product-actions"
import { notFound } from "next/navigation"

export default async function ProductDetailsPage(props: {params: Promise<{slug: string}>}) {
    const { slug } = await props.params

    const product = await getProductBySlug(slug)
    if(!product) return notFound();


  return (
    <>
        <section>
            <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Images Columns */}
                <div className="col-span-2">
                    {/* Images Component */}
                    <ProductImages
                        images={product.images}
                    />
                </div>

                {/* Details Column */}
                <div className="col-span-2 p-5">
                    {/* brand || product category || product name || product price */}
                    <div className="flex flex-col gap-6">
                        <p>{product.brand} <CenteredDot /> {product.category}</p>
                        <h1 className="h3-bold">{product.name}</h1>
                        <p>{product.rating} of {product.numReviews} Reviews</p>
                        <div className="flex flex-col sm:flex-row sm:items-center ">
                            <ProductPrice 
                                value={Number(product.price)} 
                                className="w-24 rounded-full bg-green-100 text-green-700 px-5 py-2"
                            />
                        </div>
                    </div>

                    {/* discription */}
                    <div className="mt-10">
                        <p className="font-semibold">Description</p>
                        <p>{product.description}</p>
                    </div>

                </div>

                {/* Action column */}
                <div>
                    <Card>
                        <CardContent className="p-4">
                            <div className="mb-2 flex justify-between">
                                <div>Price</div>
                                <div>
                                    <ProductPrice value={Number(product.price)}/>
                                </div>
                            </div>

                            <div className="mb-2 flex justify-between">
                                <div>Status</div>
                                { 
                                    product.stock > 0 ? (
                                        <Badge variant='outline'>In Stock</Badge>
                                    ) : (
                                        <Badge variant='destructive'>Out of Stock</Badge>
                                    )
                                }
                            </div>

                            {
                                product.stock > 0 && (
                                    <div className="flex-center">
                                        <Button className="w-full">Add to Cart</Button>
                                    </div>
                                )
                            }
                        </CardContent>
                    </Card>
                </div>

            </div>
            

        </section>

    </>
  )
}







// Valid ways of getting params values

// VALID

// const ProductDetailsPage = async (props: {params: Promise<{slug: string}>}) => {
//     const { slug } = await props.params

//     return <div>
//         Product slug: ({slug})
//     </div>
// }

// export default ProductDetailsPage;



// VALID

// export default async function ProductDetailsPage({
//     params,
//   }: {
//     params: Promise<{ slug: string }>;
//   }) {


//     const { slug } = await params;


//     // Consol logs
//     // console.log("Slug: ", slug)
  
//     return <div>Product Details Page for {slug}</div>;
//   }
  