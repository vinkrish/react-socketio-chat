import React from "react";
import { Route, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { checkAuthentication } from 'redux/selectors';

const PrivateRoute = ({ component: Component, user, auth, ...rest }) => {
  return(
    <Route 
      {...rest}
      render = { props => 
      {
        if(!auth) {
          return props.history.push('/login');
        } else {
          return <Component {...props} /> 
        }
      }
      }
    />
  )
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const mapStateToProps = state => {
  const auth = checkAuthentication();
  return { auth }
} 

export default connect(mapStateToProps)(PrivateRoute);
