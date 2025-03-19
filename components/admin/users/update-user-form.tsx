'use client'
import { toast  } from "sonner"
import { updateUserSchema } from "@/lib/validators"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { ControllerRenderProps, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { USERS_ROLES } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { updateUser } from "@/lib/actions/user.actions"

export default function UpdateUserForm({user}: {
    user: z.infer<typeof updateUserSchema>
}) {

    const router = useRouter();

    const form = useForm<z.infer<typeof updateUserSchema>> ({
        resolver: zodResolver(updateUserSchema),
        defaultValues: user,
    });

    const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
            try {
                const res = await updateUser({
                    ...values,
                    id: user.id,
                });

                if(!res.success) {
                    return toast.error(res.message)
                }

                toast.success(res.message)

                form.reset();
                router.push('/admin/users')
            } catch (error) {
                toast.error((error as Error).message)
            }
    }

  return (
    <Form {...form}>
        <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
                <FormField
                    control={form.control}
                    name='email'
                    render={({field}: {field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'email'>}) => (
                        <FormItem className="w-full">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                disabled={true}
                                    placeholder="Enter User Email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                >
                </FormField>
            </div>

            {/* Name */}
            <div>
                <FormField
                    control={form.control}
                    name='name'
                    render={({field}: {field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'name'>}) => (
                        <FormItem className="w-full">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter User Name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                >
                </FormField>
            </div>

            {/* Role */}
            <div>
                <FormField
                    control={form.control}
                    name='role'
                    render={({field}: {field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'role'>}) => (
                        <FormItem className="w-full">
                            <FormLabel>Role</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder='Select a role'
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {USERS_ROLES.map((role) => (
                                            <SelectItem key={role} value={role}>
                                                {role.charAt(0).toUpperCase() + role.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                >
                </FormField>
            </div>
            
            <div className="flex-between mt-4">
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {
                        form.formState.isSubmitting ? 'Submitting...' : 'Update User'
                    }
                </Button>
            </div>
        </form>
    </Form>
  )
}
