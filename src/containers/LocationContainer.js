import React, { Fragment } from 'react'
import { Header, Card, Segment } from 'semantic-ui-react'
import Location from '../components/Location'
import LocationDetails from './LocationDetails'

class LocationContainer extends React.Component {
    state = { selectedLocation: null }

    handleViewClick = (e, location) => {
        this.props.handleCancel()
        this.setState({ selectedLocation: location })
    }


    handleShowAll = () => {
        this.setState({ selectedLocation: null })
    }

    render() {
        const { locationList, handleDeleteClick, addingLocation } = this.props
        return (
            <Fragment>
                <Segment>
                    <Header as='h2'>Saved Locations</Header>
                </Segment>
                {this.state.selectedLocation && !addingLocation ? <LocationDetails selectedLocation={this.state.selectedLocation} handleShowAll={this.handleShowAll} favorites={this.props.favorites} handleFavoriteClick={this.props.handleFavoriteClick} /> :
                    <Card.Group centered>
                        {locationList.map(location => {
                            return <Location key={location.id} location={location} handleViewClick={this.handleViewClick} handleDeleteClick={handleDeleteClick} />
                        })
                        }
                    </Card.Group>}
            </Fragment>
        )

    }
}

export default LocationContainer