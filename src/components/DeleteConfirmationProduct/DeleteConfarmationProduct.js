import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";
import './DeleteConfarmationProduct.css'

const  DeleteConfirmationModal = ({isOpen, onClose, onDelete}) => {

  return (
    <>
      <Modal show={isOpen} onHide={onClose} backdrop="static" centered>
        <Modal.Body className='headerConfirmationDeleteModal'>Are u sure you want to delete this product?</Modal.Body>
        <div className='btnsModal'>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onDelete} className='deleteBtn'>
            Delete
          </Button>
          </div>
      </Modal>
    </>
  );
}

export default DeleteConfirmationModal;