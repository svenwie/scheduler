import * as React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { leaveData } from './datasource';
import { DataManager, Query } from '@syncfusion/ej2-data';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
/**
 * Schedule normal events sample
 */
export class DefaultEvents extends SampleBase {
    constructor() {
        super(...arguments);
        this.data = extend([], leaveData, null, true);
    }
    onEventRendered(args) {
        let categoryColor;
        let appData = args.data;
        let eventFields = this.scheduleObj.eventFields;
        let parentApp = new DataManager(this.scheduleObj.eventsData).
            executeLocal(new Query().where(eventFields.id, 'equal', appData[eventFields.id]))[0];
        let start = new Date(parentApp[eventFields.startTime]).setHours(0, 0, 0, 0);
        let end = new Date(parentApp[eventFields.endTime]).setHours(0, 0, 0, 0);
        if (appData.IsAllDay) {
            categoryColor = '#8e24aa';
        }
        else if (start !== end) {
            categoryColor = '#f57f17';
        }
        else {
            categoryColor = '#7fa900';
        }
        if (this.scheduleObj.currentView === 'Agenda') {
            args.element.firstChild.style.borderLeftColor = categoryColor;
        }
        else {
            args.element.style.backgroundColor = categoryColor;
        }
    }
    render() {
        return (<div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='650px' ref={t => this.scheduleObj = t} selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: this.data }} eventRendered={this.onEventRendered.bind(this)}>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}/>
            </ScheduleComponent>
          </div>
        </div>
      </div>);
    }
}