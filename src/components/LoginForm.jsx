import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const success = await login(email, password);
            if (!success) {
                setError('Credenciales incorrectas');
            }
        } catch (error) {
            setError('Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="grid p-5 justify-items-center m-5  border-l md:w-100 lg:w-150">
                <h1 className="m-4 font-bold text-3xl ">Iniciar sesión</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
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
                        <label className="text-xl" htmlFor="">Contraseña</label>
                        <input className="ml-3 mt-3 border py-1 px-2 rounded-md block" type="password"
                            value={password}
                            placeholder="Ingresar contraseña"
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>

                    {error && <p>{error}</p>}

                    <div className="text-center">
                        <button className="ml-3.5 py-2 mb-10 mt-5 px-18 rounded-lg bg-[#00A3E0] text-black hover:bg-gray-300 transition-colors duration-300 cursor-pointer" type="submit"
                            disabled={loading} >{loading ? 'Cargando...' : 'Ingresar'}</button>
                    </div>
                </form>
                <div className="border-t border-white w-full text-center">
                    <span className="block pt-10 font-bold text-xl">¿Eres nuevo cliente?</span>
                    <div className="text-center">
                        <Link to="/register">
                            <button className="ml-3.5 py-2 mt-5 px-18 rounded-lg bg-transparent border text-white hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
                                disabled={loading} >{loading ? 'Cargando...' : 'Registrarse'}</button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}