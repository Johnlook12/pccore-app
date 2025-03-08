import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ConfirmModal({ onClose, header, content, onConfirm }) {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#333333]/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#333333] rounded-xl border border-[#C0C0C0]/20 p-6 max-w-md w-full relative shadow-xl">
                {/* Encabezado */}
                <div className="flex justify-between items-center mb-6 border-b border-[#C0C0C0]/20 pb-4">
                    <h3 className="text-xl font-semibold text-white">{header}</h3>
                    <button
                        onClick={onClose}
                        className="text-[#C0C0C0] hover:text-[#00A3E0] transition-colors p-1 rounded-full"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Contenido */}
                <div className="mb-8">
                    <p className="text-[#C0C0C0] leading-relaxed">{content}</p>
                </div>

                {/* Acciones */}
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-[#C0C0C0]/20 text-[#C0C0C0] rounded-lg hover:bg-[#00A3E0]/10 hover:text-[#00A3E0] hover:border-[#00A3E0]/30 transition-all"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-6 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg transition-colors font-medium"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}