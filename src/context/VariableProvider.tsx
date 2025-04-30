import { useEffect, useState } from "react";
import VariableContext from "./VariableContext";

const VariableProvider = ({children}: any) => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState({
    lat: 13.0081,
    long: 77.5648,
  });

  return (
    <VariableContext.Provider value={{ location, setLocation, user}}>
      {children}
    </VariableContext.Provider>
  );
};

export default VariableProvider;