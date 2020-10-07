import React, { useState, useEffect } from "react";
import getClientGeo from "../services/getClientGeo";
const ClientInfoContext = React.createContext<Record<string, any>>({});

const ClientInfoProvider = (props: Record<string, any>) => {
  const [clientInfo, setClientInfo] = useState<Record<string, any>>({});
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
