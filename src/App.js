import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import YelpContainer from './containers/YelpContainer';

class App extends React.Component {
  initialUser = {
    username: '',
    password: '',
    display_name: ''
  }
  state = {
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
      this.setState({ error: response.statusText })
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
        user: {
          username: this.state.user.username,
          password: this.state.user.password
        }
      })
    })
      // .then(this.handleErrors)
      .then(res => res.json())
      .then(data => {
        if (!data.statusText) {
          localStorage.setItem('token', data.jwt)
          localStorage.setItem('displayName', data.user.display_name)
          this.setState({ user: { ...this.initialUser, display_name: data.user.display_name }, error: null })
        } else
          this.setState({ error: data.statusText })
      })
      .catch(console.log)
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
      // .then(this.handleErrors)
      .then(res => res.json())
      .then(data => {
        if (!data.statusText) {
          this.setState({ user: data.user, error: null })
          localStorage.setItem('token', data.jwt)
          localStorage.setItem('displayName', data.user.display_name)
        } else
          this.setState({ error: data.statusText })
      })
      .catch(console.log)

  }

  resetError = () => {
    this.setState({ error: null })
  }

  handleLogout = (_) => {
    localStorage.clear()
    this.setState({ user: { ...this.initialUser } })
  }

  render() {
    const token = localStorage.getItem('token')
    return (
      <Router>
        <Navbar handleLogout={this.handleLogout} />
        <div>

          <Container fluid style={{ margin: '7em 0 0 0', padding: '0 2em' }} >
            <Switch>
              <Route path='/login'>
                {token ? <Redirect to='/' /> : <Login handleLoginChange={this.handleLoginChange} handleSubmit={this.handleLoginSubmit} user={this.state.user} error={this.state.error} resetError={this.resetError} />}
              </Route>
              <Route path='/signup'>
                {token ? <Redirect to='/' /> : <Signup handleLoginChange={this.handleLoginChange} handleSubmit={this.handleSignupSubmit} user={this.state.user} error={this.state.error} resetError={this.resetError} />}
              </Route>
              <Route path='/'>
                {token ?
                  <YelpContainer user={this.state.user} handleLogout={this.handleLogout} /> :
                  <Redirect to='/login' />}
              </Route>
            </Switch>
          </Container>
        </div>
      </Router >

    );
  }
}

export default App;