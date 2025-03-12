import { getProductBySlug } from "@/lib/actions/product-actions";
import { notFound } from "next/navigation";
import ProductImages from "./product-images";
import CenteredDot from "@/components/globals/centered-dot";
import ProductPrice from "./product-price";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddToCart from "./add-to-cart";
import { UserCartReturnType } from "@/types";
import WhatsAppButton from "../whatsapp-button";
import { formatCurrency } from "@/lib/utils";


export default async function ProductDetailsContent({ slug, cart }: { slug: string, cart?: UserCartReturnType }) {
    const product = await getProductBySlug(slug);
    if (!product) return notFound();


    const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://kiddie-cache.vercel.app";
    const productUrl = `${baseUrl}/product/${product.slug}`;

    const message = `Hello, I would like to inquire about *${product.name}*.\n\n💰 Price: ${formatCurrency(product.price)}\n🔗 View product: ${productUrl}`;
  

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
                                        <AddToCart 
                                            cart={cart}
                                            item={{
                                                productId: product.id,
                                                name: product.name,
                                                slug: product.slug,
                                                price: product.price,
                                                qty: 1,
                                                image: product.images[0]
                                            }}
                                        />
                                    </div>
                                )
                            }

                            <div className="mt-2">
                                <WhatsAppButton message={message}/>
                            </div>

                        </CardContent>
                    </Card>
                </div>

            </div>
            

        </section>

    </>
    );
}






