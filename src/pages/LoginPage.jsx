import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import cart from "../assets/img/cart.svg";
import medal from "../assets/img/medal.svg";
import logo from '../assets/img/logo.png';
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function LoginPage({formType}) {

    
    const { user, login } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);


    return (
        <div className="justify-items-center">
            <div className="justify-items-center mt-10">
                <Link className="w-5/15 block" to="/"><img src={logo} alt="" /></Link>
            </div>

            <div className="flex">
                <div className="pr-45 space-y-20 mt-10 pb-10 mr-15">
                    <div>
                        <img className="w-25 " src={medal} alt="" />
                        <h4 className="font-bold text-2xl">Lista de deseos</h4>
                        <span>Gestiona tus productos favoritos en la lista de deseos</span>
                    </div>
                    <div>
                        <img className="w-25 " src={cart} alt="" />
                        <h4 className="font-bold text-2xl">Carrito de la compra</h4>
                        <span>Añade tus productos al carrito</span>
                    </div>
                </div>
                {formType==="login" && <LoginForm />}
                {formType==="register" && <RegisterForm />}
            </div>
        </div>
    )
}