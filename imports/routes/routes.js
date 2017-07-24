import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,IndexRoute,browserHistory} from 'react-router';

import App from '../ui/App';
import Login from '../ui/Login';
import SignUp from '../ui/SignUp';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';

const unauthenticatedPages = ['/','/signup','/login'];
const authenticatedPages = ['/link'];
const onEnterPublicPage = () => {
    if(Meteor.userId()){
        browserHistory.replace('/link')
    }
};
const onEnterPrivatePage = () => {
    if(!Meteor.userId()){
        browserHistory.replace('/')
    }
};
const routes = (
    <Router history={browserHistory}>
        {/*<Route component={App} path='/'>*/}
        <Route path="/" component={App} onEnter={onEnterPublicPage} />
        <Route path="/login" components={Login} onEnter={onEnterPublicPage}/>
        <Route path="/signup" components={SignUp}/>
        <Route path="/link" components={Link} onEnter={onEnterPrivatePage}/>
        <Route path="*" components={NotFound}/>
        {/*</Route>*/}
    </Router>
);

Tracker.autorun(()=>{
    const isAuthenticated = !!Meteor.userId();
    const pathname = browserHistory.getCurrentLocation().pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isUnauthenticatedPage && isAuthenticated){
        browserHistory.replace('/link')
    }else if(isAuthenticatedPage && !isAuthenticated){
        browserHistory.replace('/')
    }

    console.log('isAuthenticated: ',isAuthenticated);
});

Meteor.startup(()=>{
    ReactDOM.render(routes,document.getElementById('app'));
});