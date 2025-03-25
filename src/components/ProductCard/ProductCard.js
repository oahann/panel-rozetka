import './ProductCard.css';
import { TiShoppingCart } from "react-icons/ti";

const ProductCard = ({ image, name, quantity, price, isReady })=>{
    return(
        <div className="innerCard">
            <img src={image} className='imgProduct'/>
            <h2 className="nameProduct">{name}</h2>
            <div className='innerQuantityAndPrice'>
            <p className="priceProduct">{price} €</p>
            <p className="quantityProduct">Кількість: {quantity}</p>
            </div>    
            <p className="IsReady">
                {isReady ? (
                    <>
          <TiShoppingCart className='iconCart' /> Готовий до відправки
        </>
      ) : (
        "Чекаємо"
      )}
    </p>
        </div>
    )
}
export default ProductCard