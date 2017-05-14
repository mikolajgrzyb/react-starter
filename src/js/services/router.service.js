import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Router from 'universal-router';
import { store } from '@services/store.service'; 
import { Provider } from 'react-redux'
import { AppComponent } from '@components/app/app.component'
import { HomeComponent } from '@components/home/home.component'
import { NotFoundComponent } from '@components/shared/404.component'

const routes = [
  { path: '/', action: () => <HomeComponent /> },
  { path: '*', action: () => <NotFoundComponent /> }
];

function renderAppWithResult(result) {
  ReactDOM.render(
    <Provider store={store}>
      <AppComponent currentPage={result} />
    </Provider>
    , document.getElementById('app'));
}

export function resolveRoute(pathName) {
  ROUTER.resolve({ path: pathName }).then(renderAppWithResult);
}

export const ROUTER = new Router(routes);
