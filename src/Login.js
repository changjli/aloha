import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ slide }) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = { 'email': email, 'password': password };

        fetch('http://127.0.0.1:8000/api/login', {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data.success == false) {
                setError(data.message);
            } else {
                login(data.data)
            }
            setIsLoading(false);

        }).catch(err => {
            console.log(err);
            setIsLoading(false);

        })
    };

    const login = (data) => {
        sessionStorage.setItem('userToken', data.token.split('|')[1]);
        sessionStorage.setItem('user', data.username);
        navigate('/');
    }

    return (
        <div className={`login ${slide == 'login' ? 'show-login' : 'hide-login'}`}>
            <form action="">
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="email">{error.email}</label>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="password">{error.password}</label>
                <Link to='/forgot-password'>Forgot Password?</Link>
                <button onClick={handleLogin}>{isLoading ? '...' : 'Login'}</button>
                <label htmlFor="">{error.error}</label>
            </form>
        </div>
    );
}

export default Login;