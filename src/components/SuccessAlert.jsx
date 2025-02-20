import { useEffect } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';

export default function SuccessAlert({ userName, onClose }) {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 10000);
        return () => clearTimeout(timer);
    }, [onClose]);


    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg animate-fade-in-down">
                <div className="text-center">
                    <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto animate-scale-up" />

                    <h3 className="mt-4 text-2xl font-bold text-gray-900">
                        ¡Registro Exitoso!
                    </h3>

                    <p className="mt-2 text-gray-600">
                        Bienvenido a nuestra plataforma
                    </p>

                    {userName && (
                        <div className="mt-4 bg-green-50/50 p-3 rounded-lg">
                            <p className="text-sm font-mono text-green-700">
                                {userName}
                            </p>
                        </div>
                    )}

                    <button
                        onClick={() => navigate('/login')}
                        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                        Ir a login
                    </button>
                </div>
            </div>
        </div>
    );
}