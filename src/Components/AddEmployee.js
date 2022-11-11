import { useRef } from "react";
import {
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import {useNavigate} from 'react-router-dom';

export default function AddEmployee({loadingFunc}){
    const navigate = useNavigate();
    const employeeNameRef = useRef();

    function handleSubmit(value){
        loadingFunc(true);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1,
            })
        })
        .then(data => {
            data.json();
            let employeeName = employeeNameRef.current.value;
            console.log({employeeName:employeeName});
            loadingFunc(false);
            navigate(`/employees`)
        })
    }
    return(
        <Form
        onSubmit={handleSubmit}
        initialValues={{}}
        render={({ handleSubmit, values, submitting, validating, valid }) => (
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>Employee Name</td>
                            <td><input ref={employeeNameRef} type="text" placeholder="Employee Name"></input>   </td>
                        </tr>
                        <tr>
                            <td>
                                <Button type="submit" color="primary" disabled={!valid}>
                                    Submit
                                </Button>
                            </td>
                            <td>
                                <Link to="/employees" className="btn btn-danger ml-5">
                                    Cancel
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        )}
        />
    );
}