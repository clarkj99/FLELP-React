import React from 'react'
import { Header, Grid, Button } from 'semantic-ui-react'

function LocationHeader(props) {

    return (
        <Grid columns={2}><Grid.Row>
            <Grid.Column>
                <Header>Hello, {localStorage.getItem('displayName')} </Header>
            </Grid.Column>
            <Grid.Column>
                {!props.addingLocation && <Button onClick={props.handleShowAddForm}>Add a Location</Button>}
            </Grid.Column>
        </Grid.Row></Grid>
    )
}

export default LocationHeader