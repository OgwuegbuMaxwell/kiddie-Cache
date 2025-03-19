import AdminUsers from "@/components/admin/users/users"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Admin Users'
  }
export default async function AdminUserPage(props: {
    searchParams: Promise<{page: string;  query: string;}>
}) {

    const { page = '1', query: searchText } = await props.searchParams;

    // const { page = '1' } = await props.searchParams;

  return (
    <AdminUsers page={page} searchQuery={searchText}/>
  )
}
