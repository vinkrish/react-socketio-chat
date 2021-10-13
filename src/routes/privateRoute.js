import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { checkAuthentication } from 'redux/selectors';
// import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
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

const mapStateToProps = () => {
  const auth = checkAuthentication();
  return { auth }
} 

export default connect(mapStateToProps)(PrivateRoute);
