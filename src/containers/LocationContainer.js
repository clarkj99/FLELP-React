import React, { Fragment } from 'react'
import { Header, Card } from 'semantic-ui-react'
import Location from '../components/Location'

class LocationContainer extends React.Component {
    handleClick = (e, location) => {
        console.log(location);
    }

    render() {
        const { locationList } = this.props
        return (
            <Fragment>
                <Header> Saved Locations</Header>
                <Card.Group>
                    {locationList.map(location => {
                        return <Location key={location.id} location={location} handleClick={this.handleClick} />
                    })
                    }
                </Card.Group>
            </Fragment>
        )

    }
}

export default LocationContainer