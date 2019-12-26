import React, { Fragment } from 'react'
import { Header, Button, Card } from 'semantic-ui-react'
import Business from '../components/Business'

class LocationDetails extends React.Component {
    state = { businesses: [] }
    componentDidMount() {
        fetch(`http://localhost:3000/api/v1/businesses?location_id=${this.props.selectedLocation.id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.statusText) {
                    this.setState({ businesses: data.businesses })
                } else
                    this.setState({ error: data.statusText })
            })
    }

    render() {
        const { selectedLocation, handleShowAll } = this.props
        return (
            <Fragment>
                <Header>{selectedLocation.name}</Header>
                <Button size='tiny' onClick={handleShowAll}>Show All</Button>
                <Card.Group>
                    {this.state.businesses.map(business => <Business key={business.id} business={business} />)}
                </Card.Group>
            </Fragment>
        )
    }

}

export default LocationDetails