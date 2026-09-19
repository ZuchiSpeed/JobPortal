import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import store from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Provider makes the Redux store available to all components in the app */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* Toaster renders the notification popups (toast.success, toast.error) on the screen */}
    <Toaster />
  </StrictMode>,
);
