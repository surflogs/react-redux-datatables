import React from 'react';
import AppNav from './partials/AppNav/AppNav';

const App = ({children}) => (
  <div>
    <AppNav />
    <div className="container">
      {children}
    </div>
  </div>
);

export default App;
