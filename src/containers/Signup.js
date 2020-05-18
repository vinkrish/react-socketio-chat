import React from 'react';
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Field, reduxForm } from "redux-form";
import { required, email } from 'utils/validation';
import { reduxFormInput } from 'components/form/ReduxForm';
import { registerUser } from 'redux/actions/auth';
import { checkAuthentication } from 'redux/selectors';
import Spacer from 'components/layout/Spacer';
import Loader from 'components/ui/Loader';
import { toast } from 'react-toastify';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
    this.submitFn = this.submitFn.bind(this);
  }

  submitFn(data) {
    this.setState({ email: data.EMAIL });
    this.props.register(data);
  }

  render() {
    const { handleSubmit } = this.props;
    const { isRegistering, isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to='/' />
    }

    return(
      <>
        { isRegistering && 
          <Loader />
        }
        <header className="border-bottom">
          <Spacer size={26} />
          <h1 className="text-center">Register</h1>
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
                  validate={[required]}
                  name="firstName" 
                  type="text" 
                  placeholder="Enter first name"
                  label="*First name" 
                />
                <Spacer size={26} />
              </Col>
              <Col xs="12" sm="6">
                <Field 
                  className="form-control" 
                  component={reduxFormInput}
                  validate={[required]}
                  name="lastName" 
                  type="text" 
                  placeholder="Enter last name"
                  label="*Last name" 
                />
                <Spacer size={26} />
              </Col>
              <Col xs="12">
                <Field 
                  className="form-control" 
                  component={reduxFormInput}
                  validate={[required, email]}
                  name="email" 
                  type="email" 
                  placeholder="Enter email"
                  label="*Email"
                />
                <Spacer size={26} />
              </Col>
              <Col xs="12">
                <Field 
                  className="form-control" 
                  component={reduxFormInput}
                  validate={[required]}
                  name="password" 
                  type="password" 
                  placeholder="Enter password"
                  label="*Password"
                />
                <Spacer size={26} />
              </Col>
              <Col className="text-center" xs="12">
                <Link to="/login">Already have an account? Login now.</Link>
              </Col>
            </Row>
            <Spacer size={26} />
            <Row className="justify-content-center">
              <Col className="text-center" xs="12" sm="6">
                <Button type="submit" variant="primary">
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
          <Spacer size={50} />
        </Container>
      </>
    )
  }
}

const mapStateToProps = state => {
  if (state.authReducer.actionFailed) {
    toast.error("Signup Failed!");
  }
  const isRegistering = state.authReducer.isLoading;
  const isAuthenticated = checkAuthentication(state);
  return { isRegistering, isAuthenticated };
}
  
const mapDispatchToProps = {
  register: registerUser
}
  
const connectedReduxForm = reduxForm({
  form: 'register',
  enableReinitialize: true,
})(Signup);
    
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(connectedReduxForm)