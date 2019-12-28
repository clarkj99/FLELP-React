import React from 'react'
import { Card, Button } from 'semantic-ui-react'

class Location extends React.Component {
    render() {
        const { location, handleViewClick, handleEditClick, handleDeleteClick } = this.props
        return (
            <Card >
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