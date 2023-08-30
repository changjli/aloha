import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
    const navigate = useNavigate();

    const loginUsername = sessionStorage.getItem('user');

    const [showEmail, setShowEmail] = useState(false);
    const [showName, setShowName] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    const [image, setImage] = useState('');
    const [username, setUsername] = useState('');
    const [profileName, setProfileName] = useState('');

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        fetch(`http://127.0.0.1:8000/api/user/${loginUsername}`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data.success == false) {
                setError(data.message);
            } else {
                setUser(data.data);
                setUsername(data.data.username);
                setProfileName(data.data.profile_name);
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    };

    const handleUpdateAccount = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        const formData = new FormData();

        formData.append('image', image);
        formData.append('username', username);
        formData.append('profile_name', profileName);

        fetch('http://127.0.0.1:8000/api/user/update', {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data.success == false) {
                setError(data.message);
            } else {
                getUser();
            }
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
        })
    }

    const handleLogout = (e) => {
        const token = sessionStorage.getItem('userToken');

        fetch('http://127.0.0.1:8000/api/logout', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data.success == false) {
                setError(data.message);
            } else {
                sessionStorage.removeItem('userToken');
                navigate('/authorization');
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);

        })
    }

    const handleResetPassword = () => {
        const token = sessionStorage.getItem('userToken');

        const data = { 'email': user.email };

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
                console.log(data.data);
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    };

    return (
        <div className="edit-profile">
            {showName && <Name user={user} setShow={setShowName} />}
            {showEmail && <Email user={user} setShow={setShowEmail} />}
            <h1>Edit Profile</h1>
            <img src={user.profile_picture ? `http://127.0.0.1:8000/storage/${user.profile_picture}` : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"} alt="" className="profile-picture" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

            <form action="">
                <div className="row">
                    <p>Profile Picture</p>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <hr />
                <div className="row">
                    <p>Email</p>
                    <p onClick={() => setShowEmail(true)}>{user.email}</p>
                </div>
                <hr />
                <div className="row">
                    <p>Username</p>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <hr />
                <div className="row">
                    <p>Profile Name</p>
                    <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
                </div>
                <hr />
            </form>
            <div className="column">
                <button onClick={handleUpdateAccount}>Save</button>
                <p>Save changes made to your account</p>
            </div>
            <hr />
            <div className="column">
                <button onClick={handleResetPassword}>Reset</button>
                <p>Reset your password</p>
            </div>
            <hr />
            <div className="column">
                <button onClick={handleLogout}>Logout</button>
                <p>Get out of your account</p>
            </div>
            <hr />
            <div className="column">
                <button onClick={handleLogout}>Delete</button>
                <p>Permanently delete account</p>
            </div>
        </div>
    );
}

const Email = ({ user, setShow }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [email, setEmail] = useState(user.email);

    const handleUpdateEmail = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        const data = { 'email': email }

        fetch('http://127.0.0.1:8000/api/user/email', {
            method: 'put',
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
                console.log(data.data);
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);

        })
    }

    return (
        <div className="modal">
            <h1>Email</h1>
            <form action="">
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="text" placeholder="Profile Name" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="row">
                    <button onClick={(e) => handleUpdateEmail(e)}>Save</button>
                    <button onClick={() => setShow(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

const Name = ({ user, setShow }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [username, setUsername] = useState(user.username);
    const [profileName, setProfileName] = useState(user.profile_name);

    const handleUpdateName = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        const data = { 'username': username, 'profile_name': profileName }

        fetch('http://127.0.0.1:8000/api/user', {
            method: 'put',
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
                console.log(data.data);
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);

        })
    }

    return (
        <div className="modal">
            <h1>Bio Data</h1>
            <hr />
            <form action="">
                <div className="form-group">
                    <label htmlFor="">Username</label>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                </div>
                <div className="form-group">
                    <label htmlFor="">Profile Name</label>
                    <input type="text" placeholder="Profile Name" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
                </div>
                <div className="row">
                    <button onClick={(e) => handleUpdateName(e)}>Save</button>
                    <button onClick={() => setShow(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile;