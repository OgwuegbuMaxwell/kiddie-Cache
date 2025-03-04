import Link from 'next/link'
import Image from 'next/image'
import { APP_NAME } from '@/lib/constants'

export default function Logo() {

  return (
    <div className="flex-start site-logo">
        <Link href='/' className='flex-start'>
            <Image
                // src='/images/kiddiecache.svg'
                src='/images/logo454.png'
                alt={`${APP_NAME} logo`}
                width={150} 
                height={150} 
                priority={true}
                className=" !md:max-w-[100%] !md:max-h-[70px]"
                
            />
            {/* <span className='hidden lg:block font-bold text-2xl ml-3'>
                {APP_NAME}
            </span> */}
        </Link>
    </div>
  )
}
