import '../styles/Modal.css';

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

function Modal(modalProps : ModalProps) {
  return (
    <div className="modal-backdrop" onClick={modalProps.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={modalProps.onClose}>✖</button>
        {modalProps.children}
      </div>
    </div>
  );
}

export default Modal;