import React from "react";
import logo from "../assets/img/logo.png";
import logoblue from "../assets/img/logoblue.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserDropDown from "./UserDropDown";
import CartIcon from "./CartIcon";

const UserNavItems = () => {
    return (
        <div className="flex items-center gap-6">
            <CartIcon/>
        </div>
    )
}

export function Header() {
    const { user } = useAuth();

    return (
        <header className="bg-[#333333] border-t border-b border-[#C0C0C0]/20 py-4 sticky top-0 z-50 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-19 w-auto filter brightness-0 invert"
                    />
                    <img
                        src={logoblue}
                        alt="Logo"
                        className="h-19 opacity-0 hover:opacity-100 transition-opacity duration-300 absolute w-auto"
                    />
                </Link>

                <nav className="hidden md:block">
                    <ul className="flex items-center space-x-8">
                        <li>
                            <Link
                                to="/"
                                className="text-[#C0C0C0] hover:text-[#00A3E0] font-medium transition-colors relative group"
                            >
                                Inicio
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00A3E0] transition-all group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/tienda"
                                className="text-[#C0C0C0] hover:text-[#00A3E0] font-medium transition-colors relative group"
                            >
                                Tienda
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00A3E0] transition-all group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contacto"
                                className="text-[#C0C0C0] hover:text-[#00A3E0] font-medium transition-colors relative group"
                            >
                                Contacto
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00A3E0] transition-all group-hover:w-full"></span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="flex items-center gap-6">
                    {user && <UserNavItems />}
                    <UserDropDown />
                </div>
            </div>
        </header>
    )
}