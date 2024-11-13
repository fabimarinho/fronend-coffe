import { FaShoppingCart } from 'react-icons/fa'
import style from './styles.module.scss'


export default function Carrinho({data} :any) {
    
  
    return (
      <div className={style.cartContainer}>
        <header className={style.cartTitle}>
          <h1>
            <FaShoppingCart /> Carrinho de Compras
          </h1>
        </header>
        <div className={style.cartItems}>
        </div>
        <div className={style.cartSummary}>
          <p>Subtotal: R$ </p>
          <p>Frete: grátis</p>
          <p>Total: R$ </p>
        </div>
        <div  className={style.hintText}>
        <p>Se possuir cupons de desconto utilize na próxima página</p>
        </div>
        <div className={style.cartActions}>
          <button className={style.buttonText}>PROSSEGUIR</button>
          <button className={style.buttonText}>LIMPAR CARRINHO</button>
        </div>
        <div className={style.cartButtons}>
          <button className={style.buttonRed}>Escolher mais produtos</button>
          <button className={style.buttonGreen}>Finalizar compra</button>
        </div>
       
      </div>
    );
  }