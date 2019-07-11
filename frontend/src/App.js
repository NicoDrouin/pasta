import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import { getTokenCookie } from './services/tokenCookie';
import urlApi from './services/httpService';

import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';

import UserCreate from './components/user/UserCreate';
import UserList from './components/user/UserList';
import UserDetail from './components/user/UserDetail';
import UserEdit from './components/user/UserEdit';

import ParentsCreate from './components/parents/ParentsCreate';
import ParentsEdit from './components/parents/ParentsEdit';
import ParentsDetail from './components/parents/ParentsDetail';
import ParentsList from './components/parents/ParentsList';
import ParentsForUserList from './components/parents/ParentsForUserList';

import ReportsContainer from './components/reports/ReportsContainer';

import NotFound from './components/NotFound';


class App extends Component {
  state = {
      headerUpdater: 1,
  };

  // ====================
  // LocalStorage used:
  // ====================
  // # loggedUserUsername
  // # loggedUserId
  // # loggedUserIsStaff
  // ====================

  componentDidMount() {
    // if token cookie do not exist then clear the localStorage and update the Header component;
    if (getTokenCookie('token') === '') {
      localStorage.clear();
      const headerUpdater = this.state.headerUpdater + 1;
      this.setState({ headerUpdater })
    }
  }

  onLogout = () => {
    console.log('onLogout')
    axios.post(urlApi + 'rest-auth/logout/')
      .then((response) => {
          console.log('Logout response : ', response);
          localStorage.clear();
          document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;';
          const headerUpdater = this.state.headerUpdater + 1;
          this.setState({ headerUpdater })
      })
      .catch((error) => {
          if (error.response !== undefined) {
              console.log('Logout error: ', error.response);
          }
      });
  }


  render() {
    return (
      <React.Fragment>

        <Header onLogout={this.onLogout} headerUpdater={this.headerUpdater} />

        <Switch>
          <Route path='/login' component={LoginForm} />

          {/* ============
              ### User ###
              ============ */}
          <Route path='/user/create' component={UserCreate} />
          <Route path='/user/edit/' exact component={UserEdit} />
          <Route path='/user/edit/:id' component={UserEdit} />
          <Route path='/user/:id' component={UserDetail} />
          <Route path='/user' component={UserList} />


          {/* ===============
              ### Parents ###
              =============== */}
          <Route path='/parents/create' component={ParentsCreate} />
          <Route path='/parents/edit/:id' component={ParentsEdit} />
          <Route path='/parents/detail/:id'component={ParentsDetail} />
          <Route path='/parents/all'component={ParentsList} />
          <Route path='/parents/:id' component={ParentsForUserList} />


          {/* ==============
              ### Report ###
              ============== */}
          <Route path='/report/:private_url' component={ReportsContainer} />


          <Route path='/404' component={NotFound} />
          <Redirect from='' to='/login' />
          <Redirect to='/404' />
        </Switch>

        <Footer />

      </React.Fragment>
    );
  }
}

export default withRouter(App);