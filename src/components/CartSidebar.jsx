import { useCart } from '../context/CartContext';
import { XMarkIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const { user } = useAuth();

  if (!user) return (
    <div className="fixed top-0 z-50 right-0 h-full w-80 bg-[#333333] shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-[#C0C0C0]/20 p-6 flex flex-col items-center justify-center">
      <XMarkIcon 
        onClick={onClose}
        className="h-8 w-8 text-[#C0C0C0] hover:text-[#00A3E0] absolute top-4 right-4 cursor-pointer transition-colors"
      />
      <div className="text-center space-y-4">
        <h2 className="text-xl text-[#C0C0C0] font-medium">Debes iniciar sesión</h2>
        <Link
          to="/login"
          onClick={onClose}
          className="inline-block bg-[#00A3E0] hover:bg-[#0093C7] text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );

  return (
    <div className={`fixed top-0 z-50 right-0 h-full w-96 bg-[#333333] shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-[#C0C0C0]/20 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center pb-4 border-b border-[#C0C0C0]/20">
          <h2 className="text-2xl font-bold text-white">Tu Carrito</h2>
          <button 
            onClick={onClose}
            className="text-[#C0C0C0] hover:text-[#00A3E0] transition-colors p-1 rounded-full"
          >
            <XMarkIcon className="h-7 w-7" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6 py-6">
          {cart.length === 0 ? (
            <div className="text-[#C0C0C0] text-center mt-10">
              Tu carrito está vacío
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="border-b border-[#C0C0C0]/20 pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{item.nombre}</h3>
                    <p className="text-sm text-[#C0C0C0]">
                      €{item.precio} x {item.cantidad}
                    </p>
                    <p className="text-xs text-[#C0C0C0]/80 mt-1">
                      {item.stock - item.cantidad} disponibles en stock
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      type='button'
                      className="text-[#C0C0C0] hover:text-[#00A3E0] transition-colors"
                    >
                      <MinusCircleIcon className="h-6 w-6" />
                    </button>
                    <button 
                      onClick={() => addToCart(item)}
                      type='button'
                      disabled={item.cantidad >= item.stock}
                      className={`${
                        item.cantidad >= item.stock 
                          ? 'text-[#C0C0C0]/30 cursor-not-allowed' 
                          : 'text-[#C0C0C0] hover:text-[#00A3E0]'
                      } transition-colors`}
                    >
                      <PlusCircleIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-[#C0C0C0]/20 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold text-white">Total:</span>
              <span className="font-bold text-xl text-[#00A3E0]">
                €{total.toFixed(2)}
              </span>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="w-full bg-[#00A3E0] hover:bg-[#0093C7] text-white py-3 px-4 rounded-lg font-medium text-center transition-colors"
            >
              Finalizar Compra
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;