"use client"
import { toast  } from "sonner"
import { ShippingAddressType } from "@/types"
import { useRouter } from "next/navigation"


// form
import { zodResolver } from "@hookform/resolvers/zod"
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { shippingAddressSchema } from "@/lib/validators"
import { shippingAddressDefaultValues } from "@/lib/constants"
import { useTransition } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader } from "lucide-react"
import { updateUserAddress } from "@/lib/actions/user.actions"
 

export default function ShippingAddressForm({address}: {address: ShippingAddressType}) {
    const router = useRouter();

    // Define shipping form.
    const form = useForm<z.infer<typeof shippingAddressSchema>>({
        resolver: zodResolver(shippingAddressSchema),
        defaultValues: address || shippingAddressDefaultValues,
      });
    
    const [isPending, startTransition] = useTransition();

    const onSubmit:SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (values) => {
        // console.log("Form Values: ", values)

        startTransition(async () => {
            const res = await updateUserAddress(values);

            if (!res.success) {
                toast.error(res.message, {
                    className: "!bg-red-600 !text-white",
                });
    
                return;
            }
        })

        router.push('/payment-method')

    }

  return (
    <>
        <div className="max-w-md mx-auto space-y-4">
            <h1 className="h2-bold mt-4">Shipping Address</h1>
            <p className="text-sm text-muted-foreground">
                Please enter an address to ship to
            </p>
            <Form {...form}>
                <form method="post" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }: {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'fullName'>}) => (
                                <FormItem className="w-full">
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter full name" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    Full name
                                </FormDescription> */}
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="streetAddress"
                            render={({ field }: {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'streetAddress'>}) => (
                                <FormItem className="w-full">
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter address" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    Full name
                                </FormDescription> */}
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }: {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'city'>}) => (
                                <FormItem className="w-full">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter city" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    Full name
                                </FormDescription> */}
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="postalCode"
                            render={({ field }: {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'postalCode'>}) => (
                                <FormItem className="w-full">
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Postal Code" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    Full name
                                </FormDescription> */}
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }: {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'country'>}) => (
                                <FormItem className="w-full">
                                <FormLabel> Country</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Country" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    Full name
                                </FormDescription> */}
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button 
                            disabled={isPending}
                            type="submit"
                        >
                            {
                                isPending ? (
                                    <Loader className="w-4 h-4 animate-spin"/>
                                ) : (
                                    <ArrowRight className="w-4 h-4"/>
                                )
                            }
                            Continue
                        </Button>
                    </div>

                </form>
            </Form>
        </div>
    </>
  )
}
