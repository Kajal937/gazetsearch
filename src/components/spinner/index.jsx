import React from "react";
import { Spinner } from "@chakra-ui/react";

const ChakraSpinner = () => {
  return (
    <>
      <Spinner
        thickness="3px"
        speed="0.65s"
        emptyColor="gray.200"
        // color="#222832"
        size="xl"
        className="!text-firstColorBg"
      />
    </>
  );
};

export default ChakraSpinner;
