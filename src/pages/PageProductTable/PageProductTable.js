import './PageProductTable.css';
import ButtonProductTable from '../../components/ButtonProductTable/ButtonProductTable';
import RozetkaLogo from  'D:/hillel_front-end_pro/panel-rozetka/my-app/src/assets/rozetkaLogo.svg';
import Table from '../../components/Table/Table';
import DeleteConfirmationModal from '../../components/DeleteConfirmationProduct/DeleteConfarmationProduct';
import { API_URL } from '../../constants';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'


const PageProductTable = () => {
    const [products, setProducts] = useState ([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    useEffect (() =>{
        getProducts()
    },[])
        const getProducts = async () =>{
            try{
        const response = await fetch (`${API_URL}/product`)
        const data = await response.json();
        setProducts(data);
    } catch(error){
        console.log('Error', error)
    }
    }

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
      };
    
      const handleDelete = async () => {
        if (!selectedProduct) return;
    
        try {
          await fetch(`${API_URL}/product/${selectedProduct.id}`, {
            method: "DELETE",
          });
    
          setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
          setIsModalOpen(false);
        } catch (error) {
          console.log("Error deleting product", error);
        }
      };


    const handlePreviewClick = () => {
        navigate('/product-preview');
    };


    return(
        <>
        <div className='container'>
            <div className='pageProductTable'>
            <img src={RozetkaLogo} alt='RozetkaLogo' className='RozetkaLogoProductTable' />
            <div className='btnGroup'>
            <ButtonProductTable className = "buttonPreview btnProductTable" onClick={handlePreviewClick}>Preview</ButtonProductTable>
            <ButtonProductTable className = "buttonAddProduct btnProductTable">Add Product</ButtonProductTable>
            </div>
            <h1>Products</h1>
            <Table products={products} className='productTable' onDelete={handleDeleteClick}/>
            </div>
        </div>
        <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={handleDelete}
      />
      </>
    )
}
export default PageProductTable;