import React from 'react'
import { Header, Button, Card, Container, Loader } from 'semantic-ui-react'
import Business from '../components/Business'

class LocationDetails extends React.Component {
    state = {
        businesses: []
    }

    componentDidMount() {
        this.fetchBusinesses()
    }

    fetchBusinesses = () => {
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


    isFavorite = (business) => {
        return !!this.props.favorites.find((favorite) => favorite.business_id === business.id)
    }

    render() {
        const { selectedLocation, handleShowAll, handleFavoriteClick } = this.props
        return (
            <Container fluid style={{ margin: "2em 0 0 0", padding: "0" }} textAlign='center'>
                <Header inverted as="h2">{selectedLocation.name},{' '}{selectedLocation.address1},{' '} {selectedLocation.zip}</Header>

                <Button onClick={handleShowAll}>Show All Locations</Button>
                <Card.Group style={{ marginTop: "20px" }} centered>
                    {!!this.state.businesses.length ? this.state.businesses.map(business => <Business key={business.id} business={business} isFavorite={this.isFavorite(business)} handleFavoriteClick={handleFavoriteClick} />) : <Card> <Loader active /></Card>}
                </Card.Group>
            </Container>
        )
    }

}

export default LocationDetails