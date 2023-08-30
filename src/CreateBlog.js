import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML, convertFromHTML } from 'draft-convert'
import { useNavigate } from "react-router-dom";
import draftToHtml from 'draftjs-to-html';

const CreateBlog = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    const editorState = EditorState.createEmpty();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(1);
    const [content, setContent] = useState(editorState);

    const setEditorState = (editorState) => {
        setContent(editorState);
    }

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
                setCategories(data.data);
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    };

    const handleCreateBlog = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = sessionStorage.getItem('userToken');

        const data = { 'title': title, 'description': description, 'category': category, 'content': draftToHtml(convertToRaw(content.getCurrentContent())) }

        fetch('http://127.0.0.1:8000/api/blog', {
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
                navigate('/');
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        });
    };

    return (
        <div className="create-blog">
            <form action="">
                <div className="form-group">
                    <label htmlFor="">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label htmlFor="" className="error">{error.title}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="">Description</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <label htmlFor="" className="error">{error.description}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="">Category</label>
                    <select name="" id="" value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.map((e) => (
                            <option value={e.id}>{e.name}</option>
                        ))}
                    </select>
                    <label htmlFor="" className="error">{error.title}</label>
                </div>
                <div className="text-area">
                    <Editor editorClassName="wysiwyg" editorState={content} onEditorStateChange={setEditorState} />
                    <label htmlFor="" className="error">{error.content}</label>
                    <button onClick={handleCreateBlog}>Publish</button>
                    <label htmlFor="" className="error">{error.error}</label>
                </div>
            </form>
        </div>
    );
}

export default CreateBlog;