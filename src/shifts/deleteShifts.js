import React, { Component } from 'react'
import axios from 'axios'

class DeleteShifts extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    // call function to delete a shift
    handleSubmit = (e) => {
        e.preventDefault();
        const id = this.state.value
        const url = 'https://noname.lab.medsolv.net/shifts/'
        axios.delete(url + id)
            .then(() => this.props.parentMethod());
        console.log(url + id)
        // console.log('löschen wurde ausgeführt');
        this.setState({
            value: ''
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Einen Termin löschen: </label>
                    <input id="Id" type="text" onChange={this.handleChange} value={this.state.value} placeholder="ID der Schicht" />
                    <button type="submit">Senden</button>
                </form>
            </div>
        );
    }
}

export default DeleteShifts