import React, {useEffect, useState} from "react";
import axios from 'axios';

const ContentManagement = () => {
    const [content, setContent] = useState([]);
    const [newContent, setNewContent] = useState({
        title: '',
        type: '',
        content: '',
    });

    useEffect(() => {
        axios.get('/api/admin/content')
            .then(response => setContent(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/admin/content', newContent)
            .then(response => setContent([...content, response.data]))
            .catch(error => console.error(error));

    };
    return (
        <div className="container">
            <h1>Content Management</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={newContent.title} onChange={e => setNewContent({...newContent, title: e.target.value})}/>
                </label>
                <label>
                    Type:
                    <input type="text" value={newContent.type} onChange={e => setNewContent({...newContent, type: e.target.value})}/>
                </label>
                <label>
                    Content:
                    <textarea value={newContent.content} onChange={e => setNewContent({ ...newContent, content: e.target.value })}></textarea>
                    <input/>
                </label>
                <button type="submit">Add Content</button>
            </form>
            <ul>
                {content.map(item =>(
                    <li key={item._id}>{item.title}
                    -{item.type}</li>
                ))}
            </ul>
        </div>
    );
};
export default ContentManagement;