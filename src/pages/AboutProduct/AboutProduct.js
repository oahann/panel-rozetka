import './AboutProduct.css'
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import { FaArrowLeft } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import LogoRozetka from '../../assets/rozetkaLogo.svg'

const AboutProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${API_URL}/product/${productId}`, {
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error("Помилка завантаження продукту");
                }

                const data = await response.json();
                console.log(data)
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка: {error}</p>;
    if (!product) return <p>Товар не знайдено</p>;

    const handleBack =()=>{
        navigate('/product-preview')
    }

    return (
        <div className='container'>
            <div className='backgroundForImage'>
                <img src={LogoRozetka} alt="LogoRozetka" className="LogoRozetkaAboutProduct"/>
            </div>
            <div className='ArrowNName'>
                <FaArrowLeft className='arrow' onClick ={handleBack} style={{ cursor: "pointer" }}/>
                <h1 className='productName'>{product.Name || product.name}</h1>
            </div>
            <div className='productInfoNImg'>
                <div >            
                    <img className='productImg' src={product.imageUrl || product.ImageUrl} alt={product.name}/>
                </div>
                <div className='productInfo'>
                    <p>
                        {product.isReady ? (
                        <>
                        <TiShoppingCart/> Готовий до відправки
                        </>
                    ) : (
                    "Чекаємо"
                    )}
                    </p>
                    <p>{product["Price (€)"] || product.Price} €</p>
                    <p>Quantity: {product.quantity || product.Quantity}</p>
                </div>
            </div>
            <div className='productDescNName'>
            <p>Description: </p>
            <p className='descriptionProductName'>{product.Name || product.name}</p>
            </div>
            <p className='description'>{product.description || product.Description}</p>
        </div>
    );
};

export default AboutProduct;
