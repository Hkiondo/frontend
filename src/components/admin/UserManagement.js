import React, {useEffect, useState} from "react";
import axios from 'axios';

const UserManagement = () =>{
    const [users, setUsers] = useState([]);

    useEffect(() =>{
        axios.get('/api/admin/users')
         .then(response => setUsers(response.data))
         .catch(error =>console.error(error));
    }, []);
    
    return(
        <div className="container">
            <h1>UserManagement</h1>
            <ul>
                {users.map(user =>(
                    <li key={user._id}>{user.name} -{user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;