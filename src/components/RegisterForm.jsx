import React, { useState } from "react";
import { useUser } from "../hooks/useUser";
import { Link } from "react-router-dom";
import SuccessRegisterAlert from "./SuccessRegisterAlert"

export default function RegisterForm() {
    const [showSuccess, setShowSuccess] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { insertUser, loading, error: userError } = useUser();


    const clearFields = ()=>{
        setNombre('');
        setApellidos('');
        setEmail('');
        setConfirmEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');

            if (email !== confirmEmail) {
                setError("El email no coincide");
                return;
            }

            if (password !== confirmPassword) {
                setError("Las contraseñas no coinciden");
                return;
            }


            const user = {
                nombre: nombre,
                apellidos: apellidos,
                email: email,
                password: password,
                tipousuario_id:3
            };

            const insertedUser = await insertUser(user);
            clearFields();
            setShowSuccess(true);
        } catch (error) {
            setError("Error: " + error.message);
        }
    };

    const isFormValid = 
        nombre.trim() !== '' &&
        apellidos.trim() !== '' &&
        email.trim() !== '' &&
        password.trim() !== '';

    return (
        <div className="grid p-5 justify-items-center m-5  border-l md:w-100 lg:w-150">
            <h1 className="m-4 font-bold text-4xl mb-13 text-blue-400">Registro</h1>
            {showSuccess && (
                <SuccessRegisterAlert userName={nombre} onClose={()=>setShowSuccess(false)}/>
            )}
            <span className="text-red-600 font-bold">{error}</span>
            <form className="space-y-5" onSubmit={handleSubmit}>
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
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
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
                    <label className="text-xl" htmlFor="">Repetir contraseña</label>
                    <input className="ml-3 mt-3 border py-1 px-2 rounded-md block" type="password"
                        value={confirmPassword}
                        placeholder="Ingresar contraseña"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required />
                </div>
                <div className="text-center">
                    <button className="ml-2 py-2 mt-5 mb-10 px-18 rounded-lg bg-[#00A3E0] text-black hover:bg-gray-300 transition-colors duration-300 cursor-pointer disabled:opacity-50" type="submit"
                        disabled={!isFormValid || loading} >{loading ? 'Cargando...' : 'Registrarse'}</button>
                </div>
            </form>
            <div className="border-t border-white w-full text-center">
                <span className="block pt-10 font-bold text-xl">¿Ya tienes cuenta?</span>
                <div className="text-center">
                    <Link to="/login">
                        <button className="ml-3.5 py-2 mt-5 px-18 rounded-lg bg-transparent border text-white hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
                            disabled={loading} >{loading ? 'Cargando...' : 'Iniciar sesión'}</button>
                    </Link>

                </div>
            </div>
        </div>
    )
}