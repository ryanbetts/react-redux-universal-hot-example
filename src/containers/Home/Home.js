import React, { Component } from 'react';
import { CounterButton } from 'components';
import config from '../../config';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div>
        <Helmet title="Home"/>
        <div>
          <div className="container">
            <div>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>{config.app.title}</h1>

            <h2>{config.app.description}</h2>
          </div>
        </div>

        <div className="container">
          <div>
            <CounterButton multireducerKey="counter1"/>
            <CounterButton multireducerKey="counter2"/>
            <CounterButton multireducerKey="counter3"/>
          </div>
        </div>
      </div>
    );
  }
}
