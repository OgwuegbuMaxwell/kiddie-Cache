import Menu from './menu'
import Logo from './logo'
import Search from './search'

export default function Header() {
    
  return (
    <header className="w-full border-b ">
        <div className="wrapper flex-between ">

            {/* Logo */}
            <Logo/>

            {/* Search */}
            <div className="hidden md:block">
              <Search/>
            </div>

            {/* Links */}
            <Menu/>

        </div>
    </header>
  )
}
