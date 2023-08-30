import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";

const Auth = ({ children }) => {
    let isLoggedIn = false;

    const userToken = sessionStorage.getItem('userToken');

    if (!userToken) {
        isLoggedIn = false;
    } else {
        isLoggedIn = true;
    }

    if (isLoggedIn == false) {
        return <Navigate to='/authorization' />
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                {children}
            </div>
        </div>
    );
}

export default Auth;