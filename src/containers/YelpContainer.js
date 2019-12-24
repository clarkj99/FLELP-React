import React, { Fragment } from 'react'
import { Header, Grid } from 'semantic-ui-react'
import LocationForm from '../components/LocationForm'

class YelpContainer extends React.Component {
    render() {
        return (
            <Fragment>
                <Header>Hello, {this.props.user.display_name}</Header>
                <Grid columns={2}>
                    <Grid.Column>
                        <LocationForm />
                    </Grid.Column>
                    <Grid.Column>
                        <Header>Other</Header>
                    </Grid.Column>
                </Grid>
            </Fragment>
        )
    }
}
export default YelpContainer