import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyRegister = () => {
    const navigate = useNavigate();

    const { code } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/register/verify?code=${code}`, {
            method: 'get',
            headers: { "Content-Type": "application/json" },
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data.success == true) {
                setIsVerified(true);
                setEmail(data.data.email);
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    }, []);

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = { 'code': code, 'email': email, 'username': username, 'password': password };

        fetch('http://127.0.0.1:8000/api/user', {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data.success == false) {
                setError(data.message);
            } else {
                login(data.data);
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    }

    // otomatis login
    const login = (data) => {
        sessionStorage.setItem('userToken', data.token.split('|')[1]);
        sessionStorage.setItem('user', data.username);
        navigate('/');
    }


    return (
        <div className="auth">
            {isLoading ?
                <div>...</div> :
                <div>
                    {isVerified ? (
                        <div className="form">
                            <h1>Aloha</h1>
                            <div className="register">
                                <form action="">
                                    <p>{email}</p>
                                    <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <input type="text" placeholder="password confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                                    <button onClick={handleRegister}>Register</button>
                                </form>
                            </div>
                        </div>
                    ) :
                        <div>error</div>
                    }
                </div>
            }
        </div>
    );
}

export default VerifyRegister;