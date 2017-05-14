import * as React from 'react';
import { LinkComponent } from '@components/shared/link.component';

export class NotFoundComponent extends React.Component {
  render() {
    return <div>
      <h2>Wrong address</h2>
      Try going back <LinkComponent to='/'>Home</LinkComponent>
    </div>
  }
}
