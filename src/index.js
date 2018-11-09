import { render } from 'react-dom';
import './index.css';
import * as React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';
import AddAppointment from './Appointments/AddAppointment';
import DeleteAppointment from './Appointments/DeleteAppointment';
import ModifyAppointment from './Appointments/ModifyAppointment';

class Default extends React.Component {
  constructor(props) {
    super(props);
    this.data = extend([], null, true);
  }

  state = {
    scheduleData: []
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

  componentDidMount() {
    this.getData()
  }

  render() {
    console.log(this.state)
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent height='650px' eventSettings={{ dataSource: this.state.scheduleData }} >
              <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>
        <div>
          <ModifyAppointment parentMethod={this.getData}>{this.props.children}></ModifyAppointment>
          <AddAppointment parentMethod={this.getData}>{this.props.children}></AddAppointment>
          <DeleteAppointment parentMethod={this.getData}>{this.props.children}</DeleteAppointment>
        </div>
      </div>);
  }
}

render(<Default />, document.getElementById('sample'));