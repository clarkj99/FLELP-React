import React, { Fragment } from 'react'
import { Card, Container, Grid } from 'semantic-ui-react'
import Location from '../components/Location'
import LocationDetails from './LocationDetails'
import LocationHeader from '../components/LocationHeader'
import LocationForm from '../components/LocationForm'

class LocationContainer extends React.Component {
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
        selectedLocation: null,
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

    handleViewClick = (e, location) => {
        this.handleCancel()
        this.setState({ selectedLocation: location })
    }


    handleShowAll = () => {
        this.setState({ selectedLocation: null })
    }

    handleShowAddForm = () => {
        this.setState({ addingLocation: true })
    }

    handleCancel = () => {
        this.setState({ addingLocation: false })
    }

    render() {
        const { addingLocation, location, selectedLocation, locationList } = this.state
        return (
            <Container fluid style={{ margin: "2em 0 0 0 " }} textAlign="center">

                <Grid style={{ margin: "0 2em" }} columns={addingLocation ? 2 : 1}>
                    {addingLocation && <Grid.Column width={6}><LocationForm location={location} handleFormChange={this.handleFormChange} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} /></Grid.Column>}
                    <Grid.Column width={addingLocation ? 10 : 16}>
                        {selectedLocation && !addingLocation ? <LocationDetails selectedLocation={selectedLocation} handleShowAll={this.handleShowAll} favorites={this.props.favorites} handleFavoriteClick={this.props.handleFavoriteClick} handleShowAddForm={this.handleShowAddForm} addingLocation={addingLocation} /> :
                            <Fragment>
                                <LocationHeader handleShowAddForm={this.handleShowAddForm} addingLocation={addingLocation} />
                                <Card.Group centered style={{ marginTop: "2em" }}>
                                    {locationList.map(loc => {
                                        return <Location key={loc.id} location={loc} handleViewClick={this.handleViewClick} handleDeleteClick={this.handleDeleteClick} />
                                    })
                                    }
                                </Card.Group>
                            </Fragment>}
                    </Grid.Column>
                </Grid>
            </Container>
        )

    }
}

export default LocationContainer