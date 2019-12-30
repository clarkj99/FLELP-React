import React from 'react'
import { Form, Button, Message, Header, Segment, Container } from 'semantic-ui-react'

class Login extends React.Component {

    componentWillUnmount() {
        this.props.resetError()
    }


    render() {
        const { handleLoginChange, handleSubmit, user, error } = this.props
        return (
            <Container textAlign="center">
                <Header inverted as="h2"> Login</Header>
                <Segment textAlign="left">
                    <Form error={!!error} onSubmit={handleSubmit} >
                        <Form.Field>
                            <label>Username</label>
                            <input onChange={handleLoginChange} placeholder='Username' name='username' value={user.username} />
                        </Form.Field>

                        <Form.Field>
                            <label>Password</label>
                            <input onChange={handleLoginChange} type='password' placeholder='Password' name='password' value={user.password} />
                        </Form.Field>
                        <Message
                            error
                            header='Action Forbidden'
                            content={error ? error : ''}
                        />

                        <Button type='submit'>Login</Button>
                    </Form >
                </Segment>
            </Container>

        )
    }
}

export default Login                    