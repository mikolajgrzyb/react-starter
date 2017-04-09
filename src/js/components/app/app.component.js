import * as React from 'react';
import { 
  NavigationComponent as Navigation 
} from '@components/app/navigation.component';

export class AppComponent extends React.Component {
  render() {
    return <div>
      <Navigation />
      <div className="container">
        {this.props.currentPage}
      </div>
    </div>;
  }
}
