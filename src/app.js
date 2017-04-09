import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './main.scss';
import { HISTORY } from '@services/history.service';
import { ROUTER } from '@services/router.service';
import { AppComponent } from './js/components/app/app.component.js'

function renderAppWithResult(result) {
  ReactDOM.render(
    <AppComponent currentPage={result}/>, document.getElementById('app')
  );
}

function resolveRoute(pathName) {
  ROUTER.resolve({ path: pathName }).then(renderAppWithResult);
}

resolveRoute(HISTORY.location.pathname);
HISTORY.listen((location, action) => resolveRoute(location.pathname))
