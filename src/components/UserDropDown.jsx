import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import userIcon from "../assets/img/user.svg"

export default function UserDropDown() {

    const { user, logout } = useAuth();

    const LoginItem = () => {
        return (
            <div>
                <MenuItem>
                    <Link to="/login"
                        
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                        Iniciar sesión
                    </Link>
                </MenuItem>
            </div>
        )
    }

    const LogoutItem = ()=>{
        return(
            <div>
                <form action={logout}>
                        <MenuItem>
                            <button
                                type="submit"
                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                            >
                                Cerrar sesión
                            </button>
                        </MenuItem>
                    </form>
            </div>
        )
    }


    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md transition-colors duration-500 hover:bg-blue-300 bg-transparent text-sm font-semibold text-gray-900  ring-gray-300 ring-inset cursor-pointer">
                    <img className='w-8' src={userIcon} alt="" />
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-50 my-auto" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
                <div className="py-1">
                    {user?.tipoUsuario.nombre === 'administrador' && (
                        <MenuItem>
                        <Link to="/admin"
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                            Panel administrador
                        </Link>
                    </MenuItem>
                    )}
                    {!user && <LoginItem />}
                    {user && <LogoutItem />}
                </div>
            </MenuItems>
        </Menu>
    )
}
