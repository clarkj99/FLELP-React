import React from 'react'
import { Header, Card, Container, Segment } from 'semantic-ui-react'
import FavoriteBusiness from '../components/FavoriteBusiness'

class FavoritesContainer extends React.Component {


    render() {
        const { favorites, handleFavoriteClick } = this.props
        return (
            <Container fluid style={{ margin: 0, padding: 0 }} textAlign='center'>
                <Header inverted as="h2">Favorites</Header>
                <Card.Group centered>
                    {favorites.map((favorite, index) => {
                        return <FavoriteBusiness key={favorite.id} favorite={favorite} isFavorite={true} handleFavoriteClick={handleFavoriteClick} index={index} />
                    })}
                </Card.Group>
            </Container>
        )
    }
}

export default FavoritesContainer