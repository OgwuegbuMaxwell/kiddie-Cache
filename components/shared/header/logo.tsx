import Link from 'next/link'
import Image from 'next/image'
import { APP_NAME } from '@/lib/constants'
import CategoryDrawer from './category-drawer'

export default function Logo() {

  return (
    <div className=" site-logo flex-start">
        {/* Category drawer */}
        <CategoryDrawer/>
        
        <Link href='/' className=' ml-2'>

            <Image
              src='/images/logo-new.svg'
              height={100}
              width={100}
              alt={APP_NAME}
              priority={true}
              className='w-auto h-[30px] rounded-sm'
            />
        </Link>
    </div>
  )
}
