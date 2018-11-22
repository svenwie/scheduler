import { render } from 'react-dom';
import './index.css';
import * as React from 'react';
import {
	WorkWeek,
	Month,
	ScheduleComponent,
	ViewsDirective,
	ViewDirective,
	ResourcesDirective,
	ResourceDirective,
	Inject
} from '@syncfusion/ej2-react-schedule';
import { addClass } from '@syncfusion/ej2-base';

import { doctorData } from './datasource';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';
/**
 * schedule resources group-custom-work-days sample
 */
export class GroupCustomWorkDays extends SampleBase {
	constructor() {
		super(...arguments);
		this.data = extend([], doctorData, null, true);
		this.resourceData = [
			{
				text: 'Will Smith',
				id: 1,
				color: '#ea7a57',
				workDays: [ 1, 2, 4, 5 ],
				startHour: '08:00',
				endHour: '15:00'
			},
			{
				text: 'Alice',
				id: 2,
				color: 'rgb(53, 124, 210)',
				workDays: [ 1, 3, 5 ],
				startHour: '08:00',
				endHour: '17:00'
			},
			{
				text: 'Robson',
				id: 3,
				color: '#7fa900',
				startHour: '08:00',
				endHour: '16:00'
			}
		];
	}
	getDoctorImage(value) {
		let resourceName = this.getDoctorName(value);
		return resourceName.replace(' ', '-').toLowerCase();
	}
	getDoctorName(value) {
		return value.resourceData ? value.resourceData[value.resource.textField] : value.resourceName;
	}
	getDoctorLevel(value) {
		let resourceName = this.getDoctorName(value);
		return resourceName === 'Will Smith'
			? 'Cardiologist'
			: resourceName === 'Alice' ? 'Neurologist' : 'Orthopedic Surgeon';
	}
	onActionBegin(args) {
		if (args.requestType === 'eventCreate' && args.data.length > 0) {
			let eventData = args.data[0];
			let eventField = this.scheduleObj.eventFields;
			let startDate = eventData[eventField.startTime];
			let endDate = eventData[eventField.endTime];
			let resourceIndex = [ 1, 2, 3 ].indexOf(eventData.DoctorId);
			args.cancel = !this.scheduleObj.isSlotAvailable(startDate, endDate, resourceIndex);
		}
	}
	onPopupOpen(args) {
		if (args.target && args.target.classList.contains('e-work-cells')) {
			args.cancel = !args.target.classList.contains('e-work-hours');
		}
	}
	onRenderCell(args) {
		if (args.element.classList.contains('e-work-hours') || args.element.classList.contains('e-work-cells')) {
			addClass(
				[ args.element ],
				[ 'willsmith', 'alice', 'robson' ][parseInt(args.element.getAttribute('data-group-index'), 10)]
			);
		}
	}
	resourceHeaderTemplate(props) {
		return (
			<div className="template-wrap">
				<div className={'resource-image ' + this.getDoctorImage(props)} />
				<div className="resource-detail">
					<div className="resource-name">{this.getDoctorName(props)}</div>
					<div className="resource-designation">{this.getDoctorLevel(props)}</div>
				</div>
			</div>
		);
	}
	onResizeStart(args) {
		args.cancel = true;
	}
	onDragStart(args) {
		args.cancel = true;
	}
	render() {
		return (
			<div className="schedule-control-section">
				<div className="col-lg-12 control-section">
					<div className="control-wrapper">
						<ScheduleComponent
							ref={(schedule) => (this.scheduleObj = schedule)}
							cssClass="custom-work-days"
							width="100%"
							height="650px"
							selectedDate={new Date(2018, 3, 1)}
							currentView="WorkWeek"
							resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
							eventSettings={{
								dataSource: this.data,
								fields: {
									subject: { title: 'Service Type', name: 'Subject' },
									location: { title: 'Patient Name', name: 'Location' },
									description: { title: 'Summary', name: 'Description' },
									startTime: { title: 'From', name: 'StartTime' },
									endTime: { title: 'To', name: 'EndTime' }
								}
							}}
							actionBegin={this.onActionBegin.bind(this)}
							popupOpen={this.onPopupOpen.bind(this)}
							renderCell={this.onRenderCell.bind(this)}
							resizeStart={this.onResizeStart.bind(this)}
							group={{ resources: [ 'Doctors' ] }}
							dragStart={this.onDragStart.bind(this)}
						>
							<ResourcesDirective>
								<ResourceDirective
									field="DoctorId"
									title="Doctor Name"
									name="Doctors"
									dataSource={this.resourceData}
									textField="text"
									idField="id"
									groupIDField="groupId"
									colorField="color"
									workDaysField="workDays"
									startHourField="startHour"
									endHourField="endHour"
								/>
							</ResourcesDirective>
							<ViewsDirective>
								<ViewDirective option="WorkWeek" />
								<ViewDirective option="Month" />
							</ViewsDirective>
							<Inject services={[ WorkWeek, Month ]} />
						</ScheduleComponent>
					</div>
				</div>
			</div>
		);
	}
}

render(<GroupCustomWorkDays />, document.getElementById('sample'));
