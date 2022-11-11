import Paper from '@mui/material/Paper';
import { ViewState,EditingState,IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  ConfirmationDialog,
  DragDropProvider,
  ViewSwitcher
} from '@devexpress/dx-react-scheduler-material-ui';
import {useState, useEffect} from 'react';
import ScheduleForm from './ScheduleForm';

const currentDate = new Date();
const schedulerData = [
  { startDate: new Date('2022-11-06T09:45'), endDate: new Date('2022-11-06T11:00'), title: 'Meeting',id:0 },
  { startDate: new Date('2022-11-07T12:00'), endDate: new Date('2022-11-07T13:30'), title: 'Go to a gym',id:1 },
];
let isLoaded = false;

const TimeTableCell = ({ onDoubleClick, ...restProps }) => {
    return <WeekView.TimeTableCell onClick={onDoubleClick} {...restProps} />;
  };

export default function Schedule({loadingFunc}){
    const [data,setSchedulerData] = useState([]);
    // const [loading, setLoading] = useState(false);

    useEffect(()=>{
        // console.log(data);
        if(!isLoaded){
            loadingFunc(true);
            console.log('load schedule');
            fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(json => {
                // console.log(json);
                isLoaded = true;
                loadingFunc(false);
                setSchedulerData(schedulerData);
            })
        }
    },[data]);
    const TextEditor = (props) => {
        // eslint-disable-next-line react/destructuring-assignment
        // console.log(props);
        let newProps = {...props};
        // if(props.type === 'titleTextEditor'){
        //     return <AppointmentForm.Select
        //     >
                
        //     </AppointmentForm.Select>
        // }
        if (props.placeholder === 'Notes') {
            newProps.placeholder='Address';
        } 
        return <AppointmentForm.TextEditor {...newProps} />;
    };
    const LayoutComponent = (props)=>{
        return (
        <AppointmentForm.Layout
            basicLayoutComponent={ScheduleForm}
            commandLayoutComponent={()=>{return(<></>)}}
            recurrenceLayoutComponent={()=>{return(<></>)}}
            booleanEditorComponent={()=>{return(<></>)}}
            textEditorComponent={()=>{return(<></>)}}
            isRecurrence={false}
        >
            <div>layout</div>
        </AppointmentForm.Layout>);
    }
    function commitChanges(e) {
        loadingFunc(true);
        let { added, changed, deleted } = e;
        console.log(e);
        let updatedList = [];
        if(changed){
            updatedList = data.map(item => 
                {
                  if (changed[item.id]){
                    return {...item, ...changed[item.id]}; 
                  }
                  return item; // else return unmodified item 
                });
        }
        if(added){
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            updatedList = [...data, { id: startingAddedId, ...added }];
        }
        if(deleted !== undefined){
            updatedList = data.filter(appointment => appointment.id !== deleted);
        }
        console.log('update schedule');
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
            setSchedulerData(updatedList);
            loadingFunc(false);
        })
    }
    return(
        <Paper>
            <Scheduler
            data={data}
            >
            <ViewState
                defaultCurrentDate={currentDate}
            />
            <EditingState
                onCommitChanges={commitChanges}
            />
            <IntegratedEditing />
            <Toolbar/>
            <ViewSwitcher />
            <DateNavigator />
            <DayView
                // startDayHour={9}
                // endDayHour={18}
                timeTableCellComponent={TimeTableCell}
            />
            <WeekView
                // startDayHour={9}
                // endDayHour={18}
                timeTableCellComponent={TimeTableCell}
            />
            <Appointments />
            <AppointmentTooltip
                showCloseButton
                showOpenButton
                showDeleteButton
                />
            <ConfirmationDialog />
            <AppointmentForm
                // overlayComponent={ScheduleForm}

                basicLayoutComponent={ScheduleForm}
                // recurrenceLayoutComponent={()=>{return(<></>)}}
                // booleanEditorComponent={()=>{return(<></>)}}
                // textEditorComponent={TextEditor}

                // layoutComponent={LayoutComponent}
            />
            <DragDropProvider/>
            </Scheduler>
        </Paper>
    );
}