import React from "react";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import cart from "../assets/img/cart.svg";
import heart from "../assets/img/heart.svg";
import UserDropDown from "./UserDropDown";
const UserNavItems = () => {
    return (
        <div className="flex space-x-5">
            <li><img className="w-8 cursor-pointer" src={cart} alt="" /></li>
            <li><img className="w-8 cursor-pointer" src={heart} alt="" /></li>
        </div>
    )
}

export function Header() {
    const { user } = useAuth();

    return (
        <header className="bg-custom-blue py-4 shadow-md sticky top-0 z-50">
            <div className="container flex mx-auto justify-between items-center">
                <div><img className="w-30" src={logo} alt="" /></div>
                <nav>
                    <ul className="flex gap-4.5">
                        <li className="text-gray-200 font-medium text-xl hover:text-gray-700 transform hover:scale-110 transition duration-300"><Link to={'/'}>Inicio</Link></li>
                        <li className="text-gray-200 font-medium text-xl hover:text-gray-700 transform hover:scale-110 transition duration-300"><Link to={'/tienda'}>Tienda</Link></li>
                        <li className="text-gray-200 font-medium text-xl hover:text-gray-700 transform hover:scale-110 transition duration-300">Contacto</li>
                        {user && <UserNavItems />}
                        <UserDropDown />
                    </ul>
                </nav>
            </div>
        </header>
    )
}