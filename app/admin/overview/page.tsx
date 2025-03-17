import { auth } from "@/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getOrderSummary } from "@/lib/actions/order.actions"
import { formatCurrency, formatDateTime, formatNumber } from "@/lib/utils"
import { BadgeDollarSign, Barcode, CreditCard, Users } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import Charts from "./charts"
import { requireAdmin } from "@/lib/auth-guard"


export const metadata: Metadata = {
  title: 'Admin Dashboard'
}

export default async function AdminOverviewPage() {
  await requireAdmin();
  const session = await auth()

  if (session?.user?.role !== 'admin') {
    throw new Error('User is not authorized')
  }

  const summary = await getOrderSummary();
  // console.log('Order Summary: ', summary) // [ { month: '03/25', totalSales: 1582 } ]
  




  return (
    <div className="space-y-2">
        <h1 className="h2-bold">Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Revenue */}
            <Card>
                {/* Card Header */}
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium ">Total Revenue</CardTitle>
                    <BadgeDollarSign/>
                </CardHeader>
                {/* Card Content */}
                <CardContent className="text-2xl font-bold">
                    {
                      formatCurrency(summary.totalSales._sum.totalPrice?.toString() || 0)
                    }
                </CardContent>
            </Card>

            {/* Total Sales */}
            <Card>
                {/* Card Header */}
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium ">Sales</CardTitle>
                    <CreditCard/>
                </CardHeader>
                {/* Card Content */}
                <CardContent className="text-2xl font-bold">
                    {
                      formatNumber(summary.ordersCount)
                    }
                </CardContent>
            </Card>

            {/* Total Customers */}
            <Card>
                {/* Total Customers */}
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium ">Customers</CardTitle>
                    <Users/>
                </CardHeader>
                {/* Card Content */}
                <CardContent className="text-2xl font-bold">
                    {
                      formatNumber(summary.usersCount)
                    }
                </CardContent>
            </Card>

            {/* Total Products */}
            <Card>
                {/* Card Header */}
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium ">Products</CardTitle>
                    <Barcode/>
                </CardHeader>
                {/* Card Content */}
                <CardContent className="text-2xl font-bold">
                    {
                      formatNumber(summary.productsCount)
                    }
                </CardContent>
            </Card>
        </div>

        {/* Chart */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                    {/* Card Header */}
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    {/* Card Content */}
                    <CardContent>
                      {/* Chart */}
                      <Charts
                        data={{
                          salesData: summary.salesData
                        }}
                      />
                    </CardContent>
              </Card>

              {/* Resent sells */}
              <Card className="col-span-3">
                    {/* Card Header */}
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                    </CardHeader>
                    {/* Card Content */}
                    <CardContent>
                        <Table>
                            {/* Table Header */}
                            <TableHeader>
                                <TableRow>
                                    <TableHead>BUYER</TableHead>
                                    <TableHead>DATE</TableHead>
                                    <TableHead>TOTAL</TableHead>
                                    <TableHead>ACTIONS</TableHead>
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody>
                                {
                                  summary.latestSales.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>
                                            {
                                              order?.user?.name ? order.user.name : 'Deleted User'
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                              formatDateTime(order.createdAt).dateOnly
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                              formatCurrency(order.totalPrice)
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                              href={`/order/${order.id}`}
                                            >
                                                <span className="px-2">Details</span>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                  ))
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
              </Card>
        </div>

    </div>
  )
}
