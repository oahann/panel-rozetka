import './ProductPreview.css';
import ProductCard from "../../components/ProductCard/ProductCard";
import LogoRozetkaSvg from 'D:/hillel_front-end_pro/panel-rozetka/my-app/src/assets/rozetkaLogo.svg';
import { useState, useEffect } from 'react';
import { API_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';

const ProductPreview = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/product`, {
                    credentials: 'include'
                });
                
                if (!response.ok) {
                    throw new Error('Помилка завантаження продуктів');
                }
                
                const data = await response.json();
                
                const productsWithFullImageUrl = data.map(product => ({
                    ...product,
                    ImageUrl: product.ImageUrl?.startsWith('http') 
                        ? product.ImageUrl 
                        : `${API_URL}${product.ImageUrl}`,
                    imageUrl: product.imageUrl?.startsWith('http') 
                        ? product.imageUrl 
                        : `${API_URL}${product.imageUrl}`
                }));
                
                setProducts(productsWithFullImageUrl);
            } catch (error) {
                console.error('Помилка завантаження продуктів:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="container">
                <img src={LogoRozetkaSvg} alt="LogoRozetka" className='RozetkaLogoProductPreview'/>
                <div className="loading">Завантаження...</div>
            </div>
        );
    }
    const handleProductClick = (Id) => {
        navigate(`/product-preview/${Id}`);
    };
    const handleTablePageClick = () => {
        navigate('/product-table');
    };
    return(
        <div className="container">
            <img src={LogoRozetkaSvg} alt="LogoRozetka" className='RozetkaLogoProductPreview' onClick={handleTablePageClick}/>
            <div className="innerCards">
            {Array.isArray(products) && products.length > 0 ? (
                products.map((item) => (
                    <ProductCard onClick={() => handleProductClick(item.ID || item.id)}
                        key={item.ID || item.id}
                        image={item.ImageUrl || item.imageUrl}
                        name={item.Name || item.name}
                        quantity={item.Quantity ?? item.quantity}
                        price={item["Price (€)"] || item.price}
                        isReady={item.IsReady || item.isReady}
                    />
                ))
            ) : (
                <p>Немає доступних продуктів</p>
            )}
            </div>
        </div>
    );
};

export default ProductPreview;