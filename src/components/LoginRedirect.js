import { useEffect } from 'react';
import { connect } from 'react-redux';

const LoginRedirect = (props) => {
  useEffect(() => {
    if (props.redirect401) {
      //window.location.assign(props.loginUrl);
    }
  }, [props.redirect401]);
  return null;
};

const mapStateToProps = (state) => ({
  redirect401: state.ur.redirect401,
});

export default connect(mapStateToProps, null)(LoginRedirect);
