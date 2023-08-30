import { useState } from "react";

const ForgotPassword = () => {

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');

    const handleResetPassword = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        const data = { 'email': email };

        fetch('http://127.0.0.1:8000/api/forgot-password', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data.success == false) {
                setError(data.message);
            } else {
                console.log(data);
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    };

    return (
        <div className="auth">
            <div className="form">
                <h1>Aloha</h1>
                <div className='register'>
                    <form action="">
                        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email">{error.email}</label>
                        <button onClick={(e) => handleResetPassword(e)}>{isLoading ? '...' : 'Continue'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;