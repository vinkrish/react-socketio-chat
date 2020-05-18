import React from 'react';
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Field, reduxForm } from "redux-form";
import { required, email } from 'utils/validation';
import { reduxFormInput } from 'components/form/ReduxForm';
import { authenticateUser } from 'redux/actions/auth';
import { checkAuthentication } from 'redux/selectors';
import Spacer from 'components/layout/Spacer';
import Loader from 'components/ui/Loader';
import { toast } from 'react-toastify';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.submitFn = this.submitFn.bind(this);
  }

  submitFn(data) {
    this.props.login(data);
  }

  render() {
    const { handleSubmit } = this.props;
    const { isLoggingIn, isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to='/' />
    }

    return(
      <>
        { isLoggingIn && 
          <Loader />
        }
        <header className="border-bottom">
          <Spacer size={26} />
          <h1 className="text-center">Login</h1>
          <Spacer size={26} />
        </header>
        <Container>
          <Spacer size={26} />
          <Form className="auth-form" onSubmit={handleSubmit(this.submitFn)}>
            <Row>
              <Col xs="12">
                <Spacer size={26} />
              </Col>
              <Col xs="12" sm="6">
                <Field 
                  className="form-control" 
                  component={reduxFormInput}
                  validate={[required, email]}
                  name="email" 
                  type="email" 
                  placeholder="Enter email"
                  label="Email" 
                />
                <Spacer size={26} />
              </Col>
              <Col xs="12" sm="6">
                <Field 
                  className="form-control" 
                  component={reduxFormInput}
                  validate={[required]}
                  name="password" 
                  type="password" 
                  placeholder="Enter password"
                  label="Password" 
                />
                <Spacer size={26} />
              </Col>
              <Col xs="12">
                <Link to="/signup">Don't have an account? Register now.</Link>
              </Col>
            </Row>
            <Spacer size={26} />
            <Row className="justify-content-center">
              <Col className="text-center" xs="12" sm="6">
                <Button type="submit" variant="primary">
                  Login
                </Button>
                <Spacer size={26} />
              </Col>
            </Row>
          </Form>
          <Spacer size={26} />
        </Container>
      </>
    )
  }
}

const mapStateToProps = state => {
  if (state.authReducer.actionFailed) {
    toast.error("Email and Password don't match!");
  }
  const isLoggingIn = state.authReducer.isLoading;
  const isAuthenticated = checkAuthentication(state);
  return { isLoggingIn, isAuthenticated };
}

const mapDispatchToProps = {
  login: authenticateUser
}

const connectedReduxForm = reduxForm({
  form: 'login',
  enableReinitialize: true,
})(Login);
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(connectedReduxForm)