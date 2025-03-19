import AdminUserUpdate from "@/components/admin/users/admin-update-users";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Admin Update Users'
  }

export default async function AdminUserUpdatePage(props : {params: Promise<{id: string}>}) {

    const { id } = await props.params;

  return (
    <AdminUserUpdate userId={id}/>
  )
}



