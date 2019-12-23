import React from 'react';
// import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Container, Menu, Header } from 'semantic-ui-react'
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

class App extends React.Component {
  initialUser = {
    username: '',
    password: '',
    display_name: ''
  }
  state = {
    token: null,
    user: this.initialUser,
    error: null
  }

  handleLoginChange = (e) => {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value }
    })
  }

  handleErrors = (response) => {
    if (!response.ok) {
      this.setState({ error: response })
      throw Error(response.statusText);
    }
    return response;
  }

  handleLoginSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: this.state.user
      })
    })
      .then(this.handleErrors)
      .then(res => res.json())
      .then(data => {
        this.setState({ token: data.jwt })
      })
  }

  handleSignupSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: this.state.user
      })
    })
      .then(this.handleErrors)
      .then(res => res.json())
      .then(data => {
        this.setState({ token: data.jwt, user: data.user })
      })
      .catch(error => {
        console.error(error);

      })
  }

  render() {

    return (
      <Router>
        <Container>
          <Menu>
            <NavLink className='item' to='/login'>
              Login
            </NavLink>
            <NavLink className='item' to='/signup'>
              Signup
            </NavLink>
          </Menu>
          <Switch>
            <Route path='/login'>
              <Login handleLoginChange={this.handleLoginChange} handleSubmit={this.handleLoginSubmit} user={this.state.user} error={this.state.error} />
            </Route>
            <Route path='/signup'>
              <Signup handleLoginChange={this.handleLoginChange} handleSubmit={this.handleSignupSubmit} user={this.state.user} error={this.state.error} />
            </Route>
            <Route path='/'>
              hello
            </Route>
          </Switch>
        </Container>
      </Router >
    );
  }
}

export default App;
