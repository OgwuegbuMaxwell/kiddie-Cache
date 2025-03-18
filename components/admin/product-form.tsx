'use client'
import { productDefaultValues } from "@/lib/constants";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";
// import { ProductType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { toast  } from "sonner"
import slugify from 'slugify';
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { createProduct, updateProduct } from "@/lib/actions/product-actions";
import Image from 'next/image'

// Image Uploader
import { UploadButton } from '@/lib/uploadthing'





export default function ProductForm({type, product, productId} : {
    type : 'Create' | 'Update';
    // product? : ProductType;
    product?: z.infer<typeof updateProductSchema>;
    productId?: string;
}) {
    const router = useRouter();

    // Determine which schema to use based on `type`
    const schema = type === 'Update' ? updateProductSchema : insertProductSchema;

    const form = useForm<z.infer<typeof schema>> ({
        resolver: zodResolver(schema),
        defaultValues: product && type === 'Update' ? product : productDefaultValues
    })

  

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (values) => {

        // On Create
        if (type === 'Create') {
            const res = await createProduct(values)

            if (!res.success) {
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }

            router.push('/admin/products')

        }


        // On Update
        if (type === 'Update') {
            if (!productId) {
                router.push('/admin/products')
                return;
            }

            const res = await updateProduct({
                ...values,
                id: productId,
            })

            if (!res.success) {
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }

            router.push('/admin/products')

        }
    }


    const images = form.watch('images');
    const isFeatured = form.watch('isFeatured');
    const banner = form.watch('banner') 


  return (
    <Form {...form}>
        <form className="space-y-8" method="POST" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name & Slug */}
            <div className="flex flex-col md:flex-row gap-5">
                <FormField
                    control={form.control}
                    name='name'
                    render={({field}: {field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'name'>}) => (
                        <FormItem className="w-full">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter product name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                >
                </FormField>

                <FormField
                    control={form.control}
                    name='slug'
                    render={({field}: {field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'slug'>}) => (
                        <FormItem className="w-full">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        readOnly
                                        placeholder="Enter slug"
                                        {...field}
                                    />
                                    <Button 
                                        type="button" 
                                        size='sm' 
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2"
                                        onClick={ () => {
                                            form.setValue('slug', slugify(form.getValues('name'), {lower: true}))
                                        }}
                                    >
                                        Generate
                                    </Button>
                                </div>

                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                >
                </FormField>

            </div>

            {/* Category & Brand */}
            <div className="flex flex-col md:flex-row gap-5">
            <FormField
                control={form.control}
                name='category'
                render={({field}: {field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'category'>}) => (
                    <FormItem className="w-full">
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Enter Category"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            >
            </FormField>

            <FormField
                control={form.control}
                name='brand'
                render={({field}: {field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'brand'>}) => (
                    <FormItem className="w-full">
                        <FormLabel>Brand</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Enter brand"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            >
            </FormField>

            </div>

            {/* Price & Stock */}
            <div className="flex flex-col md:flex-row gap-5">
                <FormField
                    control={form.control}
                    name='price'
                    render={({field}: {field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'price'>}) => (
                        <FormItem className="w-full">
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter product price"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                >
                </FormField>

                <FormField
                    control={form.control}
                    name='stock'
                    render={({field}: {field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'stock'>}) => (
                        <FormItem className="w-full">
                            <FormLabel>Stock</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter stock"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                >
                </FormField>

            </div>

            {/* Images */}
            <div className="upload-field flex flex-col md:flex-row gap-5">
                <FormField
                    control={form.control}
                    name='images'
                    render={() => (
                        <FormItem className="w-full">
                            <FormLabel>Images</FormLabel>
                                <Card>
                                    <CardContent className="space-y-2 mt-2 min-h-48">
                                        <div className="flex-start">
                                            {
                                                images.map((image: string) => (
                                                    <Image
                                                        key={image}
                                                        src={image}
                                                        alt="Product Image"
                                                        className="w-20 h-20 object-cover object-center rounded-sm"
                                                        width={100}
                                                        height={100}
                                                    />
                                                ))
                                            }
                                            <FormControl>
                                                <UploadButton
                                                    endpoint='imageUploader'
                                                    onClientUploadComplete={(res: {url: string}[]) => {
                                                        form.setValue('images', [...images, res[0].url])
                                                    }}
                                                    onUploadError={(error: Error) => {
                                                        toast.error(error.message)
                                                    }}
                                                />
                                            </FormControl>
                                        </div>
                                    </CardContent>

                                </Card>
                            <FormMessage/>
                        </FormItem>
                    )}
                >
                </FormField>
            </div>


            {/* Is featured */}
            <div className="upload-field">
                Featured Product
                <Card>
                    <CardContent className="space-y-2 mt-2">
                        <FormField
                            name="isFeatured"
                            control={form.control}
                            render={({field}) => (
                                <FormItem className="space-x-2 items-center">
                                    <FormControl>
                                        <Checkbox 
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel>Is Featured?</FormLabel>
                                </FormItem>
                            )}
                        />
                        
                        {
                            isFeatured && banner && (
                                <Image
                                    src={banner}
                                    alt="Banner Image"
                                    className="w-full object-cover object-center rounded-sm"
                                    width={1920}
                                    height={680}

                                />
                            )
                        }

                        {
                            isFeatured && !banner && (
                                <UploadButton
                                    endpoint='imageUploader'
                                    onClientUploadComplete={(res: {url: string}[]) => {
                                        form.setValue('banner', res[0].url)
                                    }}
                                    onUploadError={(error: Error) => {
                                        toast.error(error.message)
                                    }}
                                />
                            )
                        }
                    </CardContent>

                </Card>
            </div>


            {/* Description */}
            <div>
                <FormField
                    control={form.control}
                    name='description'
                    render={({field}: {field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'description'>}) => (
                        <FormItem className="w-full">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="resize-none"
                                    placeholder="Enter product description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                >
                </FormField>
            </div>

            {/* submit */}
            <div>
                <Button 
                    type="submit" 
                    size='lg' 
                    disabled={form.formState.isSubmitting}
                    className="button col-span-2 w-full"
                >
                    {
                        form.formState.isSubmitting ? 'Submitting' : `${type} Product`
                    }
                </Button>
            </div>


        </form>
    </Form>
  )
}
