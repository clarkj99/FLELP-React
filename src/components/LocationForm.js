import React from 'react'
import { Form, Header, Input, Button, Segment } from 'semantic-ui-react'

class LocationForm extends React.Component {
    render() {
        const { handleFormChange, handleSubmit, location } = this.props
        return (
            <Segment>
                <Header>Add a Location</Header>
                <Form onSubmit={handleSubmit}>
                    <Form.Field
                        label='Name'
                        onChange={handleFormChange}
                        control={Input}
                        type='text' placeholder='Name'
                        name='name'
                        value={location.name}
                    />
                    <Form.Field
                        label='Address'
                        onChange={handleFormChange}
                        control={Input}
                        type='text' placeholder='Address'
                        name='address1'
                        value={location.address1}
                    />
                    <Form.Field
                        label='City'
                        onChange={handleFormChange}
                        control={Input}
                        type='text' placeholder='City'
                        name='city'
                        value={location.city}
                    />
                    <Form.Field
                        label='State'
                        onChange={handleFormChange}
                        control={Input}
                        type='text' placeholder='State'
                        name='state'
                        value={location.state}
                    />
                    <Form.Field
                        label='Zip'
                        onChange={handleFormChange}
                        control={Input}
                        type='text' placeholder='Zip'
                        name='zip'
                        value={location.zip}
                    />
                    <Button type='submit'>Add Location</Button>
                </Form>
            </Segment>
        )
    }
}

export default LocationForm