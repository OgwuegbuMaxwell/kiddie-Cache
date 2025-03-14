import Link from 'next/link'
import Image from 'next/image'
import { APP_NAME } from '@/lib/constants'

export default function Logo() {

  return (
    <div className="flex-start site-logo">
        <Link href='/' className='flex-start'>

            <Image
              src='/images/logo-new.svg'
              height={100}
              width={100}
              alt={APP_NAME}
              priority={true}
              className='w-auto h-[30px]'
            />
        </Link>
    </div>
  )
}
