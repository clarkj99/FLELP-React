import React, { Fragment } from 'react'
import { Header, Grid } from 'semantic-ui-react'
import LocationForm from '../components/LocationForm'
import LocationContainer from './LocationContainer'

class YelpContainer extends React.Component {
    initialLocation = {
        name: '',
        address1: '',
        city: '',
        state: '',
        zip: ''
    }

    state = {
        location: {
            ...this.initialLocation
        },
        locationList: []

    }
    componentDidMount() {
        this.fetchLocations()
    }

    fetchLocations = () => {
        return fetch('http://localhost:3000/api/v1/locations', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.statusText) {
                    this.setState({ locationList: data, location: { ...this.initialLocation } })
                } else {
                    console.error(data.statusText);
                }
            })
    }

    handleFormChange = (e) => {
        this.setState({ location: { ...this.state.location, [e.target.name]: e.target.value } })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/api/v1/locations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                location: this.state.location
            })
        })
            .then(res => res.json())
            .then(response => {
                this.fetchLocations()

            })
    }

    render() {
        return (
            <Fragment>
                <Header>Hello, {localStorage.getItem('displayName')} </Header>
                <Grid columns={2} centered>
                    <Grid.Column width={6}>
                        <LocationForm location={this.state.location} handleFormChange={this.handleFormChange} handleSubmit={this.handleSubmit} />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <LocationContainer locationList={this.state.locationList} />

                    </Grid.Column>
                </Grid>
            </Fragment>
        )
    }
}
export default YelpContainer