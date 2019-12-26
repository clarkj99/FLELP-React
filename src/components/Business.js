import React from 'react'
import { Card, Image, Button, Icon, Rating } from 'semantic-ui-react'

class Business extends React.Component {
    render() {
        const { business } = this.props
        return (
            <Card className='business-card' style={{ width: '200px' }}>
                <Image className='business-image' src={business.image_url} />
                <Card.Content>
                    <Card.Header>{business.name}</Card.Header>
                    <Card.Description>
                        <p>{business.location.display_address}</p>
                        <p>{business.display_phone}</p>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button icon><Icon name='like' /></Button>
                    <Rating disabled defaultRating={business.rating} maxRating={5} />

                    <span>{business.price} </span>
                </Card.Content>
            </Card >
        )
    }
}
export default Business