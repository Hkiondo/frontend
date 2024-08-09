import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

const UserContext = createContext;

const UserProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [token, setToken] =useState(localStorage.getItem('token'));

    useEffect(() =>{
        if(token){
            axios.defaults.headers.common['x-auth-token'] = token;
            axios.get('api/users/profile')
                .then(response => setUser(response.data))
                .catch(error => console.error(error));
        }
    }, [token]);
    return(
        <UserContext.Provider value ={{user, setUser, setToken}}>
            {children}
        </UserContext.Provider>
    );
};
export{UserProvider, UserContext};