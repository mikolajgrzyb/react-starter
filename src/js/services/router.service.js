import * as React from 'react';
import Router from 'universal-router';
import { HomeComponent } from '@components/home/home.component'
import { NotFoundComponent } from '@components/shared/404.component'

const routes = [
  { path: '/', action: () => <HomeComponent /> },
  { path: '*', action: () => <NotFoundComponent /> }
];

export const ROUTER = new Router(routes);
