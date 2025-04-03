import './Product.css'
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
const Product = ({className, product, headers, onDelete, onEdit}) =>{
    return(
    <tr className={className}>
        {headers.map((header, index) => (
        <td key={index}>{product[header]}</td>
      ))}
      <td>
        <FaPencilAlt className="editButton" onClick={() => onEdit(product)}/>
        <FaRegTrashAlt className='deleteButton'onClick={onDelete}/>
      </td>
    </tr>
    )
}
export default Product;