"use client";

import Footer from "@/container/home/footer/Footer";
import Header from "@/container/home/header/Header";
import Body from "@/container/home/body/Body";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import { ChakraProvider, createSystem } from "@chakra-ui/react";
// import { persistor, store } from "./store";

export default function Home() {
  const system = createSystem();

  return (
    <>
      {/* <Provider store={store}>
        <PersistGate persistor={persistor}> */}
          <ChakraProvider value={system}>
            <Header />
            <Body />
            <Footer />
          </ChakraProvider>
        {/* </PersistGate>
      </Provider> */}
    </>
  );
}
