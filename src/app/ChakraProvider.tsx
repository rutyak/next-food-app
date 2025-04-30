"use client";

import { ChakraProvider, createSystem } from "@chakra-ui/react";

const system = createSystem();

function Provider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}

export default Provider;