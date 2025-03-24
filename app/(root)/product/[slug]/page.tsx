import { Suspense } from "react";
import ProductDetailsSkeleton from "@/components/shared/product/product-details-skeleton";
import ProductDetailsContent from "@/components/shared/product/product-details-content";


// interface PageProps {
//     params: { slug: string };
// }

export default async function ProductDetailsPage(props: {params: Promise<{slug: string}>}) {
    const { slug } = await props.params

    

    return (
        <>
            <section>
                <Suspense fallback={<ProductDetailsSkeleton />}>
                    <ProductDetailsContent slug={slug} />
                </Suspense>
            </section>
        </>
    );
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
  