import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyUpdateEmail = () => {
    const { code } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        console.log(code);
        fetch(`http://127.0.0.1:8000/api/user/email/verify?code=${code}`, {
            method: 'get',
            headers: { "Content-Type": "application/json" },
        }).then(res => {
            console.log(res);
            return res.json();
        }).then(data => {
            if (data.success == true) {
                setIsVerified(true);
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    }, []);

    return (
        <div className="auth">
            {isLoading ?
                <div>...</div> :
                <div>
                    {isVerified ? (
                        <div>your email has been updated</div>
                    ) :
                        <div>error</div>
                    }
                </div>
            }
        </div>
    );
}

export default VerifyUpdateEmail;