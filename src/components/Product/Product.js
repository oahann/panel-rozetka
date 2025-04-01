const Product = ({product, headers, onDelete}) =>{
    return(
    <tr>
           {headers.map((header, index) => (
        <td key={index}>{product[header]}</td>
      ))}
      <td>
        <button>✏️</button>
        <button onClick={onDelete}>🗑️</button>
      </td>
    </tr>
    )
}
export default Product;