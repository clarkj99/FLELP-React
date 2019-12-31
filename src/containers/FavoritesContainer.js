import React from 'react'
import { Header, Card, Container, Message } from 'semantic-ui-react'
import FavoriteBusiness from '../components/FavoriteBusiness'

class FavoritesContainer extends React.Component {


    render() {
        const { favorites, handleFavoriteClick } = this.props
        return (
            <Container fluid style={{ margin: "2em", padding: 0 }} textAlign='center'>
                {!favorites.length && (
                    <Message
                        attached="top"
                        warning
                        header="You don't have any Favorite Businesses Saved!"
                        content="Do something about that to see your favorite businesses here!"
                    ></Message>
                )}
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