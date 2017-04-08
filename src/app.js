import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './main.scss';
import { HISTORY } from '@services/history.service';
import { ROUTER } from '@services/router.service';
import { AppComponent } from './js/components/app/app.component.js'

function renderView(result) {
  ReactDOM
    .render(<AppComponent name={result}/>, document.getElementById('app'));
}

function resolveRoute(pathName) {
  ROUTER.resolve({ path: pathName }).then(renderView);
}

resolveRoute(HISTORY.location.pathname);
HISTORY.listen((location, action) => resolveRoute(location.pathname))
