import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import VendorPanel from "../pages/VendorPanel";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />, 
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      
      {
        path: "signup",
        element: <SignUp />
      },
      {
        path: "vendor-panel",
        element: <VendorPanel />
        
      },
      {
        path: "*",  
        element: <NotFound />
      }
    ]
  }
]);

export default router;