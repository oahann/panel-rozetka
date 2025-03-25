import './PageProductTable.css';
import ButtonProductTable from '../../components/ButtonProductTable/ButtonProductTable';
import RozetkaLogo from  'D:/hillel_front-end_pro/panel-rozetka/my-app/src/assets/rozetkaLogo.svg';
import Table from '../../components/Table/Table';
import { API_URL } from '../../constants';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'


const PageProductTable = () => {
    const [products, setProducts] = useState ([]);
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
            <Table products={products} className='productTable'/>
            </div>
        </div>
      </>
    )
}
export default PageProductTable;