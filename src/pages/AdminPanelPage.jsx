import React from "react";
import { ArrowTopRightOnSquareIcon, WrenchIcon } from "@heroicons/react/20/solid";

export default function AdminPanelPage() {
    return (
        <div className="min-h-screen text-center">
            <div>
                <h2 className="mt-30 text-3xl text-blue-500">Panel administración<WrenchIcon className="w-7 inline ml-2"/></h2>
                
            </div>
            <div className="flex justify-center mt-35 space-x-80">
                <div className="bg-blue-400 h-10 pt-5 pb-10 pl-5 pr-5 rounded-2xl text-xl cursor-pointer hover:bg-blue-300 transition-colors duration-300">Gestión productos <ArrowTopRightOnSquareIcon className="w-8 inline ml-2" /></div>

                <div className="bg-blue-400 h-10 pt-5 pb-10 pl-5 pr-5 rounded-2xl text-xl cursor-pointer hover:bg-blue-300 transition-colors duration-300">Gestión usuarios <ArrowTopRightOnSquareIcon className="w-8 inline ml-2" /></div>
            </div>
        </div>
    )
}