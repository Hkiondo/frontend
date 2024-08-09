import { useState,useEffect } from "react";
import axios from "axios";
function StudentPanel(){

    const [student,setStudent] = useState([]);

    async function getStudents(){
        axios.get('http://localhost:4000/api/admin/get-all-student')
        .then((result)=>{   
            console.log(result.data);
            setStudent(result.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        getStudents();
    },[])

    return(
        <div>
            This is the Student admin
        </div>
    )

}

export default StudentPanel;