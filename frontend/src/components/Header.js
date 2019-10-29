import React, { Fragment, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { LoginContext } from '../contexts/LoginContext'
import axios from 'axios'
import urlApi from '../services/httpService'


const Header = () => {

  const { setLogin, login } = useContext(LoginContext)

  function onLogout() {
    console.log('onLogout')
    axios.post(urlApi + 'rest-auth/logout/')
      .then((response) => {
          console.log('Logout response : ', response)
          document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;'
          setLogin({loggedUserUsername: '', loggedUserId: '', loggedUserIsStaff: false})
      })
      .catch((error) => {
          if (error.response !== undefined) {
              console.log('Logout error: ', error.response)
          }
      })
  }

  return (
    <Fragment>
      {
        login.loggedUserUsername
        ?
          <section id='navbar'>
            {
              login.loggedUserIsStaff === true
              ?
                <div className='side'>
                  <div><NavLink exact to='/user/'>All users</NavLink></div>
                  <div><NavLink to='/user/create/'>Create user</NavLink></div>
                  <div className='separator'><NavLink to='/parents/all/'>All parents</NavLink></div>
                  <div><NavLink to='/parents/create/'>Create parents</NavLink></div>
                </div>
              :
                <div className='side'>
                  <div><NavLink to='/parents/all/'>Parents</NavLink></div>
                  <div><NavLink to='/parents/create/'>Create parents</NavLink></div>
                </div>
            }

            <div className='side'>
              <div className='username'>
                <NavLink to={'/user/edit/' + login.loggedUserId + '/'}>
                  {login.loggedUserUsername}
                </NavLink>
              </div>
              <div><NavLink to='/login/' onClick={onLogout}>logout</NavLink></div>
            </div>
          </section>
        :
          <section id='navbar' className='right'>
            <div><NavLink to='/login/'>login</NavLink></div>
          </section>
      }
    </Fragment>
  )
}

export default Header