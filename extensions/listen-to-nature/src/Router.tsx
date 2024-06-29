import { HomePage } from './pages/Home.page';
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import _ from 'lodash';

export const NotFoundPage = ()=>{
    return <div>404 not found</div>
}


export default () => {
    let basename = '/'

    const routerArr: JSX.Element[] = []
    return <Router basename={basename} >
        <Switch>
            <Route exact path={"/"} component={HomePage} />
            <Route path={'*'} component={NotFoundPage} />
        </Switch>
    </Router>
}
