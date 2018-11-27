import React, { Component } from 'react'
import axios from 'axios'

class DeleteShiftEntry extends Component {
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
        const url = 'https://noname.lab.medsolv.net/shiftEntry/'
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
                    <label>Eine Ressource löschen: </label>
                    <input id="Id" type="text" onChange={this.handleChange} value={this.state.value} placeholder="Id der Ressource" />
                    <button type="submit">Senden</button>
                </form>
            </div>
        );
    }
}

export default DeleteShiftEntry