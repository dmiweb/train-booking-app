import { ReactNode } from "react";
import { useAppSelector } from "../../hooks";
import "./Modal.css";

const Modal = ({ children }: { children: ReactNode }) => {
  const { isOpen } = useAppSelector(state => state.modal);

  return (
    <>
      {isOpen &&
        <div className="modal-wrapper">
          <div className="modal">
            {children}
          </div>
        </div>}
    </>
  );
}

export default Modal;