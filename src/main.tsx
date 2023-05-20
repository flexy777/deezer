import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import theme from "./theme";
import { ToastContainer } from "react-toastify";

const toastContainerStyle = {
  width: "400px",
  borderRadius: "8px",
  fontFamily: "Nunito, sans-serif !important",
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeButton={false}
        hideProgressBar
        style={toastContainerStyle}
        toastStyle={{
          background: "#333",
          color: "#fff",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
          padding: "16px",
          borderRadius: "8px",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      />
    </ChakraProvider>
  </React.StrictMode>
);
