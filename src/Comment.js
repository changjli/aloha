import { useState } from "react";
import { Link } from "react-router-dom";

const Comment = ({ comment, showComment, blog, getBlog }) => {
    const loginUsername = sessionStorage.getItem('user');

    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [content, setContent] = useState('');

    const handleCreateComment = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        const data = { 'content': content, 'blog_id': blog.id, 'parent_id': comment.id }

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

    const handleUpdateComment = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        const data = { 'content': content }

        fetch(`http://127.0.0.1:8000/api/comment/${comment.id}`, {
            method: 'put',
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
                getBlog();
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);

        })
    };

    const handleDeleteComment = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        const data = { 'content': content }

        fetch(`http://127.0.0.1:8000/api/comment/${comment.id}`, {
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
                getBlog();
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);

        })
    };

    return (
        <div className="comment" key={comment.id}>
            {comment.parent_id != 'none' && <div className="indent"></div>}
            <div>
                <div className="author">
                    <div className="row">
                        <img src={comment.user.profile_picture ? `http://127.0.0.1:8000/storage/${comment.user.profile_picture}` : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"} alt="" className="profile-picture" />
                        <div className="col">
                            <Link to={`/user/${comment.user.username}`}>
                                <p>{comment.user.username}</p>
                            </Link>
                            <div className="row">
                                <p>{comment.created_at}</p>
                            </div>
                        </div>
                        {blog.user.username == comment.user.username && <div>author</div>}
                    </div>
                </div>
                <div className="content">
                    {comment.content}
                </div>
                <div className="action">
                    {loginUsername && <button onClick={() => {
                        setContent('');
                        setShowCreate(true);
                    }}>Reply</button>}
                    {loginUsername == comment.user.username && <button onClick={() => {
                        setContent(comment.content);
                        setShowUpdate(true);
                    }}>Update</button>}
                    {loginUsername == comment.user.username && <button onClick={(e) => handleDeleteComment(e)}>
                        Delete</button>}
                </div>
                {showCreate && (
                    <form action="">
                        <div className="col">
                            <textarea name="" id="" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                            <div className="row">
                                <button onClick={() => setShowCreate(false)}>Cancel</button>
                                <button onClick={(e) => handleCreateComment(e)}>Create</button>
                            </div>
                        </div>
                    </form>
                )}
                {showUpdate && (
                    <form action="">
                        <div className="col">
                            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                            <div className="row">
                                <button onClick={() => setShowUpdate(false)}>Cancel</button>
                                <button onClick={(e) => handleUpdateComment(e)}>Update</button>
                            </div>
                        </div>
                    </form>
                )}
                {showComment(comment.id)}
            </div>
        </div>
    );
}

export default Comment;