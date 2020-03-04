import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//Reactive component that has no state and component did mount
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link class="btn btn-outline-primary" to={"/edit/"+props.exercise._id} style={{marginRight: "5px"}}>edit</Link>
            <Link class="btn btn-outline-danger" onClick={() => props.deleteExercise(props.exercise._id)}>delete</Link>
        </td>
    </tr>
)

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({ exercises: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => console.log(res.data));

        //Update the page with the function called
        //_id is created through the MongoDB database
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    }

    render() {
        return (
            <div>
                <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1>🏋️ Exercise Application Tracker 🏋️</h1>
                    <hr/>
                    <p>Total number of exercises: {this.state.exercises.length}</p>
                </div>
                </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}