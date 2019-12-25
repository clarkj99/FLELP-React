import React from 'react'
import { Card } from 'semantic-ui-react'

class Location extends React.Component {
    render() {
        const { location, handleClick } = this.props
        return (
            <Card onClick={(e) => handleClick(e, location)}>
                <Card.Content>
                    <Card.Header>{location.name}</Card.Header>
                    <Card.Description>
                        {location.address1}{' '}
                        {location.city},{' '}
                        {location.state}{' '}
                        {location.zip}
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}

export default Location 