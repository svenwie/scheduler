import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment';
// import { DataManager, Query, ReturnOption } from '@syncfusion/ej2-data';

export default class ModifyShiftEntry extends Component {
    constructor(props) {
        super(props);
        this.state = { Id: '', Start: '', End: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    } 

    handleSubmit = (e) => {
        e.preventDefault();
        const id = this.state.Id
        const appointment = {
            Start: moment(this.state.Start).format(),
            End: moment(this.state.End).format()
        };
        const url = 'https://noname.lab.medsolv.net/shiftEntry/';
        axios.patch(url + id, appointment)
            .then(() => this.props.parentMethod());
        console.log('Resource wurde verändert');
        console.log(url + id, appointment)
        this.setState({
            Id: '', Start: '', End: ''
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Eine Ressource verändern: </label>
                    <input name="Id" type="text" onChange={this.handleChange} value={this.state.Id} placeholder="Hier kann man später eine Ressource wählen" />
                    <input name="Start" type="text" onChange={this.handleChange} value={this.state.Start} placeholder="Start Bsp.: 2018-12-12 10:30:48" />
                    <input name="End" type="text" onChange={this.handleChange} value={this.state.End} placeholder="Ende Bsp.: 2018-12-12 11:30:48" />
                    <button type="submit">Senden</button>
                </form>
            </div>
        )
    }
}
