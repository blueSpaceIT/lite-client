import { StyleProvider } from "@ant-design/cssinjs";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/index.routes";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <StyleProvider layer>
            <RouterProvider router={routes} />
        </StyleProvider>
    </Provider>
);
