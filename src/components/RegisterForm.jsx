import React, { useState } from "react";
import {useUser} from "../hooks/useUser";

export default function RegisterForm() {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { insertUser, loading, error: userError } = useUser();


    const handleValidEmail = (e) => {
        setError('');
        const currentEmail = e.target.value;

        if (!email === currentEmail) {
            setError("Los email no coinciden");
            return false;
        }

        return true;
    }

    const handleValidPassword = (e) => {
        setError('');
        const currentPassword = e.target.value;

        if (!password === currentPassword) {
            setError('Las contraseñas no coinciden');
            return false;
        }
        return true;
    }

    const handleSubmit = () => {
        try {
            setError('');
            const user = {
                "nombre": nombre,
                "apellidos": apellidos,
                "email": email,
                "password": password
            }

            const insertedUser = insertUser(user);
            if (!insertUser) {
                setError('Error al realizar el registro')
            }
        } catch (error) {
            setError("Error: " + error.message);
        }
    }

    return (
        <div>
            <h1 className="m-4 font-bold text-3xl ">Registro</h1>
            <form className="space-y-5" onSubmit={''}>
                <div className="text-center">
                    <label className="text-xl" htmlFor="">Nombre</label>
                    <input className="ml-3 mt-3 border py-1 px-2 rounded-md block" type="text"
                        placeholder="¿Cuál es tu nombre?"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="text-center">
                    <label className="text-xl" htmlFor="">Apellidos</label>
                    <input className="ml-3 mt-3 border py-1 px-2 rounded-md block" type="text"
                        placeholder="¿Cuales son tus apellidos?"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        required
                    />
                </div>
                <div className="text-center">
                    <label className="text-xl" htmlFor="">Email</label>
                    <input className="ml-3 mt-3 border py-1 px-2 rounded-md block" type="email"
                        placeholder="Ingresar email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="text-center">
                    <label className="text-xl" htmlFor="">Repetir email</label>
                    <input className="ml-3 mt-3 border py-1 px-2 rounded-md block" type="email"
                        placeholder="Repetir email"
                        onChange={handleValidEmail}
                        required
                    />
                </div>
                <div className="text-center">
                    <label className="text-xl" htmlFor="">Contraseña</label>
                    <input className="ml-3 mt-3 border py-1 px-2 rounded-md block" type="password"
                        value={password}
                        placeholder="Ingresar contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <div className="text-center">
                    <button className="ml-3.5 py-2 mt-5 px-18 rounded-lg bg-[#00A3E0] text-black hover:bg-gray-300 transition-colors duration-300 cursor-pointer" type="submit"
                        disabled={!handleValidEmail || !handleValidPassword} >{loading ? 'Cargando...' : 'Ingresar'}</button>
                </div>
            </form>
        </div>
    )
}