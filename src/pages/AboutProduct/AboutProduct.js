import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import { FaArrowLeft } from "react-icons/fa";

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
        <div>
            <FaArrowLeft onClick ={handleBack} style={{ cursor: "pointer" }}/>
            <h1>{product.Name || product.name}</h1>
            <p>ID: {product.id || product.ID}</p>
            <p>Ціна: {product["Price (€)"] || product.Price} €</p>
            <p>Кількість: {product.quantity || product.Quantity}</p>
            <img src={product.imageUrl || product.ImageUrl} alt={product.name}/>
        </div>
    );
};

export default AboutProduct;
