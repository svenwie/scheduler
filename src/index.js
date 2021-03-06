import { render } from 'react-dom';
import './index.css';
import * as React from 'react';
import {
	ScheduleComponent,
	Day,
	Week,
	WorkWeek,
	Month,
	Agenda,
	Inject,
	Resize,
	DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';
// import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
// import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import AddShifts from './shifts/AddShifts';
import DeleteShifts from './shifts/DeleteShifts';
import ModifyShifts from './shifts/ModifyShifts';
import AddShiftEntry from './shiftEntry/AddShiftEntry';
import DeleteShiftEntry from './shiftEntry/DeleteShiftEntry';
import ModifyShiftEntry from './shiftEntry/ModifyShiftEntry';

import Modal from 'react-responsive-modal';

const styles = {
	fontFamily: 'sans-serif',
	textAlign: 'center'
};
class Default extends React.Component {
	constructor(...props) {
		console.log(props);
		super(props);
		this.data = extend([], null, true);
	}

	state = {
		scheduleData: [
			//        {
			//     Id: 1,
			//     Subject: 'Server Maintenance',
			//     StartTime: new Date(2018, 11, 11, 10, 0),
			//     EndTime: new Date(2018, 11, 11, 11, 30),
			//    // EventType: 'maintenance',
			//     City: 'Seattle',
			//     CategoryColor: '#1aaa55'
			// }
		],
		scheduleShiftEntry: []
	};

	change(args) {
		this.scheduleObj.selectedDate = args.value;
		this.scheduleObj.dataBind();
	}

	getData = () => {
		fetch('http://192.168.30.110:1337/Shifts')
			.then((response) => {
				return response.json();
			})
			.then((myJson) => {
				let scheduleData = myJson.map((shift) => ({
					Id: shift.id,
					Subject: shift.name,
					StartTime: shift.start,
					EndTime: shift.end
				}));
				this.setState({ scheduleData });
				// console.log(this);
			});
	};

	getShiftEntry = () => {
		fetch('http://192.168.30.110:1337/ShiftEntry')
			.then((response) => {
				return response.json();
			})
			.then((myJson) => {
				let scheduleShiftEntry = myJson.map((shiftEntry) => ({
					Id: shiftEntry.id,
					Subject: 'Resource',
					StartTime: shiftEntry.start,
					EndTime: shiftEntry.end,
					CategoryColor: '#1aaa55'
				}));
				this.setState({ scheduleShiftEntry });
			});
	};

	componentDidMount() {
		this.getData();
		this.getShiftEntry();
	}

	onEventRendered(args) {
		let categoryColor = args.data.CategoryColor;
		if (!args.element || !categoryColor) {
			return;
		}
		if (this.currentView === 'Agenda') {
			args.element.firstChild.style.borderLeftColor = categoryColor;
		} else {
			args.element.style.backgroundColor = categoryColor;
		}
	}

	onEventClick = () => {
		console.log('onAppointmentClick');
	};

	onCellClick = (e) => {
		console.log('onCellKlick wurde ausgelöst');
		this.setState({ open: true });
	};

	onCellDoubleClick = () => {
		console.log('onCellDoubleClick wurde ausgeführt');
		this.setState({ open: true });
	};

	// onOpenModal = () => {
	// 	this.setState({ open: true });
	// };

	onCloseModal = () => {
		this.setState({ open: false });
	};

	onPopupOpen = (e) => {
		this.setState({ open: true });
	};

	onActionBegin(args) {
		console.log('onActionBegin--->', args.requestType);
		if (args.requestType === 'eventCreate') {
			let data = args.data;
			console.log('args.data--->', data);
			console.log('StartTime--->', data[0].StartTime);
			console.log('EndTime--->', data[0].EndTime);
			console.log('Subject--->', data[0].Subject);
			console.log('an event has been created');
		}
		if (args.requestType === 'eventChange') {
			let data = args.data;
			console.log('args.data--->', data);
			console.log('StartTime--->', data.StartTime);
			console.log('EndTime--->', data.EndTime);
			console.log('Subject--->', data.Subject);
			console.log('an event has been changed');
		}
		if (args.requestType === 'eventRemove') {
			let data = args.data;
			console.log('args.data--->', data);
			console.log('StartTime--->', data[0].StartTime);
			console.log('EndTime--->', data[0].EndTime);
			console.log('Subject--->', data[0].Subject);
			console.log('an event has been removed');
		}
	}

	render() {
		var combinedSources = [ ...this.state.scheduleData, ...this.state.scheduleShiftEntry ];
		console.log('this.state->', this.state);
		const { open } = this.state;
		// console.log('this.scheduleObj->', this.scheduleObj);
		// console.log('this.state.scheduleData->', this.state.scheduleData)
		// console.log('this.state.scheduleShiftEntry->', this.state.scheduleShiftEntry)
		// console.log('combinedSources-->', combinedSources)
		return (
			<div className="schedule-control-section">
				<div className="col-lg-9 control-section">
					<div className="control-wrapper">
						<div style={styles}>
							<Modal open={open} onClose={this.onCloseModal} center>
								<div>
									<AddShifts parentMethod={this.getData}>{this.props.children}</AddShifts>
									<br />
									<ModifyShifts parentMethod={this.getData}>{this.props.children}</ModifyShifts>
									<br />
									<DeleteShifts parentMethod={this.getData}>{this.props.children}</DeleteShifts>
									<br />
								</div>
							</Modal>
						</div>
						<div>
							<ScheduleComponent
								height="650px"
								width="1000px"
								eventSettings={{ dataSource: this.state.scheduleData }}
								ref={(schedule) => (this.combinedSources = schedule)}
								cellClick={this.onCellClick}
								cellDoubleClick={this.onCellDoubleClick}
								editorTemplate={this.editorTemplate}
								showQuickInfo={false}
								popupOpen={this.onPopupOpen.bind(this)}
								actionBegin={this.onActionBegin.bind(this)}
							>
								<Inject services={[ Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop ]} />
							</ScheduleComponent>
						</div>
						<Modal open={open} onClose={this.onCloseModal} center>
							<div>
								<AddShiftEntry parentMethod={this.getData}>{this.props.children}</AddShiftEntry>
								<br />
								<ModifyShiftEntry parentMethod={this.getData}>{this.props.children}</ModifyShiftEntry>
								<br />
								<DeleteShiftEntry parentMethod={this.getData}>{this.props.children}</DeleteShiftEntry>
								<br />
							</div>
						</Modal>
						<div>
							<ScheduleComponent
								cssClass="custom-work-days"
								height="650px"
								width="1000px"
								eventSettings={{ dataSource: combinedSources }}
								ref={(schedule) => (this.combinedSources = schedule)}
								cellClick={this.onCellClick}
								cellDoubleClick={this.onCellDoubleClick}
								editorTemplate={this.editorTemplate}
								showQuickInfo={false}
								popupOpen={this.onPopupOpen.bind(this)}
								actionBegin={this.onActionBegin.bind(this)}
								eventRendered={this.onEventRendered.bind(this)}
							>
								<Inject services={[ Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop ]} />
							</ScheduleComponent>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

render(<Default />, document.getElementById('sample'));
