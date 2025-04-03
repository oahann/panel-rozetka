import './Table.css';
import Product from '../Product/Product'
   
const Table = ({ products, onDelete, onEdit }) => {
  const headers = products.length > 0
    ? Object.keys(products[0]).filter(key => key !== 'ImageUrl' && key !== 'IsReady')
    : [];

  return (
    <table className='productTable'>
     <thead>
        <tr className='tableHeader'>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <Product className={index % 2 === 0 ? 'evenRow' : 'oddRow'}
           key={index} 
           product={product} 
           headers={headers} 
           onDelete={() => onDelete(product)} 
           onEdit={() => onEdit(product)}/>
        ))}
      </tbody>
    </table>
  );
};

export default Table;