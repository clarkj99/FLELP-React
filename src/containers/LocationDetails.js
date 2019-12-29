import React from 'react'
import { Header, Button, Card, Container, Loader, Segment } from 'semantic-ui-react'
import Business from '../components/Business'

class LocationDetails extends React.Component {
    state = {
        businesses: []
    }

    componentDidMount() {
        this.fetchBusinesses()
        // this.fetchFavorites()
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

    // fetchFavorites = () => {
    //     fetch('http://localhost:3000/api/v1/favorite_businesses', {
    //         headers: { 'Authorization': `Bearer ${localStorage.token}` }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (!data.statusText) {
    //                 this.setState({ favorites: data })
    //             } else
    //                 this.setState({ error: data.statusText })
    //         })

    // }

    // handleFavoriteClick = (e, business) => {
    //     if (!this.isFavorite(business)) {
    //         fetch(`http://localhost:3000/api/v1/favorite_businesses`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             },
    //             body: JSON.stringify({
    //                 business: business
    //             })
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 this.fetchFavorites()
    //             })
    //     } else {
    //         fetch(`http://localhost:3000/api/v1/favorite_businesses/${business.id}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             }
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 this.fetchFavorites()
    //             })
    //     }
    // }

    isFavorite = (business) => {
        return !!this.props.favorites.find((favorite) => favorite.business_id === business.id)
    }

    render() {
        const { selectedLocation, handleShowAll } = this.props
        return (
            <Container fluid style={{ margin: 0, padding: 0 }} textAlign='center'>
                <Segment>
                    <Header as="h2">{selectedLocation.name},{' '}{selectedLocation.address1},{' '} {selectedLocation.zip}</Header>

                    <Button onClick={handleShowAll}>Show All Locations</Button>
                </Segment>
                <Card.Group style={{ marginTop: "20px" }} centered>
                    {!!this.state.businesses.length ? this.state.businesses.map(business => <Business key={business.id} business={business} isFavorite={this.isFavorite(business)} handleFavoriteClick={this.props.handleFavoriteClick} />) : <Card> <Loader active /></Card>}
                </Card.Group>
            </Container>
        )
    }

}

export default LocationDetails