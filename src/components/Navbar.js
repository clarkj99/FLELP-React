import React, { Fragment } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const Navbar = (props) => {
    const token = localStorage.getItem('token')
    return (
        <Menu fixed='top'>
            <NavLink exact className='item' to='/' >
                FLELP
            </NavLink>
            {token ?
                <NavLink className='item' to='/' onClick={props.handleLogout} >
                    Logout
            </NavLink> : <Fragment>
                    <NavLink className='item' to='/login' >
                        Login
            </NavLink>
                    <NavLink className='item' to='/signup'>
                        Signup
            </NavLink>
                </Fragment>}
        </Menu>
    )
}

export default Navbar