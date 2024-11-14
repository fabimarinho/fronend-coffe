'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaShoppingCart, FaTrash} from 'react-icons/fa'
import style from './styles.module.scss'

interface Produto {
  product: string;
  price: number;
  quantity: number;
}

export default function Carrinho() {
  const [total, setTotal] = useState<number>(0);
  const router = useRouter(); // Inicializa o useRouter
  const [cartItems, setCartItems] = useState<Produto[]>([]);
 

  const calcularTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    return (subtotal);
  };

  useEffect(() => { 
    // Carrega o estado do carrinho a partir do localStorage
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      
      }

    if(cartItems.length !== 0){
      calcularTotal();
    }
  }, []);

  // Função para redirecionar o usuário para a página de menu
  const handleChooseMoreProducts = () => {
    router.push('/menu'); // Define a rota da página de menu aqui
  };

    // Função para remover um item do carrinho
    const handleRemoveItem = (index: number) => {
      const updatedCartItems = cartItems.filter((_, i) => i !== index); // Remove o item com base no índice
      setCartItems(updatedCartItems); // Atualiza o estado do carrinho
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Atualiza o localStorage
    };

  return (
    <div className={style.cartContainer}>
      <header className={style.cartTitle}>
        <h1>
          <FaShoppingCart /> Carrinho de Compras
        </h1>
      </header>
      
      <div className={style.cartItems}>
        <div className={style.cartHeader}>
          <span >Produto</span>
          <span>Quantidade</span>
          <span>Preço Unitário</span>
          <span className={style.totaly}>Total</span>
          <span className={style.trashOut}>Excluir Item</span>
        </div>
        
        {cartItems?.map((item: any, index: number) => (
          <div key={index} className={style.cartItem}>
            <span className={style.spanProduto}>{item.product}</span>
            <span className={style.quantity}>{item.quantity}</span>
            <span className={style.price}>R$ {item.price.toFixed(2)}</span>
            <span className={style.sub} >R$ {(item.quantity * item.price).toFixed(2)}</span>
            <span className={style.removeIcon} onClick={() => handleRemoveItem(index)}> 
              <FaTrash/>
            </span>
          </div>
        ))}
      </div>
      
      <div className={style.cartSummary}>
        <p>Subtotal: R$ {calcularTotal().toFixed(2)}</p>
        <p>Frete: grátis</p>
        <p>Total a pagar: R$ {calcularTotal().toFixed(2)}</p>
        <div className={style.hintText}>
          <p>Se possuir cupons de desconto utilize na próxima página</p>
        </div>
      </div>

      <div className={style.cartButtons}>
        <button className={style.buttonRed} onClick={handleChooseMoreProducts}>
          Escolher mais produtos
        </button>
        <button className={style.buttonGreen}>Finalizar compra</button>
      </div>
    </div>
  );
}