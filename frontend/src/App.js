// import React, { useState, useEffect, Fragment } from 'react'
import React, { Fragment } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
// import axios from 'axios'
// import { getTokenCookie } from './services/tokenCookie'
// import urlApi from './services/httpService'
import LoginContextProvider from './contexts/LoginContext'

import Header from './components/Header'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'

import UserCreate from './components/user/UserCreate'
import UserList from './components/user/UserList'
import UserDetail from './components/user/UserDetail'
import UserEdit from './components/user/UserEdit'

import ParentsCreate from './components/parents/ParentsCreate'
import ParentsEdit from './components/parents/ParentsEdit'
import ParentsDetail from './components/parents/ParentsDetail'
import ParentsList from './components/parents/ParentsList'
import ParentsForUserList from './components/parents/ParentsForUserList'

import ReportsContainer from './components/reports/ReportsContainer'

import NotFound from './components/NotFound'


const App = () => {

  return (
    <Fragment>

      <LoginContextProvider>
        <Header />

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
      </LoginContextProvider>

      <Footer />

    </Fragment>
  )
}

export default withRouter(App)