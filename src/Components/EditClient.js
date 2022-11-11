import { useRef, useEffect, useState } from "react";
import {
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import {useNavigate} from 'react-router-dom';
export default function EditClient({loadingFunc}){
    const navigate = useNavigate();
    const clientNameRef = useRef();
    const clientAddressRef = useRef();
    const [clientData, setClientData] = useState({clientName:'',clientAddress:''});

    useEffect(()=>{
        loadingFunc(true);
        fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
        .then(response => response.json())
        .then(json => {
            setClientData({clientName:'client1', clientAddress:'555 La Trobe St'});
            clientNameRef.current.value = 'client1';
            clientAddressRef.current.value = '555 La Trobe St';
            console.log('data loaded');
            loadingFunc(false);
            // console.log(json);
            // onFieldChange({title:json[0].name});
        })
    },[]);
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
            let clientName = clientNameRef.current.value;
            let clientAddress = clientAddressRef.current.value;
            console.log({clientName:clientName,clientAddress:clientAddress});
            loadingFunc(false);
            navigate(`/clients`)
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
                            <td>Client Name</td>
                            <td><input ref={clientNameRef} type="text" placeholder="Client Name"></input>   </td>
                        </tr>
                        <tr>
                            <td>
                                Client Address
                            </td>
                            <td>
                                <textarea 
                                    ref={clientAddressRef}
                                    name="Address"
                                    className="Address"
                                    placeholder="Client Address"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button type="submit" color="primary" disabled={!valid}>
                                    Submit
                                </Button>
                            </td>
                            <td>
                                <Link to="/clients" className="btn btn-danger ml-5">
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