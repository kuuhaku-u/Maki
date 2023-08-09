import { Fragment } from 'react';
import './App.css';
import Login from './components/login';
import Registration from './components/registeration';
import { Cam } from './components/cam';

function App() {
  return (
    <Fragment>
      <Registration />
      <Login />
      <Cam />
    </Fragment>
  );
}

export default App;
