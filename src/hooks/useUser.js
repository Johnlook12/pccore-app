import {useEffect, useState} from 'react';
import { findAll, add, findById } from '../services/UserService';

export const useUser = () =>{
    const[usuarios, setUsuarios] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState('');


    useEffect(()=>{
        const fetchUsers = async()=>{
            try {
                const data = await findAll();
                 return data;
            } catch (error) {
                setError(error);
            } finally{
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    const insertUser = async (newUser)=>{
        setLoading(true);
        setError('');
        try {
            const createdData = await add(newUser);
            return createdData;
        } catch (error) {
            setError(error);
        } finally{
            setLoading(false);
        }
    }

    const findById = async (id)=>{
        setLoading(true);
        try {
            const data = await findById(id);
            return data;
        } catch (error) {
            setError(error);
        } finally{
            setLoading(false);
        }
    } 

    return { usuarios, findById, insertUser, loading, error};
}

