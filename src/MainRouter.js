import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Menu from './core/Menu'
import Profile from './user/Profile'
import Edit from './user/Edit'
import Users from './core/Users'
import findPeople from './user/findPeople'
import CreatePost from './post/newPost'
import { create } from 'domain'
const MainRouter = ()=>(
    <div>
        <Menu />
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/user/:userId' component={Profile} />
            <Route exact path='/user/edit/:userId' component={Edit} />
            <Route exact path='/users' component={Users} />
            <Route exact path='/user/findPeople/:userId' component={findPeople} />
            <Route exact path='/post/create' component={CreatePost} />

        </Switch>
    </div>
);

export default MainRouter;