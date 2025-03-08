import React from "react";

export default function ModalWrapper({ title, children, onClose }) {

    return (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-gray-700 rounded-lg w-full max-w-lg relative">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <button
                        onClick={() => onClose()}
                        className="text-white hover:text-gray-400"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}