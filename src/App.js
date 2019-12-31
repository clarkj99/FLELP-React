import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import LocationContainer from './containers/LocationContainer';
import FavoritesContainer from './containers/FavoritesContainer';
import HomeContainer from './containers/HomeContainer';

class App extends React.Component {
  initialUser = {
    username: '',
    password: '',
    display_name: ''
  }

  initialState = {
    user: this.initialUser,
    error: null,
    favorites: []
  }

  state = {
    ...this.initialState
  }

  componentDidMount() {
    if (!this.state.favorites.length)
      this.fetchFavorites()
  }

  handleLoginChange = (e) => {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value }
    })
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
      .then(res => res.json())
      .then(data => {
        if (!data.statusText) {
          localStorage.setItem('token', data.jwt)
          localStorage.setItem('displayName', data.user.display_name)
          this.setState({ user: { ...this.initialUser, display_name: data.user.display_name }, error: null })
          this.fetchFavorites()
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
      .then(res => res.json())
      .then(data => {
        if (!data.statusText) {
          this.setState({ user: data.user, error: null })
          localStorage.setItem('token', data.jwt)
          localStorage.setItem('displayName', data.user.display_name)
          this.fetchFavorites()
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
    this.setState({ ...this.initialState })
  }

  fetchFavorites = () => {
    fetch('http://localhost:3000/api/v1/favorite_businesses', {
      headers: { 'Authorization': `Bearer ${localStorage.token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.statusText) {
          this.setState({ favorites: data })
        } else
          this.setState({ error: data.statusText })
      })

  }

  handleFavoriteClick = (e, business) => {
    if (!this.isFavorite(business)) {
      fetch(`http://localhost:3000/api/v1/favorite_businesses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          business: business
        })
      })
        .then(res => res.json())
        .then(data => {
          this.fetchFavorites()
        })
    } else {
      fetch(`http://localhost:3000/api/v1/favorite_businesses/${business.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          this.fetchFavorites()
        })
    }
  }

  isFavorite = (business) => {
    return !!this.state.favorites.find((favorite) => favorite.business_id === business.id)
  }

  render() {
    const token = localStorage.getItem('token')
    return (
      <Router>
        <Navbar handleLogout={this.handleLogout} />
        <div style={{ margin: "0em 0 0 0", padding: "0 " }}>


          <Switch>
            <Route path="/login">
              {token ? <Redirect to="/" /> : <Login handleLoginChange={this.handleLoginChange} handleSubmit={this.handleLoginSubmit} user={this.state.user} error={this.state.error} resetError={this.resetError} />}
            </Route>
            <Route path="/signup">
              {token ? <Redirect to="/" /> : <Signup handleLoginChange={this.handleLoginChange} handleSubmit={this.handleSignupSubmit} user={this.state.user} error={this.state.error} resetError={this.resetError} />}
            </Route>
            <Route path="/favorites">
              {token ? <FavoritesContainer favorites={this.state.favorites} handleFavoriteClick={this.handleFavoriteClick} /> :
                <Redirect to="/login" />}
            </Route>
            <Route path="/locations">
              {token ?
                <LocationContainer favorites={this.state.favorites} handleFavoriteClick={this.handleFavoriteClick} /> :
                <Redirect to="/login" />}
            </Route>
            <Route exact path="/home">
              <HomeContainer favorites={this.state.favorites} />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />}
            </Route>
          </Switch>
        </div>
      </Router >

    );
  }
}

export default App;