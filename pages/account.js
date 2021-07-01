import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";

import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { getMeApi } from "../Api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm";
import BasicModal from "../components/Modal/BasicModal";
import AddressForm from "../components/Account/AdressForm";
import ListAddress from "../components/Account/ListAddress";
import Seo from "../components/Seo";

//El paquete lodash te da las funciones basicas de javascript solo que con superpoderes
export default function Account() {
  const { auth, logout, setReloadUser } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState(undefined);
  const [reloadAddresses, setReloadAddresses] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) return null;
  // user  es por si el token ha expirado
  if (!auth && !user) {
    router.replace("/");
    return null;
  }
  return (
    <BasicLayout className="account">
      <Seo title="Actualizar datos" />
      <Configuration
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
      <Addresses
        reloadAddresses={reloadAddresses}
        setReloadAddresses={setReloadAddresses}
      />
    </BasicLayout>
  );
}

function Configuration(props) {
  const { user, logout, setReloadUser } = props;
  return (
    <div className="account__configuration">
      <div className="title"> Configuracion </div>
      <ChangeNameForm
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
      <ChangeEmailForm
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
      <ChangePasswordForm user={user} logout={logout} />
    </div>
  );
}
function Addresses(props) {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  // Este es el component que va renderizar nuestro modal
  const [formModal, setFormModal] = useState(null);
  const { reloadAddresses, setReloadAddresses } = props;
  const openModal = (title, address) => {
    setTitleModal(title);
    setFormModal(
      <AddressForm
        setShowModal={setShowModal}
        setReloadAddresses={setReloadAddresses}
        //Verifica si address llega o no, cuando creabamos era nulo
        newAddress={address ? false : true}
        address={address || null}
      />
    );
    setShowModal(true);
  };
  return (
    <div className="account__adresses">
      <div className="title">
        Direcciones
        <Icon name="plus" onClick={() => openModal("nueva direccion")} link />
      </div>
      <div className="data">
        <ListAddress
          reloadAddresses={reloadAddresses}
          setReloadAddresses={setReloadAddresses}
          openModal={openModal}
        ></ListAddress>
      </div>
      <BasicModal open={showModal} setShow={setShowModal} title={titleModal}>
        {formModal}
      </BasicModal>
    </div>
  );
}
