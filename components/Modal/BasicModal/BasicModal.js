import { Modal, Icon } from "semantic-ui-react";

export default function BasicModal(props) {
  //la variable show no sirve
  const { show, setShow, title, children, ...rest } = props;

  //console.log(rest);
  const onClose = () => setShow(false);
  return (
    //el modal para hacerle spread igual hay que
    //usar .. rest
    <Modal className="basic-modal" {...rest}>
      <Modal.Header>
        <span>{title}</span>
        <Icon name="close" onClick={onClose} />
      </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}
