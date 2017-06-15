import * as React from 'react';
import { ROUTER} from '@services/router.service';
import { HISTORY } from '@services/history.service';
import {LinkComponent} from '@components/shared/link.component'

export class NavigationComponent extends React.Component {
  render() {
    return <nav className='b-navigation'>
      <LinkComponent to="/"> Home </LinkComponent>
      <LinkComponent to="/about"> About </LinkComponent>
    </nav>
  }
}
