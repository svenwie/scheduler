import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import '../index.css'

class AddShifts extends Component {
    constructor(props) {
        super(props);
        this.state = { Title: '', Start: '', End: '' };
        this.handleChange = this.handleChange.bind(this);
    } 

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const appointment = {
            Name: this.state.Title,
            Start: moment(this.state.Start).format(),
            End: moment(this.state.End).format()
        };
        const url = 'https://noname.lab.medsolv.net/shifts';
        axios.post(url, appointment)
            .then(() => this.props.parentMethod());
        console.log('Termin');
        console.log(url, appointment);
        this.setState({
            Title: '', Start: '', End: ''
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Eine Schicht hinzufügen: </label>
                    <input name="Title" type="text" onChange={this.handleChange} value={this.state.Title} placeholder="Name der Schicht" />
                    <input name="Start" type="text" onChange={this.handleChange} value={this.state.Start} placeholder="Start Bsp.: 2018-12-12 10:30:48" />
                    <input name="End" type="text" onChange={this.handleChange} value={this.state.End} placeholder="Ende Bsp.: 2018-12-12 11:30:48" />
                    <button type="submit">Senden </button>
                </form>
            </div>
        )
    }
}

export default AddShifts