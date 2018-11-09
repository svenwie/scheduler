import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment';
// import { DataManager, Query, ReturnOption } from '@syncfusion/ej2-data';

export default class ModifyShifts extends Component {
    constructor(props) {
        super(props);
        this.state = { Id: '', Title: '', Start: '', End: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const id = this.state.Id
        const appointment = {
            Name: this.state.Title,
            Start: moment(this.state.Start).format(),
            End: moment(this.state.End).format()
        };
        const url = 'https://noname.lab.medsolv.net/shifts/';
        axios.patch(url + id, appointment)
            .then(() => this.props.parentMethod());
        console.log('Termin wurde verändern');
        console.log(url + id, appointment)
        this.setState({
            Id: '', Title: '', Start: '', End: ''
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Einen Termin verändern: </label>
                    <input name="Id" type="text" onChange={this.handleChange} value={this.state.Id} placeholder="ID der Schicht" />
                    <input name="Title" type="text" onChange={this.handleChange} value={this.state.Title} placeholder="Name der Schicht" />
                    <input name="Start" type="text" onChange={this.handleChange} value={this.state.Start} placeholder="Start Bsp.: 2018-12-12 10:30:48" />
                    <input name="End" type="text" onChange={this.handleChange} value={this.state.End} placeholder="Ende Bsp.: 2018-12-12 11:30:48" />
                    <button type="submit">Senden</button>
                </form>
            </div>
        )
    }
}
