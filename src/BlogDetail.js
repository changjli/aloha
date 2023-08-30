import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Comment from "./Comment";

const BlogDetail = () => {
    const navigate = useNavigate();

    const { slug } = useParams();

    const [showCreate, setShowCreate] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [blog, setBlog] = useState({});
    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);
    const [like, setLike] = useState(false);
    const [keep, setKeep] = useState(false);
    const [error, setError] = useState('');

    const [content, setContent] = useState('');

    useEffect(() => {
        getBlog();
        getLike();
        getKeep();
    }, []);

    const getBlog = () => {
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        fetch(`http://127.0.0.1:8000/api/blog/${slug}`, {
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
                setBlog(data.data);
                setUser(data.data.user);
                setComments(data.data.comment);
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    };

    const getKeep = () => {
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        fetch(`http://127.0.0.1:8000/api/keep/${slug}`, {
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
                if (data.data == null) {
                    setKeep(false);
                } else {
                    setKeep(true);
                }
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    };

    const getLike = () => {
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        fetch(`http://127.0.0.1:8000/api/like/${slug}`, {
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
                if (data.data == null) {
                    setLike(false);
                } else {
                    setLike(true);
                }
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    };

    // recursive 
    const showComment = (id) => {
        const results = comments.filter((comment) => comment.parent_id == id);

        if (results.length == 0) {
            return;
        }

        return results.map((comment) => {
            return (
                <Comment comment={comment} showComment={showComment} blog={blog} getBlog={getBlog} />
            )
        })
    }

    const handleCreateComment = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        const data = { 'content': content, 'blog_id': blog.id, 'parent_id': 'none' }

        fetch('http://127.0.0.1:8000/api/comment', {
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
                setContent('');
                setShowCreate(false);
                getBlog();
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);

        })
    };

    const handleDeleteBlog = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        const data = { 'content': content }

        fetch(`http://127.0.0.1:8000/api/blog/${slug}`, {
            method: 'delete',
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
                navigate('/');
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);

        })
    };

    const handleLike = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        const data = { 'blog_id': blog.id }

        fetch(`http://127.0.0.1:8000/api/like`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            if (data.success == false) {
                setError(data.message);
            } else {
                getLike();
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);

        })
    }

    const handleKeep = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        const data = { 'blog_id': blog.id }

        fetch(`http://127.0.0.1:8000/api/keep`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            if (data.success == false) {
                setError(data.message);
            } else {
                getKeep();
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);

        })
    }

    return (
        <div className="blog-detail">
            <div className="blog">
                <h1 className="title">{blog.title}</h1>
                <h2 className="description">{blog.description}</h2>
                <div className="author">
                    <div className="row">
                        <img src={user.profile_picture ? `http://127.0.0.1:8000/storage/${user.profile_picture}` : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"} alt="" className="profile-picture" />
                        <div className="col">
                            <Link to={`/user/${user.username}`}>
                                <p>{user.username}</p>
                            </Link>
                            <div className="row">
                                <p>{blog.created_at}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="action">
                    <div className="row">
                        <i class="fa-solid fa-thumbs-up" onClick={(e) => handleLike(e)} style={like ? { color: 'salmon' } : { color: 'black' }}></i>
                        <a href="#comments"><i class="fa-solid fa-comment"></i></a>
                    </div>
                    <div className="row">
                        <i class="fa-solid fa-share"></i>
                        <i class="fa-solid fa-floppy-disk"></i>
                        <i class="fa-solid fa-flag" onClick={(e) => handleKeep(e)} style={keep ? { color: 'salmon' } : { color: 'black' }}></i>
                    </div>
                </div>
                <hr />
                <p dangerouslySetInnerHTML={{ __html: blog.content }}></p>
                <div className="row">
                    <button onClick={() => navigate(`/blog/${blog.slug}/edit`)}>Edit</button>
                    <button onClick={(e) => handleDeleteBlog(e)}>Delete</button>
                </div>
            </div>
            <div className="row" style={{ justifyContent: "space-between" }}>
                <h1>Comments</h1>
                <button onClick={() => setShowCreate(true)}>Comment</button>
            </div>
            {showCreate && <form action="">
                <textarea name="" id="" cols="100" rows="10" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <button onClick={(e) => setShowCreate(false)}>Cancel</button>
                <button onClick={(e) => handleCreateComment(e)}>add</button>
            </form>}
            <hr />

            <div className="comments" id="comments">
                {
                    comments.length == 0 ?
                        <div>there is no comment</div> :
                        showComment('none')
                }
            </div>
        </div>
    );
}

export default BlogDetail;