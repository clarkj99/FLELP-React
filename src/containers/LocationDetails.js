import React from 'react'
import { Header, Button, Card, Container, Loader, Message, Radio, Segment, Divider, Label } from 'semantic-ui-react'
import Business from '../components/Business'

class LocationDetails extends React.Component {
    state = {
        businesses: [],
        value: "best_match"
    }

    handleChange = (e, { value }) => {
        this.setState({ value, businesses: [] })
        this.fetchBusinesses(value)
    }

    componentDidMount() {
        this.fetchBusinesses()
    }

    fetchBusinesses = (value = this.state.value) => {
        fetch(`http://localhost:3000/api/v1/businesses?location_id=${this.props.selectedLocation.id}&sort=${value}`, {
            headers: { 'Authorization': `Bearer ${localStorage.token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    this.setState({ businesses: data.businesses })
                } else
                    this.setState({ error: data.error.description })
            })
    }


    isFavorite = (business) => {
        return !!this.props.favorites.find((favorite) => favorite.business_id === business.id)
    }

    render() {
        const { selectedLocation, handleShowAll, handleFavoriteClick } = this.props
        return (
            <Container fluid textAlign='center'>
                <Header inverted as="h2">{selectedLocation.name},{' '}{selectedLocation.address1},{' '} {selectedLocation.zip}</Header>
                <Segment.Group horizontal>
                    <Segment>
                        <Button onClick={handleShowAll}>Show All Locations</Button>
                        <Button onClick={this.props.handleShowAddForm}>Add a Location</Button>
                    </Segment>
                    <Segment>
                        <span as="h2">Sort By: </span>
                        <Radio
                            label='Best Match'
                            name='radioGroup'
                            value='best_match'
                            checked={this.state.value === 'best_match'}
                            onChange={this.handleChange}
                            style={{ margin: "0 1em" }}
                        />
                        <Radio
                            label='Rating'
                            name='radioGroup'
                            value='rating'
                            checked={this.state.value === 'rating'}
                            onChange={this.handleChange}
                            style={{ margin: "0 1em" }}
                        />
                        <Radio
                            label='Distance'
                            name='radioGroup'
                            value='distance'
                            checked={this.state.value === 'distance'}
                            onChange={this.handleChange}
                            style={{ margin: "0 1em" }}
                        />
                    </Segment>
                </Segment.Group>
                {!this.state.error ?
                    <Card.Group style={{ marginTop: "20px" }} centered>
                        {this.state.businesses && !!this.state.businesses.length ? this.state.businesses.map(business => <Business key={business.id} business={business} isFavorite={this.isFavorite(business)} handleFavoriteClick={handleFavoriteClick} />) : <Card> <Loader active /></Card>}
                    </Card.Group> :
                    <Message error icon="exclamation triangle"
                        content={this.state.error} />
                }
            </Container>
        )
    }

}

export default LocationDetails