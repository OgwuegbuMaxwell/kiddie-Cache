import Menu from './menu'
import Logo from './logo'

export default function Header() {
    
  return (
    <header className="w-full border-b ">
        <div className="wrapper flex-between ">

            {/* Logo */}
            <Logo/>

            {/* Links */}
            <Menu/>

        </div>
    </header>
  )
}
