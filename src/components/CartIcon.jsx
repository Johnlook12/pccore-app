import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import CartSidebar from './CartSidebar';

const CartIcon = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const itemsCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-[#C0C0C0] hover:text-[#00A3E0] transition-colors"
        aria-label={`Carrito de compras (${itemsCount} items)`}
      >
        <ShoppingCartIcon className="w-7 h-7" />
        
        {itemsCount > 0 && (
          <span 
            className="absolute -top-1 -right-1 bg-[#00A3E0] text-white text-xs font-bold 
                      w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
            aria-hidden="true"
          >
            {itemsCount}
          </span>
        )}
      </button>
      
      <CartSidebar 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        className="border-l border-[#C0C0C0]/20"
      />
    </>
  );
};

export default CartIcon;