import { Fragment } from 'react';
import './App.css';
import Login from './components/login';
import Registration from './components/registeration';

function App() {
  return (
    <Fragment>
      <Registration />
      <Login />
    </Fragment>
  );
}

export default App;
