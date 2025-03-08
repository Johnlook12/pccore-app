import { parse } from "dotenv";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser){
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);  
            setToken(parsedUser.token);
        };
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
            const {user: userData } = data;

            setToken(data.token);
            
            const tipoResponse = await fetch(`http://localhost:3001/tipousuario/${userData.tipousuario_id}`);
            
            const tipoUsuario = await tipoResponse.json();
            
            const fullUser = { ...userData, tipoUsuario, token: data.token };
            
            setUser(fullUser);
            localStorage.setItem('user', JSON.stringify(fullUser));
            setLoading(false);
            return true;
        }
        return false;
    };

    const logout = () =>{
        setUser(null);
        navigate('/');
        localStorage.removeItem('user');
    }

    return(
        <AuthContext.Provider value={{user,loading,token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = ()=> useContext(AuthContext);