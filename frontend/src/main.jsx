import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import store from "./redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

// Initialize the persistor to manage saved Redux state in localStorage
const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Provider makes the Redux store available to all components in the app */}
    <Provider store={store}>
      {/* PersistGate delays rendering until the persisted state is retrieved and saved to Redux */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    {/* Toaster renders the notification popups (toast.success, toast.error) on the screen */}
    <Toaster />
  </StrictMode>,
);
