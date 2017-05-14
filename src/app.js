import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './main.scss';
import { HISTORY } from '@services/history.service';
import { ROUTER, resolveRoute } from '@services/router.service';

resolveRoute(HISTORY.location.pathname);

HISTORY.listen((location, action) => resolveRoute(location.pathname))
