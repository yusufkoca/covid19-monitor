import React, { useState, useEffect } from "react";
import getClientGeo from "../services/getClientGeo";
import ClientInfo from "../typings/ClientInfo";

const ClientInfoContext = React.createContext<ClientInfo>({});

type ClientInfoProviderProps = {
  children: React.ReactNode;
};

const ClientInfoProvider = (props: ClientInfoProviderProps) => {
  const [clientInfo, setClientInfo] = useState<ClientInfo>({});
  useEffect(() => {
    getClientGeo().then(function (response) {
      setClientInfo(response.data);
    });
  }, []);
  return (
    <ClientInfoContext.Provider value={clientInfo}>
      {props.children}
    </ClientInfoContext.Provider>
  );
};

const useClientInfo = () => {
  const context = React.useContext(ClientInfoContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a UserProvider");
  }

  return context;
};
export { ClientInfoProvider, useClientInfo };
