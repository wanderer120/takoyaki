import { func } from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import confirm from './confirm';

export default function Clients({loadingFunc}){
    const [searchedData,setSearchData] = useState('');
    const [clients, setClients] = useState([]);
    const [filterData,SetFilterData] = useState([]);

    useEffect(()=>{
        loadingFunc(true);
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => {
            setClients(json);
            SetFilterData(json);
            console.log('data loaded');
            loadingFunc(false);
            // console.log(json);
            // onFieldChange({title:json[0].name});
        })
    },[]);
    function handleSearchInputChange(e){
        setSearchData(e.target.value);
        
        let newDetails = [...clients];
        let filteredData = newDetails.filter(client=>{
            return client.name.toLowerCase().indexOf(e.target.value.toLowerCase())!== -1
        } ); 
        (e.target.value !== '')?SetFilterData(filteredData):SetFilterData(newDetails);
        // console.log(e.target.value);
    }
    
    function deleteClient(client){
        confirm(`Are you sure to delete ${client.name}?`).then(()=>{
            setClients(clients.filter(clientItem=>clientItem.id !== client.id));
            SetFilterData(filterData.filter(clientItem=>clientItem.id !== client.id));
        },()=>{
            
        })
    }
    return(
        <div>
            <center>
                <div className="search">
                    <input
                        className="search-input-field"
                        name={searchedData}
                        onChange={e => handleSearchInputChange(e)}
                        placeholder="Search Clients Here"
                    />
                </div>
            </center>
            <Link
                to="/clients/new"
                className="btn btn-primary rounded-circle float-right"
                style={{marginRight:"15px"}}
            >
                <i className="fa fa-plus" aria-hidden="true" />
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                        Client Name <span />
                        </th>
                        <th> Edit </th>
                        <th> Delete </th>
                    </tr>
                </thead>
                <tbody>
                    {filterData.map(client => {
                        return (
                        <tr key={client.id}>
                            <td> {client.name}</td>
                            <td>
                            <Link to={`/clients/${client.id}/edit`}>
                                <i className="text-primary fas fa-edit icon-color" />
                            </Link>
                            </td>
                            <td>
                            <i
                                onClick={() => deleteClient(client)}
                                className="text-danger far fa-trash-alt"
                            />
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}