import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';

class UserFilter extends Component {
  render() {
    return <div > placeholder list < /div>
  }
}

class UserRow extends Component {
  render() {
    const user = this.props.user;
    return (
      <tr>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.city}</td>
        <td>{user.created.toDateString()}</td>
      </tr>
    )
  }
}

class UserError extends Component{
  render(){
    const error = this.props.error;
    return( <p> {error} </p>);
  }
}

class UserTable extends Component {
  render() {

    const borderedStyle = {border: "1px solid silver", padding: 6};
    const issueRows= this.props.users.map(user => <UserRow key={user._id} user={user} />);

  return(
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Phone</th>
          <th>City</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>{issueRows}</tbody>
    </table>
   )
  }
}

class UserAdd extends Component {

  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    var form = document.forms.issueAdd;
    this.props.createIssue({
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      phone: form.phone.value,
      city: form.city.value,
      created: new Date(),
    });
  }

  render() {
    return (
      <div>
        <form name="issueAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="firstName" placeholder="firstName" />
          <input type="text" name="lastName" placeholder="lastName" />
          <input type="text" name="email" placeholder="email" />
          <input type="text" name="phone" placeholder="phone" />
          <input type="text" name="city" placeholder="city" />
          <button>Add</button>
       </form>
      </div>
    )
  }

}

const users = [];
let error = "";


class UserList extends Component {

  constructor() {
    super();
    this.state = { users: [] };
    this.error = error;
    this.createIssue = this.createIssue.bind(this);
  }

  createIssue(newIssue) {
    fetch('http://localhost:3000/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    }).then(response => response.json()).then(updatedIssue => {
      let s = updatedIssue.success;
      if(s){
        updatedIssue.user.created = new Date(updatedIssue.user.created);

        const newIssues = this.state.users.concat(updatedIssue.user);
        this.setState({ users: newIssues });
      }else{
        this.setState({ error : JSON.stringify(updatedIssue.message.message)});
      }
    }).catch(err => {
      alert("Error in sending data to server: " + err.message);
    });
  }

  componentDidMount(){
    this.loadData();
    this.setState({ error: error });
  }

  loadData(){
    fetch('http://localhost:3000/api/user').then(response => response.json()).then(data => {
      data.map(user => {
        user.created = new Date(user.created);
        if (user.completionDate)
        user.completionDate = new Date(user.completionDate);
      });
      this.setState({ users: data });
    }).catch(err => {
      console.log(err);
    });
  }


  render() {
    return (
      <div className="App">
        <UserError error={this.state.error}/>
        <h1> Issue Tracker </h1>
        <UserFilter />
        <hr/>
        <UserAdd createIssue = {this.createIssue}/>
        <hr/>
        <UserTable className="App-header" users={this.state.users}/>
      </div>
    )
  }
}

export default UserList;
