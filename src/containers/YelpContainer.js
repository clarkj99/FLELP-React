import React, { Fragment } from 'react'

import LocationForm from '../components/LocationForm'
import LocationContainer from './LocationContainer'
import LocationHeader from '../components/LocationHeader'

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
        locationList: [],
        addingLocation: false
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

    handleDeleteClick = (e, location) => {
        fetch(`http://localhost:3000/api/v1/locations/${location.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(response => {
                this.fetchLocations()

            })
    }

    handleShowAddForm = () => {
        this.setState({ addingLocation: true })
    }

    handleCancel = () => {
        this.setState({ addingLocation: false })
    }

    render() {
        return (
            <Fragment>
                <LocationHeader handleShowAddForm={this.handleShowAddForm} addingLocation={this.state.addingLocation} />
                {this.state.addingLocation && <LocationForm location={this.state.location} handleFormChange={this.handleFormChange} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} />}
                <LocationContainer locationList={this.state.locationList} addingLocation={this.state.addingLocation} handleDeleteClick={this.handleDeleteClick} handleCancel={this.handleCancel} />

            </Fragment>
        )
    }
}
export default YelpContainer