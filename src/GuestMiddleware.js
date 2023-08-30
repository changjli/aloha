import { Navigate } from "react-router-dom";

const Guest = ({ children }) => {
    // auth
    let isLoggedIn = false;

    const userToken = sessionStorage.getItem('userToken');
    if (!userToken) {
        isLoggedIn = false;
    } else {
        isLoggedIn = true;
    }

    // redirect 
    if (isLoggedIn == true) {
        return <Navigate to='/' />
    }

    return (
        <div className="container">
            {children}
        </div>
    )
}

export default Guest;