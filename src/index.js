import { render } from 'react-dom';
import React from 'react';
import './index.css';
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
import AddShifts from './shifts/AddShifts';
import DeleteShifts from './shifts/DeleteShifts';
import ModifyShifts from './shifts/ModifyShifts';
import AddShiftEntry from './shiftEntry/AddShiftEntry';
import DeleteShiftEntry from './shiftEntry/DeleteShiftEntry';
import ModifyShiftEntry from './shiftEntry/ModifyShiftEntry';

// import Modal from 'react-responsive-modal';

// const styles = {
// 	fontFamily: 'sans-serif',
// 	textAlign: 'center'
// };

class Default extends React.Component {
	constructor(props) {
		// console.log(props);
		super(props);
		this.data = extend([], null, true);
		this.state = { open: false, scheduleData: [], scheduleShiftEntry: [] };
	}

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
					Subject: 'Ressource',
					StartTime: shiftEntry.start,
					EndTime: shiftEntry.end,
					CategoryColor: '#179b3e'
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

	// wird ausgelöst wenn ein bestehendes appointment geklickt wird
	// onEventClick = () => {
	// 	console.log('onEventClick args');
	// }

	// onCellClick = (e) => {
	// 	console.log('onCellKlick wurde ausgelöst')
	// 	this.setState({ open: true });
	// }

	// onCellDoubleClick = () => {
	// 	console.log('onCellDoubleClick wurde ausgeführt')
	// 	this.setState({ open: true });
	// }

	// wurde in onCellDoubleClick eingebaut, ist die modal bibliothek
	// onOpenModal = () => {
	// 	this.setState({ open: true });
	// };

	// onCloseModal = () => {
	// 	this.setState({ open: false });
	// };

	onActionBegin(args) {
		console.log('onActionBegin--->', args.requestType);
		var data;
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
			
			// console.log('EndTime--->', data[0].EndTime);
			// console.log('Subject--->', data[0].Subject);
			console.log('an event has been changed');
			debugger;
			console.log('StartTime--->', data[0].StartTime);
		}
		if (args.requestType === 'eventRemove') {
			let data = args.data;
			console.log('args.data--->', data);
			// console.log('StartTime--->', data[0].StartTime);
			// console.log('EndTime--->', data[0].EndTime);
			// console.log('Subject--->', data[0].Subject);
			console.log('an event has been removed');
		}
	}

	render() {
		// console.log('this.state->', this.state);
		// console.log('this.props--->',this.props);
		// console.log('this.data--->',this.data)
		// console.log('combinedSources-->', combinedSources)
		var combinedSources = [ ...this.state.scheduleData, ...this.state.scheduleShiftEntry ];
		// const { open } = this.state;
		return (
			<div className="schedule-control-section">
				<div className="col-lg-9 control-section">
					<div className="control-wrapper">
						<div>
							<AddShifts parentMethod={this.getData}>{this.props.children}</AddShifts>
							<br />
							<ModifyShifts parentMethod={this.getData}>{this.props.children}</ModifyShifts>
							<br />
							<DeleteShifts parentMethod={this.getData}>{this.props.children}</DeleteShifts>
							<br />
						</div>
						<div>
							<ScheduleComponent
								height="650px"
								width="1000px"
								eventSettings={{ dataSource: this.state.scheduleData }}
								cellClick={this.onCellClick}
								cellDoubleClick={this.onCellDoubleClick}
								showQuickInfo={false}
							>
								<Inject services={[ Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop ]} />
							</ScheduleComponent>
						</div>
						<div>
							<AddShiftEntry parentMethod={this.getShiftEntry}>{this.props.children}</AddShiftEntry>
							<br />
							<ModifyShiftEntry parentMethod={this.getShiftEntry}>
								{this.props.children}>
							</ModifyShiftEntry>
							<br />
							<DeleteShiftEntry parentMethod={this.getShiftEntry}>{this.props.children}</DeleteShiftEntry>
							<br />
						</div>
						<div>
							<ScheduleComponent
								cssClass="custom-work-days"
								height="650px"
								width="1000px"
								eventSettings={{
									dataSource: combinedSources
								}}
								eventRendered={this.onEventRendered.bind(this)}
								actionBegin={this.onActionBegin.bind(this)}
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
