import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn = true }) => {

    const username = sessionStorage.getItem('user');

    const [show, setShow] = useState(false);

    return (
        <div className="navbar">
            <div className="container">
                <nav>
                    <div className="nav-item">
                        <Link to='/'>Aloha</Link>
                    </div>

                    <div className="nav-menu">
                        <Link to='/'>Home</Link>
                        <Link to='/about'>About</Link>
                        <Link to='/categories'>Categories</Link>
                        <Link to='/users'>Authors</Link>
                        <Link to='/blog/create'><i class="fa-solid fa-pen-nib"></i></Link>
                    </div>

                    <div className="nav-profile">
                        {isLoggedIn ?
                            <Link to={`/user/${username}`}>Hello, {username}</Link> :
                            <Link to='/authorization'>Login</Link>
                        }
                    </div>

                    <div className="hamburger-icon">
                        <i class="fa-solid fa-bars" onClick={() => {
                            if (show) {
                                setShow(false);
                            } else {
                                setShow(true);
                            }
                        }}></i>
                    </div>
                </nav>

                <div className={`hamburger-menu ${show && 'show'}`}>
                    <div className="row">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="" className="profile-picture" />
                        <p>Nicholas Audric Surya</p>
                        <Link>
                            <i class="fa-solid fa-pen-to-square"></i>
                        </Link>
                    </div>

                    <Link to='/home'>Home</Link>

                    <Link to='/home'>About</Link>

                    <Link to='/home'>Categories</Link>

                    <Link to='/home'>Authors</Link>
                </div>

                <div className={`backdrop ${show && 'show'}`}></div>
            </div>
        </div>
    );
}

export default Navbar;