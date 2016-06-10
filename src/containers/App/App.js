import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link} from 'react-router';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])

@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user} = this.props;
    return (
      <div>
        <Helmet {...config.app.head}/>
        <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
          <div/>
          <span>{config.app.title}</span>
        </IndexLink>
        {user && <Link to="/chat">
          Chat
        </Link>}
        {!user &&
        <Link to="/login">
          Login
        </Link>}
        {user &&
        <Link to="/logout">
          <a onClick={this.handleLogout}>
            Logout
          </a>
        </Link>}
        {user &&
            <p>Logged in as <strong>{user.name}</strong>.</p>}
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
