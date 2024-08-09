import { useState,useEffect } from "react";
import axios from "axios";
function TeacherPanel(){

    const [teachers,setTeachers] = useState([]);

    async function getTeachers(){
        axios.get('http://localhost:4000/api/admin/get-all-teachers')
        .then((result)=>{   
            console.log(result.data);
            setTeachers(result.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        getTeachers();
    },[])

    return(
        <div>
            This is the teacher admin
        </div>
    )

}

export default TeacherPanel;