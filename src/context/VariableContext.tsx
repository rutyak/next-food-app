import { createContext } from "react";

interface VariableContextType {
    location: {
      lat: number;
      long: number;
    };
    setLocation: (location: { lat: number; long: number }) => void;
    user: any; 
  }
  
const VariableContext = createContext<VariableContextType>({
    location: {
      lat: 13.0081,
      long: 77.5648,
    },
    setLocation: () => {}, 
    user: null,
  });

export default VariableContext;