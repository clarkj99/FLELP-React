import React from 'react'
import { Form, Input, Button, Message } from 'semantic-ui-react'

const Signup = (props) => {
    const { handleLoginChange, handleSubmit, user, error } = props
    return (
        <Form error={!!error} onSubmit={handleSubmit}>
            <Form.Field
                label='Username'
                onChange={handleLoginChange}
                control={Input}
                placeholder='Username'
                name='username'
                value={user.username}
            />
            <Form.Field
                label='Display Name'
                onChange={handleLoginChange}
                control={Input}
                type='text' placeholder='Display Name'
                name='display_name'
                value={user.display_name}
            />
            <Form.Field
                label='Password'
                onChange={handleLoginChange}
                control={Input}
                type='password'
                placeholder='Password'
                name='password'
                value={user.password}
            />

            <Message
                error
                header='Action Forbidden'
                content={error ? error.statusText : ''}
            />

            <Button type='submit'>Login</Button>
        </Form>
    )
}

export default Signup