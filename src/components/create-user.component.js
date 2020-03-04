import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        //Extends to the react component parent class
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //Create everything in state so that it automatically updates
        this.state = {
            //Follow the MongoDB description for the object
            username: '',
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        //Prevent default HTML form to be executed
        e.preventDefault();

        const user = {
            username: this.state.username,
        }

        console.log(user);
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        //Returns back to the list of exercises
        this.setState({
            username: '' 
        })
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}