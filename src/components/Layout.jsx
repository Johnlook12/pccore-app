import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer"

export function Layout({ children }) {
    return (
        <div>
            <Header />

            <main>
                {children}
            </main>

            <Footer />
        </div>
    )
}