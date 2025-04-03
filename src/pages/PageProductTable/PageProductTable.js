import './PageProductTable.css';
import ButtonProductTable from '../../components/ButtonProductTable/ButtonProductTable';
import RozetkaLogo from '../../assets/rozetkaLogo.svg';
import Table from '../../components/Table/Table';
import DeleteConfirmationModal from '../../components/DeleteConfirmationProduct/DeleteConfarmationProduct';
import { API_URL } from '../../constants';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import EditAddProductModal from '../../components/EditAddProductModal/EditAddProductModal';

const PageProductTable = () => {
    const [products, setProducts] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await fetch(`${API_URL}/product`);
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            const data = await response.json();
            setProducts(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load products. Please try again later.');
        }
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedProduct) return;

        try {
            const response = await fetch(`${API_URL}/product/${selectedProduct.id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            setProducts((prev) => prev.filter((product) => product.id !== selectedProduct.id));
            setIsDeleteModalOpen(false);
            setError(null);
        } catch (error) {
            console.error("Error deleting product:", error);
            setError('Failed to delete product. Please try again later.');
        }
    };

    const handleEditClick = (product) => {
        console.log("Edit product:", product);
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleAddClick = () => {
        setSelectedProduct(null);
        setIsAddModalOpen(true);
    };

    const handleEditSubmit = async (updatedProduct) => {
        try {
            console.log("Sending update for product ID:", selectedProduct.id);
            console.log("Update data:", updatedProduct);
        
            const formattedProduct = {
                Category: updatedProduct.category,
                Name: updatedProduct.name,
                Quantity: updatedProduct.quantity,
                "Price (€)": updatedProduct.price,
                description: updatedProduct.description,
                ImageUrl: selectedProduct.ImageUrl,
                IsReady: selectedProduct.IsReady
            };
            
            const response = await fetch(`${API_URL}/product/${selectedProduct.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedProduct),
            });
            
            if (!response.ok) {
                const errorData = await response.text();
                console.error("Server error response:", errorData);
                throw new Error(`HTTP error ${response.status}`);
            }
            
            const updated = await response.json();
            console.log("Updated product received:", updated);
            
            setProducts((prev) => 
                prev.map((product) => (product.id === selectedProduct.id ? updated : product))
            );
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating product:", error);
            alert('Failed to update product. Please try again later.');
        }
    };

    const handleAddSubmit = async (newProduct) => {
        try {
            console.log("Adding new product with data:", newProduct);
            const formattedProduct = {
                Category: newProduct.category,
                Name: newProduct.name,
                Quantity: newProduct.quantity,
                "Price (€)": newProduct.price,
                description: newProduct.description,
                ImageUrl: "http://localhost:3001/static/placeholder.png",
                IsReady: true
            };
            
            const response = await fetch(`${API_URL}/product`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedProduct),
            });
            
            if (!response.ok) {
                const errorData = await response.text();
                console.error("Server error response:", errorData);
                throw new Error(`HTTP error ${response.status}`);
            }
            
            const added = await response.json();
            console.log("Added product received:", added);
            
            setProducts((prev) => [...prev, added]);
            setIsAddModalOpen(false);
        } catch (error) {
            console.error("Error adding product:", error);
            alert('Failed to add product. Please try again later.');
        }
    };

    const handlePreviewClick = () => {
        navigate('/product-preview');
    };

    return (
        <>
            <div className='container'>
                <div className='pageProductTable'>
                    <img src={RozetkaLogo} alt='RozetkaLogo' className='RozetkaLogoProductTable' />
                    <div className='btnGroup'>
                        <ButtonProductTable className="buttonPreview btnProductTable" onClick={handlePreviewClick}>Preview</ButtonProductTable>
                        <ButtonProductTable className="buttonAddProduct btnProductTable" onClick={handleAddClick}>Add Product</ButtonProductTable>
                    </div>
                    <h1 className='headerProducts'>Products</h1>
                    {error && <div className="error-message">{error}</div>}
                    <Table products={products} className='productTable' onDelete={handleDeleteClick} onEdit={handleEditClick} />
                </div>
            </div>

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDelete}
            />
            
            <EditAddProductModal
                show={isEditModalOpen}
                handleClose={() => setIsEditModalOpen(false)}
                title="Edit Product"
                submitText="Submit"
                product={selectedProduct}
                onSubmit={handleEditSubmit}
            />
            <EditAddProductModal
                show={isAddModalOpen}
                handleClose={() => setIsAddModalOpen(false)}
                title="Add Product"
                submitText="Add"
                onSubmit={handleAddSubmit}
            />
        </>
    )
}

export default PageProductTable;