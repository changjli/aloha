import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        getAllCategories();
    }, []);

    const getAllCategories = () => {
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        fetch('http://127.0.0.1:8000/api/category', {
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
                setCategories(data.data);
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    };

    return (
        <div className="categories">
            {categories.map((category) => (
                <div className="category">
                    <Link to={`/category/${category.name}`}>
                        <div className="outlay">
                            <hr />
                            <h1>{category.name}</h1>
                            <hr />
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Categories;