import App from "./App";
import SignUp from "./components/SignUp";

const routes = [
    {
        path: "/",
        element: <App />
    },
    {
        path: "/signup/:token",
        element: <SignUp />
    }
]

export default routes