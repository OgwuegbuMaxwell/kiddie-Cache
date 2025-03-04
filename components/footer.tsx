import { APP_NAME } from '@/lib/constants'
import CenteredDot from './globals/centered-dot';
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='border-t'>
            <div className="p-5 flex-center">
                {APP_NAME} &nbsp; <CenteredDot/>  &nbsp; {currentYear}
            </div>
        </footer>
    )
}
