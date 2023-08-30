import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const { token } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/forgot-password/verify?token=${token}`, {
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

    const handleResetPassword = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = { 'token': token, 'password': password };

        fetch('http://127.0.0.1:8000/api/reset-password', {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data.success == false) {
                setError(data.message);
            } else {
                console.log(data.data);
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        })
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
                                    <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <input type="text" placeholder="password confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                                    <button onClick={handleResetPassword}>Reset Password</button>
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

export default ResetPassword;