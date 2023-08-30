import { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Authorization = () => {

    const [slide, setSlide] = useState('login');

    return (
        <div className="auth">
            <div className="form">
                <h1>Aloha</h1>
                <div className="button">
                    <div className={`button-slider ${slide == 'login' ? 'show-login' : 'show-register'}`}></div>
                    <button onClick={() => setSlide('login')}>Login</button>
                    <button onClick={() => setSlide('register')}>Register</button>
                </div>
                <div className="slider">
                    <Login slide={slide} />
                    <Register slide={slide} />
                </div>
            </div>
        </div>
    );
}

export default Authorization;