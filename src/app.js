import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './main.scss';
import Router from 'universal-router';
import { HISTORY } from '@services/history.service';
import { AppComponent } from './js/components/app/app.component.js'



ReactDOM.render(<AppComponent name="lol"/>, document.getElementById('app'));

const routes = [
  { path: '/one', action: () => <h1>Page One</h1> },
  { path: '/two', action: () => <h1>Page Two</h1> },
  { path: '*', action: () => <h1>Not Found</h1> }
];

const ROUTER = new Router(routes);

let renderView = result => {
  ReactDOM.render(<AppComponent name={result}/>, document.getElementById('app'));
}

ROUTER.resolve({ path: HISTORY.location.pathname }).then(renderView);

HISTORY.listen((location, action) => {
  ROUTER.resolve({ path: location.pathname }).then(renderView);
})
