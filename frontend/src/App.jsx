import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import AdminPanel from "./pages/AdminPanel";

const App = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        children: [
            {
                path: "/",
                element: <Navigate to="/products" />,
            },
            {
                path: "/products",
                element: <HomePage />,
            },
            {
                path: "/adminpanel",
                element: <AdminPanel />,
            },
        ],
    },
]);

export default App;
