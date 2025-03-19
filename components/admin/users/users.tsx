import DeleteDialog from "@/components/shared/delete-dialog";
import Pagination from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteUser, getAllUsers } from "@/lib/actions/user.actions"
import { formatId } from "@/lib/utils";
import Link from "next/link";

export default async function AdminUsers({page, searchQuery}: {page: string; searchQuery: string}) {

    
    const users = await getAllUsers({
        page: Number(page),
        query: searchQuery,
    })


    // console.log("Admin Users: ", users)


  return (
    <div className='space-y-2'>
        <div className="flex items-center gap-3">
            <h1 className="h2-bold">Users</h1>
            {
                searchQuery && (
                    <div>
                        Filtered by <i>&quot; {searchQuery} &quot;</i>
                        <Link href='/admin/orders'>
                            <Button variant='outline' size='sm' className="ml-2">Clear Filter</Button>
                        </Link>
                    </div>
                )
            }
        </div>

        <div className="overflow-x-auto">
            <Table>
                {/* Header */}
                <TableHeader>
                    <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>NAME</TableHead>
                    <TableHead>EMAIL</TableHead>
                    <TableHead>ROLE</TableHead>
                    <TableHead>ACTIONS</TableHead>
                    </TableRow>
                </TableHeader>

                {/* Body */}
                <TableBody>
                {users.data.map((user) => (
                    <TableRow key={user.id}>
                    <TableCell>{formatId(user.id)}</TableCell>
                    <TableCell>
                        {user.name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                        {
                            user.role === 'user' ? (
                                <Badge variant='secondary'>User</Badge>
                            ) : (
                                <Badge variant='default'>Admin</Badge>
                            )
                        }
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                        <Button asChild variant='outline' size='sm'>
                            <Link href={`/admin/users/${user.id}`}>
                                Edit
                            </Link>
                        </Button>
                        <DeleteDialog id={user.id} action={deleteUser}/>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
                
            </Table>

            {
                users.totalPages > 1 && (
                    <Pagination
                    page={Number(page) || 1}
                    totalPage={users?.totalPages}
                    />
                )
            }
        </div>
    </div>
  )
}
