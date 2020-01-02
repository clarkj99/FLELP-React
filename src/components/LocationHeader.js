import React, { Fragment } from 'react'
import { Header, Button } from 'semantic-ui-react'

function LocationHeader(props) {

    return (
        <Fragment>
            <Header inverted as="h2">Locations </Header>
            {!props.addingLocation && <Button onClick={props.handleShowAddForm}>Add a Location</Button>}
        </Fragment>
    )
}

export default LocationHeader