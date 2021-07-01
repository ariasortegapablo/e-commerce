import React, { useState, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import { getAddressesApi, deleteAddressesApi } from "../../../Api/address";
import useAuth from "../../../hooks/useAuth";
import { map, size } from "lodash";
//funcion anonima autoejecutable
export default function ListAddress(props) {
  const { reloadAddresses, setReloadAddresses, openModal } = props;
  const { auth, logout } = useAuth();
  const [addresses, setAdresses] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAdresses(response || []);
      setReloadAddresses(false);
    })();
  }, [reloadAddresses]);

  if (!addresses) {
    return null;
  }
  return (
    <div className="list-address">
      {console.log(addresses)}
      {size(addresses) === 0 ? (
        <div>
          {console.log("no hay direcciones")}
          <h3>No hay direcciones</h3>
        </div>
      ) : (
        <Grid>
          {
            //cuidado con los map los parentesis son para retorno
            console.log("si hay direcciones")
          }
          {map(addresses, (address) => (
            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
              <Address
                address={address}
                logout={logout}
                setReloadAddresses={setReloadAddresses}
                openModal={openModal}
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
}

function Address(props) {
  const { address, logout, setReloadAddresses, openModal } = props;
  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteAddress = async () => {
    setLoadingDelete(true);
    const response = await deleteAddressesApi(address.id, logout);
    if (response) {
      setReloadAddresses(true);
    }
    setLoadingDelete(false);
  };
  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state},{address.city},{address.postalCode}
      </p>
      <p>{address.phone}</p>

      <div className="actions">
        <Button
          primary
          onClick={() => openModal(`Editar: ${address.title}`, address)}
        >
          Editar
        </Button>
        <Button onClick={deleteAddress} loading={loadingDelete}>
          Eliminar
        </Button>
      </div>
    </div>
  );
}
