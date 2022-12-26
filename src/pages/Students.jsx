import React, {useState}  from 'react';
import TableRow from '../components/Row';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditDetails from './EditDetails';
import { EditStudent } from '../features/StudentSlice';

const Students = () => {
    const data = useSelector((state)=> state.student);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const AddNewStudent = () => {
        navigate('/Students/AddNewStudent');
    }
    
    const [isEditing, setIsEditing] = useState(false);
    const [StudentId, setStudentId] = useState(null);

    const [editForm, setEditForm] = useState({
        Name: "",
        Age: "",
        Course: "",
        Batch:""
    })

    function handleChange(e) {
        setEditForm({
            ...editForm,[e.target.name]: e.target.value
        })
    }

    function changeEditState(student) {
        if (student.id === editForm.id) {
          setIsEditing(isEditing => !isEditing)
        } else if (isEditing === false) {
          setIsEditing(isEditing => !isEditing)
        }
    }

    function captureEdit(e, clickedstudent) {
        e.preventDefault();
        setStudentId(clickedstudent.id);

        const inputFieldValues = {
            Name: clickedstudent.Name ,
            Age: clickedstudent.Age ,
            Course: clickedstudent.Course ,
            Batch: clickedstudent.Batch ,
        }

        setEditForm(inputFieldValues);
    }

    const handlestudentUpdate = (e) => {
        e.preventDefault();
        dispatch(EditStudent({
            "id": StudentId,
            "Name": editForm.Name ,
            "Age": editForm.Age ,
            "Course": editForm.Course ,
            "Batch": editForm.Batch
        }))
        setStudentId(null);
        setIsEditing(false);
    }

    const handleCancel = () => {
        setIsEditing(false);
    }

    return (
        <div className='container'>
            {isEditing ?
            (<EditDetails
                editForm={editForm}
                handleChange={handleChange}
                handleCancel={handleCancel}
                handlestudentUpdate={handlestudentUpdate}
            />) : (
            <>
                <header className='header'>
                    <h3>Student Details</h3>
                    <button className='butn' onClick={AddNewStudent}>Add new student</button>
                </header>
                <table className="table bg-white shadow-lg">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td className='algn'>Age</td>
                            <td className='algn'>Course</td>
                            <td className='algn'>Batch</td>
                            <td className='algn'>Change</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((student) => {
                            return(
                            <tr key={student.id}>
                                <TableRow student={student} 
                                captureEdit={captureEdit}
                                changeEditState={changeEditState} 
                                />
                            </tr>
                        )})}
                    </tbody>
                </table>
            </>
            )}
        </div>
    );
}

export default Students;