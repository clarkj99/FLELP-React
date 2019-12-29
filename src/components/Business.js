import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import StarRating from './StarRating'

class Business extends React.Component {

    render() {
        const { business, isFavorite, handleFavoriteClick } = this.props
        return (
            <Card className='business-card' style={{ width: '200px' }}>
                <Image className='business-image' src={business.image_url} />
                <Card.Content>
                    <Card.Header>{business.name}</Card.Header>
                    <Card.Description>
                        <p>{business.location.display_address[0]} <br /> {business.location.display_address[1]} <br />{business.location.display_address[2]}</p>
                        <p>{business.display_phone}</p>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button icon='like' size='tiny' toggle active={isFavorite} onClick={(e) => handleFavoriteClick(e, business)} />
                    <StarRating rating={business.rating} /> {" "}

                    <span>{business.price} </span>
                </Card.Content>
            </Card >
        )
    }
}
export default Business