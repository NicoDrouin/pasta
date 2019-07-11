import React from 'react';
import { NavLink } from 'react-router-dom';


const Header = ({ onLogout }) => {
  return (
    <React.Fragment>
      {
        localStorage.getItem('loggedUserUsername')
        ?
          <section id='navbar'>
            {
              localStorage.getItem('loggedUserIsStaff') === 'true'
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
              <div className='username'><NavLink to={'/user/edit/' + localStorage.getItem('loggedUserId') + '/'}>{localStorage.getItem('loggedUserUsername')}</NavLink></div>
              <div><NavLink to='/login/' onClick={onLogout}>logout</NavLink></div>
            </div>
          </section>
        :
          <section id='navbar' className='right'>
            <div><NavLink to='/login/'>login</NavLink></div>
          </section>
      }
    </React.Fragment>
  );
}
 
export default Header;