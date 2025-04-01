import './Table.css';
import Product from '../Product/Product'
   
const Table = ({ products, onDelete }) => {
  const headers = products.length > 0
    ? Object.keys(products[0]).filter(key => key !== 'ImageUrl' && key !== 'IsReady')
    : [];

  return (
    <table>
     <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <Product key={index} product={product} headers={headers} onDelete={() => onDelete(product)}/>
        ))}
      </tbody>
    </table>
  );
};

export default Table;