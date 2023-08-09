import { Fragment } from 'react';
import './App.css';
import Login from './components/login';
import Registration from './components/registeration';
import Test from './components/Test';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/home" element={<Test />}></Route>
      {/* <Fragment>
        <Registration />
        <Login />
      </Fragment> */}
    </Routes>
  );
}

export default App;
