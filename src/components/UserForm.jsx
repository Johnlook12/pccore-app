import React, { useEffect, useState } from "react";
import { useUser } from '../hooks/useUser';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function UserForm({ onSubmit, typeAction, id }) {
    const [showPassword, setShowPassword] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { insertUser, updateUser, findById, loading, error } = useUser();

    useEffect(() => {
        const fetchProduct = async () => {
            console.log("typeAction: " + typeAction);
            if (typeAction === 'update' && id) {
                const user = await findById(id);
                if (user) {
                    setNombre(user.nombre);
                    setApellidos(user.apellidos);
                    setEmail(user.email);
                    setPassword(user.password);
                    setTipoUsuario(user.tipoUsuario);
                }
            }
        }
        fetchProduct();
    }, []);

    const clearFields = () => {
        setNombre('');
        setApellidos('');
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = {
                nombre: nombre,
                apellidos: apellidos,
                email: email,
                password: password,
            };

            if (typeAction === 'update') {
                const updatedUser = await updateUser(id, user);
                clearFields();
                onSubmit();
                return;
            }
            const insertedUser = await insertUser(user);
            clearFields();
            onSubmit();
            setShowSuccess(true);
        } catch (error) {
            console.log("Error: " + error.message);
        }
    };

    const isFormValid =
        nombre.trim() !== '' &&
        apellidos.trim() !== '' &&
        email.trim() !== '' &&
        password.trim() !== '';


    if (loading) {
        return <div>Cargando...</div>
    }

    return (
        <div className="bg-[#333333] p-6 rounded-xl border border-[#C0C0C0]/20">
            <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                    <div className="bg-red-500/20 text-red-300 px-4 py-3 rounded-lg">
                        {error.message}
                    </div>
                )}

                {/* Nombre y Apellidos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#C0C0C0]">Nombre</label>
                        <input
                            className="w-full bg-[#444444] border border-[#C0C0C0]/20 rounded-lg px-4 py-3 text-white focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/50"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#C0C0C0]">Apellidos</label>
                        <input
                            className="w-full bg-[#444444] border border-[#C0C0C0]/20 rounded-lg px-4 py-3 text-white focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/50"
                            type="text"
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#C0C0C0]">Email</label>
                    <input
                        className="w-full bg-[#444444] border border-[#C0C0C0]/20 rounded-lg px-4 py-3 text-white focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/50"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#C0C0C0]">Contraseña</label>
                    <div className="relative">
                        <input
                            className="w-full bg-[#444444] border border-[#C0C0C0]/20 rounded-lg px-4 py-3 pr-12 text-white focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/50"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C0C0C0] hover:text-[#00A3E0]"
                        >
                            {showPassword ?
                                <EyeSlashIcon className="w-5 h-5" /> :
                                <EyeIcon className="w-5 h-5" />
                            }
                        </button>
                    </div>
                </div>

                {/* Botón de Submit */}
                <button
                    type="submit"
                    disabled={loading || !isFormValid}
                    className="w-full bg-[#00A3E0] hover:bg-[#0093C7] text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 disabled:bg-[#C0C0C0]/30 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    ) : typeAction === 'update' ? (
                        'Actualizar Usuario'
                    ) : (
                        'Crear Usuario'
                    )}
                </button>
            </form>
        </div>
    )
}