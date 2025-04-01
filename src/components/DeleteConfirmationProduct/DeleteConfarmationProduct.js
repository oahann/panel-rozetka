import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";

const  DeleteConfirmationModal = ({isOpen, onClose, onDelete}) => {

  return (
    <>
      <Modal show={isOpen} onHide={onClose} backdrop="static" centered>
        <Modal.Body >Are u sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteConfirmationModal;