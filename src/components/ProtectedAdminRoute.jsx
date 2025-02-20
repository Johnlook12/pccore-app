import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
    const { user, loading } = useAuth();

    if(loading){
        return <div>Cargando...</div>
    }

    const typeUser = user?.tipoUsuario?.id;

    if(!user || typeUser!==1){
        return <Navigate to="/unauthorized"/>
    }

    return children;
}