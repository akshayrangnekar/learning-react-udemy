import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise';

import reducers from './reducers';

import PostList from './components/post_list';
import PostNew from './components/post_new';
import PostsShow from './components/posts_show';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/posts/new" component={ PostNew } />
                <Route path="/posts/:id" component={ PostsShow } />
                <Route path="/" component={ PostList } />
            </Switch>
        </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
