import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

const Profile = () => {

    const { username } = useParams();
    const loginUsername = sessionStorage.getItem('user');

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        fetch(`http://127.0.0.1:8000/api/user/${username}`, {
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
                console.log(data.data);
                setUser(data.data);
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    };

    return (
        <div className="profile">
            <h1>{user.username}</h1>
            <nav>
                <div className="nav">
                    <Link to={`/user/${user.username}`}>Blog</Link>
                    <Link to={`/user/${user.username}/keep`}>Saved</Link>
                    <Link to={`/user/${user.username}/like`}>Liked</Link>
                </div>
            </nav>
            <div className="content">
                <Outlet context={[username]} />
                <div className="bio">
                    <div className="user">
                        <img src={user.profile_picture ? `http://127.0.0.1:8000/storage/${user.profile_picture}` : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"} alt="" className="profile-picture" />
                        <p>{user.username}</p>
                        {loginUsername == user.username && <Link to='/profile/edit'><i class="fa-solid fa-pen-to-square"></i></Link>}
                    </div>
                    <div className="about">
                        <p>About me</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, nulla aperiam? Velit, aliquid laudantium veritatis a iste, quasi harum laborum accusantium culpa totam ipsam aliquam accusamus! Unde, blanditiis. Accusamus, quidem!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;