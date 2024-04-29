import React from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import theme from "../styles/theme.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyApp: React.FC<MyComponentProps> = ({ Component, pageProps }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <ToastContainer />
        </Hydrate>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default MyApp;

interface MyComponentProps {
  Component: any;
  pageProps: any;
}
