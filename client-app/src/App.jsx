import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MemodComponent404 from './components/contentSection/Component404.jsx';
import MemodUserAuthComponent from './components/header/UserAuthComponent.jsx';
import UserPageComponent from './components/contentSection/UserPageComponent.jsx';
import MainContentComponent from './components/contentSection/MainContentComponent.jsx';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { combinedReducer } from './store/reducers';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/index';
import MemodGoogleAuthComponent from './components/contentSection/GoogleAuthComponent.jsx';
import MemodErrorMessageComponent from './components/contentSection/ErrorMessageComponent.jsx';
import MemodGoogleAuthErrorComponent from './components/contentSection/GoogleAuthErrorComponent.jsx';
import './App.css';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combinedReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <header className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between header">
        <a className="navbar-brand" href="/">News</a>
        <MemodUserAuthComponent />
        <MemodErrorMessageComponent />
      </header>
      <Switch>
        <Route exact path="/" component={() => <MainContentComponent />} />
        <Route path="/user/:login" component={props => <UserPageComponent {...props} />} />
        <Route path="/google/auth/error/:message" component={props => <MemodGoogleAuthErrorComponent {...props} />} />
        <Route path="/google/auth/:login/:token" component={props => <MemodGoogleAuthComponent {...props} />} />
        <Route component={() => <MemodComponent404 />} />
      </Switch>
    </BrowserRouter>
    <footer className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between footer-bottom footer">
      <div>M.Rachinskii</div>
      <div>React+Redux+NodeJS</div>
    </footer>
  </Provider>
);


export default App;
