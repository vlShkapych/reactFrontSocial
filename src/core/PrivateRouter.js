import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {isAuth} from './Auth'

const PrivateRoute =({ component: Component, ...rest })=>{
    return (
        <Route
          {...rest}
          render={props =>
            isAuth() ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      );
}
export default PrivateRoute;