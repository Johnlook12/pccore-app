import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const CarritoContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return Array.isArray(action.payload) ? action.payload : [];
    default:
      return state;
  }
};

export const CarritoProvider = ({ children }) => {
  const {user, token} = useAuth();
  const [cart, dispatch] = useReducer(cartReducer, []);


  // Cargar el carrito desde el servidor al iniciar el contexto
  const fetchCart = async () => {
    try {
      if (!token) {
        console.error('No se encontró token');
        dispatch({ type: 'LOAD_CART', payload: [] });
        return;
      }
      const res = await fetch('http://localhost:3001/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!Array.isArray(data)) {
        console.error('Respuesta inesperada del servidor:', data);
        dispatch({ type: 'LOAD_CART', payload: [] });
      } else {
        dispatch({ type: 'LOAD_CART', payload: data });
      }
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
      dispatch({ type: 'LOAD_CART', payload: [] });
    }
  };

  useEffect(() => {
    if(token){
      fetchCart();
    }
  }, [user,token]);

  // Función para actualizar el carrito en el servidor
  const updateCartOnServer = async (newCart) => {
    try {
      if (!token) return;
      await fetch('http://localhost:3001/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newCart)
      });
    } catch (error) {
      console.error('Error al actualizar el carrito en el servidor:', error);
    }
  };

  const addToCart = async (product,quantity) => {
    let newCart;
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      newCart = (existingItem.cantidad < product.stock)
        ? cart.map(item =>
            item.id === product.id
              ? { ...item, cantidad: item.cantidad + (quantity>=1?quantity:1) }
              : item
          )
        : cart;
    } else {
      newCart = [...cart, { ...product, cantidad: (quantity>=1?quantity:1) }];
    }
    dispatch({ type: 'LOAD_CART', payload: newCart });
    await updateCartOnServer(newCart);
  };

  const removeFromCart = async (productId) => {
    const newCart = cart.reduce((acc, item) => {
      if (item.id === productId) {
        if (item.cantidad > 1) {
          acc.push({ ...item, cantidad: item.cantidad - 1 });
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
    dispatch({ type: 'LOAD_CART', payload: newCart });
    await updateCartOnServer(newCart);
  };

  const clearCart = async () => {
    dispatch({ type: 'LOAD_CART', payload: [] });
    try {
      if (!token) return;
      await fetch('http://localhost:3001/api/cart', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error al vaciar el carrito en el servidor:', error);
    }
  };

  return (
    <CarritoContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCart = () => useContext(CarritoContext);
