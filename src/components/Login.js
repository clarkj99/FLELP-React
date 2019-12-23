import React, { Fragment } from 'react'
import { Form, Button, Message, Header } from 'semantic-ui-react'

const Login = (props) => {
    const { handleLoginChange, handleSubmit, user, error } = props
    return (
        <Fragment>
            <Header>Login</Header>
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
                    content={error ? error.statusText : ''}
                />
                <Button type='submit'>Login</Button>
            </Form >
        </Fragment>
    )
}

export default Login