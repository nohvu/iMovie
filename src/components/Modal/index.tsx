import React, { ReactNode } from 'react';

import './modal.scss';

interface ModalProps {
  children: ReactNode;
  active: boolean;
  id: string;
}

interface ModalContentProps {
  children: ReactNode;
  onClose: any;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
    <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
      {props.children}
    </div>
  );
};

export const ModalContent: React.FC<ModalContentProps> = (props) => {
  const contentRef = React.useRef<any>(null);
  const closeModal = () => {
    contentRef.current.parentNode.classList.remove('active');
    if (props.onClose) props.onClose();
  };
  return (
    <div ref={contentRef} className="modal__content">
      {props.children}
      <div onClick={closeModal} className="modal__content_close">
        <i className="bx bx-x"></i>
      </div>
    </div>
  );
};
