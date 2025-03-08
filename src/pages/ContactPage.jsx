import React from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

export function ContactPage() {
    return (
        <div className="min-h-screen bg-[#333333] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-[#00A3E0] mb-4 relative pb-8">
                        Contacto
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-24 bg-[#00A3E0] rounded-full"></span>
                    </h2>
                    <p className="text-[#C0C0C0] text-lg max-w-2xl mx-auto">
                        ¿Necesitas ayuda con tu compra o tienes preguntas técnicas? Nuestro equipo de expertos en hardware está listo para asistirte.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <div className="space-y-8">
                        <div className="bg-[#444444] p-8 rounded-xl border border-[#C0C0C0]/20">
                            <h3 className="text-2xl font-bold text-white mb-6">Información de contacto</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <MapPinIcon className="w-6 h-6 text-[#00A3E0] mt-1" />
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Oficinas Centrales</h4>
                                        <p className="text-[#C0C0C0]">C/ Tecnología, 42<br />Parque Industrial Norte<br />08042 Barcelona</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <PhoneIcon className="w-6 h-6 text-[#00A3E0] mt-1" />
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Teléfono</h4>
                                        <p className="text-[#C0C0C0]">+34 933 123 456<br />Lunes a Viernes: 9:00 - 19:00</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <EnvelopeIcon className="w-6 h-6 text-[#00A3E0] mt-1" />
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Correo Electrónico</h4>
                                        <p className="text-[#C0C0C0]">soporte@hardwarestore.com<br />ventas@hardwarestore.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <ClockIcon className="w-6 h-6 text-[#00A3E0] mt-1" />
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Horario</h4>
                                        <p className="text-[#C0C0C0]">
                                            Lunes - Viernes: 9:00 - 19:00<br />
                                            Sábados: 10:00 - 14:00<br />
                                            Domingos: Cerrado
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="h-96 bg-[#444444] rounded-xl overflow-hidden border border-[#C0C0C0]/20">
                            <iframe
                                title="Ubicación"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.511012450312!2d2.189466115425897!3d41.40718997926202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDI0JzI1LjkiTiAywrAxMScyMi4xIkU!5e0!3m2!1ses!2ses!4v1623333333333"
                                className="w-full h-full"
                                loading="lazy"
                            ></iframe>
                        </div>

                        <div className="bg-[#444444] p-8 rounded-xl border border-[#C0C0C0]/20">
                            <h3 className="text-2xl font-bold text-white mb-6">Formulario de contacto</h3>
                            <form className="space-y-6">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Nombre completo"
                                        className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded-lg px-4 py-3 text-white focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/50"
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        placeholder="Correo electrónico"
                                        className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded-lg px-4 py-3 text-white focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/50"
                                        required
                                    />
                                </div>

                                <div>
                                    <textarea
                                        rows="4"
                                        placeholder="Tu mensaje..."
                                        className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded-lg px-4 py-3 text-white focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/50"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#00A3E0] hover:bg-[#0093C7] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                                >
                                    Enviar Mensaje
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="text-center border-t border-[#C0C0C0]/20 pt-12">
                    <p className="text-[#C0C0C0] text-lg">
                        "En Hardware Store, no solo vendemos componentes - construimos soluciones"
                    </p>
                </div>
            </div>
        </div>
    );
}