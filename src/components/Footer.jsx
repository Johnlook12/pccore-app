import React from "react";

export function Footer(){
    return(
        <footer className="bg-fondo text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <div>
                        <h4 className="font-bold text-lg mb-4">PCCore</h4>
                        <p className="text-color-secondary">Tu hardware al mejor precio</p>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">Enlaces rápidos</h4>
                        <ul>
                            {/* Reemplazar enlaces por Link  */}
                            <li className="mb-2"><a className="hover:text-blue-400 transition-colors duration-200" href="#">Inicio</a></li>
                            <li className="mb-2"><a a className="hover:text-blue-400 transition-colors duration-200" href="#">Política de privacidad</a></li>
                            <li className="mb-2"><a a className="hover:text-blue-400 transition-colors duration-200" href="#">Contacto</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4">Contacto</h4>
                        <p className="mb-2">Email: <a href="mailto:info@pccore.com" className="hover:text-blue-400 transition-colors duration-200">info@pccore.com</a></p>
                        <p className="mb-2">Teléfono: <a href="tel:+652652652" className="hover:text-blue-400 transition-colors duration-200">652652652</a></p>
                        <p className="mb-2">Dirección: Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                    <div className="mt-12 border-t border-gray-300 pt-6 text-center text-sm text-gray-300">
                    © {new Date().getFullYear()} PCCore. Todos los derechos reservados.
                    </div>
                </div>
            </div>
        </footer>
    )
}