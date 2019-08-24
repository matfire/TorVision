import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Viewer from '../pages/Viewer';
import Home from '../pages/Home'


const Routes = (props) => (
    <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/view" exact component={Viewer} />
    </Switch>
)

export default Routes