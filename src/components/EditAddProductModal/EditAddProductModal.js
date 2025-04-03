import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './EditAddProductModal.css';

function EditAddProductModal({ show, handleClose, title, submitText, product, onSubmit }) {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    quantity: '',
    price: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (show) {
      if (product) {
        setFormData({
          category: product.category || product.Category || '',
          name: product.name || product.Name || '',
          quantity: product.quantity || product.Quantity || '',
          price: product.price || product["Price (€)"] || '',
          description: product.description || product.Description || ''
        });
      } else {
        setFormData({
          category: '',
          name: '',
          quantity: '',
          price: '',
          description: ''
        });
      }
      setErrors({}); // Очищаємо помилки при відкритті модалки
    }
  }, [product, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({ ...prev, [name]: '' })); // Очищаємо помилку при введенні
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.description) newErrors.description = "Description is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Якщо немає помилок, повертаємо true
  };

  const handleSubmit = () => {
    if (validate()) {
      const processedData = {
        ...formData,
        quantity: formData.quantity !== '' ? Number(formData.quantity) : '',
        price: formData.price !== '' ? Number(formData.price) : ''
      };
      console.log("Submitting form data:", processedData);
      onSubmit(processedData);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="custom-invalid">
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control 
              type="text" 
              name="category"
              value={formData.category}
              onChange={handleChange}
              isInvalid={!!errors.category} 
              autoFocus 
            />
            <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name} 
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control 
              type="text" 
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              isInvalid={!!errors.quantity} 
            />
            <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type="text" 
              name="price"
              value={formData.price}
              onChange={handleChange}
              isInvalid={!!errors.price} 
            />
            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!errors.description} 
            />
            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} className='submitnAddBtn'>
          {submitText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditAddProductModal;