import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import Menu from '@/components/shared/header/menu';
import MainNav from './main-nav';
import { requireAdmin } from '@/lib/auth-guard';
import AdminSearch from '@/components/admin/admin-search';



export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   await requireAdmin();
  return (
    <>
      <div className='flex flex-col'>
            <div className='border-b !container mx-auto'>
            <div className='flex items-center h-16 px-4'>
                <Link href='/' className='w-22'>
                <Image
                    src='/images/logo-new.svg'
                    height={100}
                    width={100}
                    alt={APP_NAME}
                    priority={true}
                    className='w-auto h-[30px] rounded-sm'
                />
                </Link>
                <MainNav className='mx-6' />
                <div className='ml-auto items-center flex space-x-4'>

                <AdminSearch/>

                <Menu />
                </div>
            </div>
            </div>

            <div className='flex-1 space-y-4 p-8 pt-6 container mx-auto'>
            {children}
            </div>
      </div>
    </>
  );
}