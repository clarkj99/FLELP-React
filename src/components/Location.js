import React from 'react'
import { Card, Button, Image } from 'semantic-ui-react'

class Location extends React.Component {
    render() {
        const { location, handleViewClick, handleEditClick, handleDeleteClick } = this.props
        let fullAddress = [location.address1, location.address2, location.city, location.state, location.zip].join(" ")
        let mapURL = 'https://maps.googleapis.com/maps/api/staticmap?maptype=roadmap&center=' + fullAddress + '&zoom=15&size=400x225&markers=color:red|' + fullAddress + '|&key=AIzaSyBQChNx8YgqyqaE9isFq34G5WIfbCKL5-Y'
        return (
            <Card >
                <Image src={encodeURI(mapURL)} alt={location.name} />
                <Card.Content>
                    <Card.Header>{location.name} </Card.Header>
                    <Card.Description>
                        {location.address1}{' '}
                        {location.city},{' '}
                        {location.state}{' '}
                        {location.zip}
                    </Card.Description>

                </Card.Content>
                <Button.Group>
                    <Button icon='eye' content='View' onClick={(e) => handleViewClick(e, location)} />
                    <Button icon='edit' content='Edit' onClick={(e) => handleEditClick(e, location)} />
                    <Button icon='delete' content='Delete' onClick={(e) => handleDeleteClick(e, location)} />
                </Button.Group>
            </Card>
        )
    }
}

export default Location 