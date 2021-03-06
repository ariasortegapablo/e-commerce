import React, { useState } from "react";
import { Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import moment from "moment";
import "moment/locale/es";
import BasicModal from "../../Modal/BasicModal";
export default function order(props) {
  const { order } = props;
  const { game, totalPayment, createdAt, addressShipping } = order;
  const { title, poster, url } = game;
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="order">
        <div className="order__info">
          <div className="order__info-data">
            <Link href={`/${url}`}>
              <a>
                <Image src={poster[0].url} alt={title} />
              </a>
            </Link>
            <div>
              <h2>{title}</h2>
              <p>{totalPayment} $USD</p>
            </div>
          </div>
          <div className="order__other">
            <p className="order__other-date">
              {moment(createdAt).format("L")} - {moment(createdAt).format("LT")}
            </p>
            <Icon name="eye" circular link onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>
      {showModal && (
        <AddressModal
          showModal={showModal}
          setShowModal={setShowModal}
          addressShipping={addressShipping}
          title={title}
        />
      )}
    </>
  );
}
function AddressModal(props) {
  const { showModal, setShowModal, addressShipping, title } = props;
  return (
    <BasicModal
      open={showModal}
      setShow={setShowModal}
      size="tiny"
      title={title}
    >
      <h3>El pedido se ha enviado a la siguiente direccion</h3>
      <div>
        <p>{addressShipping.name}</p>
        <p>{addressShipping.address}</p>
        <p>
          {
            (addressShipping.state,
            addressShipping.city,
            addressShipping.postalCode)
          }
        </p>
        <p>{addressShipping.phone}</p>
      </div>
    </BasicModal>
  );
}
