import { useEffect, useState } from "react";
import { Link, redirect, useNavigate, useParams, useSearchParams } from "react-router-dom";

const SearchResult = () => {

    const navigate = useNavigate();

    // get query string
    const { q } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');

    const [search, setSearch] = useState(q);

    useEffect(() => {
        getSearchBlogs();
    }, []);

    const getSearchBlogs = () => {
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        fetch(`http://127.0.0.1:8000/api/search?q=${search}`, {
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
                setBlogs(data.data);
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const searchImage = (targetString) => {
        const start = targetString.indexOf('<img');

        if (!start) {
            return (<div className="blog-image"><img src="https://images.unsplash.com/photo-1692131563662-da2d901afbc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=250&q=60" alt="" /></div>);
        }

        for (let i = start; i < targetString.length; i++) {
            if (targetString[i] == '>') {
                console.log(targetString.slice(start, i + 1));
                return (<div className="blog-image" dangerouslySetInnerHTML={{
                    __html: targetString.slice(start, i + 1)
                }}></div>);
            }
        }
    }

    return (
        <div className="home">
            <div className="header">
                <h1>Results for search</h1>
                <p>Explore and Emrich, Cultivating Creativity Through Blogs</p>
                <div className="search-bar">
                    <form action="">
                        <input type="text" placeholder="Search blogs by title, category, author..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button onClick={() => navigate(`/search/${search}`)}><i class="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                </div>
            </div>
            <div className="blogs">
                {blogs.length == 0 ?
                    <div>There is no data</div> :
                    blogs.map(blog =>
                        <div className="blog">
                            {searchImage(blog.content)}
                            <Link to={`/blog/${blog.slug}`}>
                                <div className="content">
                                    <div className="row">
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
                                    <div className="title">
                                        {blog.title}
                                    </div>
                                    <div className="description">
                                        {blog.description}
                                    </div>
                                </div>
                            </Link>
                            <div className="author">
                                <div>
                                    <Link to={`/user/${blog.user.username}`}>{blog.user.username}</Link>
                                </div>
                                <div>
                                    3 years ago
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default SearchResult;