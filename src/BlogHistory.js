import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

const BlogHistory = ({ type }) => {

    const [username] = useOutletContext();

    const [isLoading, setIsLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        getBlogs();
        console.log(type);
    }, [type]);

    const getBlogs = () => {
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        fetch(`http://127.0.0.1:8000/api/blog/${type}/${username}`, {
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
                setBlogs(data.data);
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    };

    return (
        <div className="blogs">
            {blogs.length == 0 ? <div>there is no data</div> : blogs.map((blog) => {
                return (
                    <div className="blog" key={blog.id}>
                        <img src="https://images.unsplash.com/photo-1692131563662-da2d901afbc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=250&q=60" alt="" />
                        <div className="col">
                            <div className="header">
                                <div className="author">{blog.user.username}</div>
                                <div className="time">3 years ago</div>
                            </div>
                            <div className="content">
                                <Link to={`/blog/${blog.slug}`}>
                                    <div className="title">
                                        {blog.title}
                                    </div>
                                    <div className="description">
                                        {blog.description}
                                    </div>
                                </Link>
                            </div>
                            <div className="footer">
                                <div className="category">
                                    {blog.category.name}
                                </div>
                                <div className="action">
                                    <i class="fa-solid fa-thumbs-up"></i>
                                    {blog.likes.length}
                                    <i class="fa-solid fa-comment"></i>
                                    {blog.comments.length}
                                    <i class="fa-solid fa-flag"></i>
                                    {blog.keeps.length}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default BlogHistory;