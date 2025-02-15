import React from "react";
import logo from "../assets/img/logo.png"
import { Link } from "react-router-dom";

export function Header() {
    return (
        <header className="bg-custom-blue py-4 shadow-md">
            <div className="container flex mx-auto justify-between items-center">
                <div><img className="w-30" src={logo} alt="" /></div>
                <nav>
                    <ul className="flex gap-4.5">
                        <li className="text-gray-200 font-medium text-xl hover:text-gray-700 transform hover:scale-110 transition duration-300"><Link to={'/'}>Inicio</Link></li>
                        <li className="text-gray-200 font-medium text-xl hover:text-gray-700 transform hover:scale-110 transition duration-300"><Link to={'/otro'}>Tienda</Link></li>
                        <li className="text-gray-200 font-medium text-xl hover:text-gray-700 transform hover:scale-110 transition duration-300">Contacto</li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}