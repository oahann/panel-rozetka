const Product = ({product, headers}) =>{
    return(
    <tr>
           {headers.map((header, index) => (
        <td key={index}>{product[header]}</td>
      ))}
      <td>
        <button>✏️</button>
        <button>🗑️</button>
      </td>
    </tr>
    )
}
export default Product;