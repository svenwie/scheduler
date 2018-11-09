import { render } from 'react-dom';
import './index.css';
import * as React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';
import AddShifts from './shifts/AddShifts';
import DeleteShifts from './shifts/DeleteShifts';
import ModifyShifts from './shifts/ModifyShifts';
import AddShiftEntry from './shiftEntry/AddShiftEntry';
import DeleteShiftEntry from './shiftEntry/DeleteShiftEntry';
import ModifyShiftEntry from './shiftEntry/ModifyShiftEntry';

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
        let scheduleShiftEntry = myJson.map(shiftEntry => ({ Id: shiftEntry.id, Subject: 'Resource', StartTime: shiftEntry.start, EndTime: shiftEntry.end }));
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
              <AddShifts parentMethod={this.getData}>{this.props.children}</AddShifts><br />
              <ModifyShifts parentMethod={this.getData}>{this.props.children}</ModifyShifts><br />
              <DeleteShifts parentMethod={this.getData}>{this.props.children}</DeleteShifts><br />
            </div>
            <div>
              <ScheduleComponent height='650px' width='1000px' eventSettings={{ dataSource: this.state.scheduleData }} eventSettings={{ dataSource: this.state.getShiftEntry }}>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
              </ScheduleComponent>
            </div>
            <div>
              <AddShiftEntry parentMethod={this.getShiftEntry}>{this.props.children}</AddShiftEntry><br />
              <ModifyShiftEntry parentMethod={this.getShiftEntry}>{this.props.children}></ModifyShiftEntry><br />
              <DeleteShiftEntry parentMethod={this.getShiftEntry}>{this.props.children}</DeleteShiftEntry><br />
            </div>
            <div>
              <ScheduleComponent height='650px' width='1000px' eventSettings={{ dataSource: this.state.scheduleShiftEntry }} >
                <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
              </ScheduleComponent>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

render(<Default />, document.getElementById('sample'));