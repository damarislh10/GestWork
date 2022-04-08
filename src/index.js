import React from 'react';
import ReactDOM from 'react-dom';
import { GestWork } from './GestWork';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';


ReactDOM.render(
  <Provider store ={store }>
 <GestWork/>
 </Provider>
 ,
  document.getElementById('root')
);

