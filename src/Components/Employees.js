import { func } from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import confirm from './confirm';

export default function Employees({loadingFunc}){
    const [searchedData,setSearchData] = useState('');
    const [employees, setEmployees] = useState([]);
    const [filterData,SetFilterData] = useState([]);

    useEffect(()=>{
        loadingFunc(true);
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => {
            setEmployees(json);
            SetFilterData(json);
            console.log('data loaded');
            loadingFunc(false);
            // console.log(json);
            // onFieldChange({title:json[0].name});
        })
    },[]);
    function handleSearchInputChange(e){
        setSearchData(e.target.value);
        
        let newDetails = [...employees];
        let filteredData = newDetails.filter(employee=>{
            return employee.name.toLowerCase().indexOf(e.target.value.toLowerCase())!== -1
        } ); 
        (e.target.value !== '')?SetFilterData(filteredData):SetFilterData(newDetails);
        // console.log(e.target.value);
    }
    
    function deleteEmployee(employee){
        confirm(`Are you sure to delete ${employee.name}?`).then(()=>{
            setEmployees(employees.filter(employeeItem=>employeeItem.id !== employee.id));
            SetFilterData(filterData.filter(employeeItem=>employeeItem.id !== employee.id));
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
                        placeholder="Search Employees Here"
                    />
                </div>
            </center>
            <Link
                to="/employees/new"
                className="btn btn-primary rounded-circle float-right"
                style={{marginRight:"15px"}}
            >
                <i className="fa fa-plus" aria-hidden="true" />
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                        Employee Name <span />
                        </th>
                        <th> Edit </th>
                        <th> Delete </th>
                    </tr>
                </thead>
                <tbody>
                    {filterData.map(employee => {
                        return (
                        <tr key={employee.id}>
                            <td> {employee.name}</td>
                            <td>
                            <Link to={`/employees/${employee.id}/edit`}>
                                <i className="text-primary fas fa-edit icon-color" />
                            </Link>
                            </td>
                            <td>
                            <i
                                onClick={() => deleteEmployee(employee)}
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