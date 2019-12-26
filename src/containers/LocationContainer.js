import React from 'react'
import { Header, Card, Segment } from 'semantic-ui-react'
import Location from '../components/Location'
import LocationDetails from './LocationDetails'



class LocationContainer extends React.Component {
    state = { selectedLocation: null }

    handleClick = (e, location) => {
        console.log(location);
        this.setState({ selectedLocation: location })
    }

    handleShowAll = () => {
        this.setState({ selectedLocation: null })
    }

    render() {
        const { locationList } = this.props
        return (
            <Segment>
                <Header> Saved Locations</Header>
                {this.state.selectedLocation ? <LocationDetails selectedLocation={this.state.selectedLocation} handleShowAll={this.handleShowAll} /> :
                    <Card.Group>
                        {locationList.map(location => {
                            return <Location key={location.id} location={location} handleClick={this.handleClick} />
                        })
                        }
                    </Card.Group>}
            </Segment>
        )

    }
}

export default LocationContainer