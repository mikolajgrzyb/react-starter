import * as React from 'react';
import {LinkComponent} from '@components/shared/link.component'

export class NavigationComponent extends React.Component {
  render() {
    return <nav>
      <LinkComponent to="/home"> Home </LinkComponent>
    </nav>
  }
}
