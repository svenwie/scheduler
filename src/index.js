import { render } from 'react-dom';
import './index.css';
import * as React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';
import AddAppointment from './shifts/addShifts';
import DeleteAppointment from './shifts/deleteShifts';
import ModifyAppointment from './shifts/modifyShifts';

class Default extends React.Component {
  constructor(props) {
    super(props);
    this.data = extend([], null, true);
  }

  state = {
    scheduleData: [],
    scheduleShiftEntry: []
  }

  change(args) {
    this.scheduleObj.selectedDate = args.value;
    this.scheduleObj.dataBind();
  }

  getData = () => {
    fetch('https://noname.lab.medsolv.net/Shifts')
      .then((response) => {
        return response.json()
      })
      .then((myJson) => {
        // window.appointments = myJson;
        // console.log('--->', myJson)
        let scheduleData = myJson.map(shift => ({ Id: shift.id, Subject: shift.name, StartTime: shift.start, EndTime: shift.end }));
        this.setState({ scheduleData })
        console.log(this)
      })
  }

  getShiftEntry = () => {
    fetch('https://noname.lab.medsolv.net/ShiftEntry')
      .then((response) => {
        return response.json()
      })
      .then((myJson) => {
        // window.appointments = myJson;
        // console.log('--->', myJson)
        let scheduleShiftEntry = myJson.map(shiftEntry => ({ Id: shiftEntry.id, StartTime: shiftEntry.start, EndTime: shiftEntry.end }));
        this.setState({ scheduleShiftEntry })
      })
  }

  componentDidMount() {
    this.getData()
    this.getShiftEntry()
  }

  render() {
    console.log(this.state)
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <div>
              <AddAppointment parentMethod={this.getData}>{this.props.children}></AddAppointment><br />
              <ModifyAppointment parentMethod={this.getData}>{this.props.children}></ModifyAppointment><br />
              <DeleteAppointment parentMethod={this.getData}>{this.props.children}</DeleteAppointment><br />
            </div>
            <div>
            <ScheduleComponent height='650px' width='1000px' eventSettings={{ dataSource: this.state.scheduleData }} >
              <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
            </ScheduleComponent>
            </div>
            <div>
            <ScheduleComponent height='650px' width='1000px' eventSettings={{ dataSource: this.state.scheduleShiftEntry }} >
              <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
            </ScheduleComponent>
            </div>
          </div>
        </div>
      </div>);
  }
}

render(<Default />, document.getElementById('sample'));