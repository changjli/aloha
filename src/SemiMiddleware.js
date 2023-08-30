import Navbar from "./Navbar";

const Semi = ({ children }) => {
    let isLoggedIn = false;

    const userToken = sessionStorage.getItem('userToken');

    if (!userToken) {
        isLoggedIn = false;
    } else {
        isLoggedIn = true;
    }

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} />
            <div className="container">
                {children}
            </div>
        </div>
    );
}

export default Semi;