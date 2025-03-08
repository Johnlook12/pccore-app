import { useEffect, useState } from 'react';
import { findAll as findAllService, add, findById as findByIdService, deleteUser as deleteService, updateUser as updateUserService } from '../services/UserService';

export const useUser = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const findAll = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await findAllService();
            setUsuarios(data);
            return data;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        findAll();
    }, []);

    const insertUser = async (newUser) => {
        setLoading(true);
        setError('');
        try {
            const createdData = await add(newUser);
            return createdData;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const findById = async (id) => {
        setLoading(true);
        setError('');
        try {
            const data = await findByIdService(id);
            return data;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const deleteUser = async (id) => {
        setLoading(true);
        setError('');
        try {
            const response = await deleteService(id);
            return response;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const updateUser = async (id, user) => {
        setLoading(true);
        setError('');
        try {
            const updatedUser = await updateUserService(id, user);
            return updatedUser;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { usuarios, findById,updateUser, findAll, deleteUser, insertUser, loading, error };
}

