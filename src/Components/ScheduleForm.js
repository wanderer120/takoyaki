import { AppointmentForm} from '@devexpress/dx-react-scheduler-material-ui';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import QRCode from 'qrcode.react'

import {useState, useEffect} from 'react';

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <div>{children}</div>
            </Box>
        )}
        </div>
    );
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
export default function ScheduleForm({ onFieldChange, appointmentData, ...restProps }){
    const [value, setValue] = useState(0);
    const [state,setState] = useState('');
    const [clients, setClients] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedClient,setSelectedClient] = useState(1);
    const [selectedEmployees,setSelectedEmployees] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    // console.log(appointmentData);
    
    useEffect(()=>{
        // console.log(restProps);
        //load clients
        if(appointmentData.title === undefined){
            setState('new');
        }
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => {
            setClients(json);
            // onFieldChange({title:json[0].name});
        })
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => {
            setEmployees(json);
            if(appointmentData.employees?.length > 0){
                setSelectedEmployees(appointmentData.employees);
            }
            
            console.log(appointmentData.employees);
        })
        setStartDate(appointmentData.startDate);
        setEndDate(appointmentData.endDate);
    },[]);
    useEffect(()=>{
        let client = clients.find(client=>(client.name === appointmentData.title));
        if(client!=undefined){
            setSelectedClient(client.id);
        }else{
            if(clients.length > 0)onFieldChange({title:clients[0].name});
        }
    },[clients]);
    useEffect(()=>{
        onFieldChange({employees:selectedEmployees});
    },[selectedEmployees]);

    const onCustomFieldChange = (nextValue) => {
        onFieldChange({ customField: nextValue });
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleSelectChange = (e) => {
        // console.log(e.target.value);
        onFieldChange({title:String(clients.find(client=>(client.id === e.target.value)).name)});
        setSelectedClient(e.target.value);
      };
    const handleEmployeeSelectChange = (e)=>{
        const {
            target: { value },
          } = e;
          console.log('handleEmployeeSelectChange');
          console.log(typeof value === 'string' ? value.split(',') : value,);
          setSelectedEmployees(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
          );
          
    }
    return(
        <div>
            <Tabs value={value} onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
            >
                <Tab label="Work Order"  {...a11yProps(0)} />
                {(state !='new')&&
                    <Tab label="Staff Check-In" {...a11yProps(1)}/>
                }
                {(state !='new')&&
                    <Tab label="Customer Feedback" {...a11yProps(2)}/>
                }
            </Tabs>
            <TabPanel value={value} index={0}>
                <AppointmentForm.Label
                        text="Client"
                        type="title"
                />
                <Select
                    labelId="client-label"
                    id="client-select"
                    value={selectedClient}
                    label="Client"
                    onChange={handleSelectChange}
                    >
                    {clients.map((option) => {
                    return (
                        <MenuItem key={option.id} value={option.id}>
                        {option.name}
                        </MenuItem>
                    );
                    })}
                </Select>
                <br/><br/>
                <AppointmentForm.Label
                        text="Date & Time"
                        type="title"
                />
                <div className='datetimeDiv'>Start:</div>
                <AppointmentForm.DateEditor onValueChange={value=>{
                    onFieldChange({startDate:value});
                    // appointmentData.startDate = value
                    return(setStartDate(value))}} 
                    value={startDate}></AppointmentForm.DateEditor><br/>
                <div className='datetimeDiv'>End:</div>
                <AppointmentForm.DateEditor onValueChange={value=>{
                    // appointmentData.endDate = value
                    onFieldChange({endDate:value});
                    return(setEndDate(value))}}
                    value={endDate}></AppointmentForm.DateEditor>
                    <br/><br/>
                <AppointmentForm.Label
                        text="Assigned Employee(s)"
                        type="title"
                />
                <Select
                    multiple
                    onChange={handleEmployeeSelectChange}
                    value={selectedEmployees}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => {
                            return(
                            <Chip key={value} label={employees.find(employee=>(employee.id===value)).name} />
                          )})}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {employees.map((option) => {
                    return (
                        <MenuItem key={option.id} value={option.id}>
                        {option.name}
                        </MenuItem>
                    );
                    })}
                </Select>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <center>
                    <QRCode
                        value="https://wanderer120.github.io/onigiri/?co=123&client=aaa1"
                        size={290}
                        level={"H"}
                        includeMargin={true}
                    />
                <p>
                    https://wanderer120.github.io/onigiri/?co=123&client=aaa1
                </p>
                    <input type="button" 
                    onClick={()=>{
                        navigator.clipboard.writeText('https://wanderer120.github.io/onigiri/?co=123&client=aaa1')
                    }}
                    value='Copy Link'
                    />
                </center>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <center>
                    <QRCode
                        value="https://wanderer120.github.io/inari/#/orders/kjhdsfhgwe-wehgewr-123j/reviews"
                        size={290}
                        level={"H"}
                        includeMargin={true}
                    />
                    <p className='ptagwrap'>
                        https://wanderer120.github.io/inari/#/orders/kjhdsfhgwe-wehgewr-123j/reviews
                    </p>
                    <input type="button" 
                        onClick={()=>{
                            navigator.clipboard.writeText('https://wanderer120.github.io/inari/#/orders/kjhdsfhgwe-wehgewr-123j/reviews')
                        }}
                        value='Copy Link'
                    />
                </center>
            </TabPanel>
        </div>
    );
}