import { useState } from "react";

const Register = ({ slide }) => {
    const [email, setEmail] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = { 'email': email };

        fetch('http://127.0.0.1:8000/api/register', {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data.success == false) {
                setError(data.message);
            } else {
                // do something
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
        })
    };

    return (
        <div className={`register ${slide == 'register' ? 'show-register' : 'hide-register'}`}>
            <form action="">
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="email">{error.email}</label>
                <button onClick={handleRegister}>{isLoading ? '...' : 'Continue'}</button>
            </form>
        </div>
    );
}

export default Register;