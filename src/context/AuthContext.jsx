import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok && data.token) {
            const { token, user: userData } = data;

            const tipoResponse = await fetch(`http://localhost:3001/tipousuario/${userData.tipousuario_id}`);

            const tipoUsuario = await tipoResponse.json();

            const fullUser = { ...userData, tipoUsuario,token };

            setUser(fullUser);
            localStorage.setItem('user', JSON.stringify(fullUser));
            setLoading(false);
            return true;
        }
        return false;
    };

    const logout = () =>{
        setUser(null);
        localStorage.removeItem('user');
    }

    return(
        <AuthContext.Provider value={{user,loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = ()=> useContext(AuthContext);