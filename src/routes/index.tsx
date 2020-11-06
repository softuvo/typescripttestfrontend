import React from "react"
import { BrowserRouter as Switch, HashRouter } from "react-router-dom"
import { Router, Route } from 'react-router';
import Signup from '../component/Signup'
import Login from '../component/Login'
import ForgotPassword from '../component/ForgotPassword'
import ResetPassword from '../component/ResetPassword'
import { createBrowserHistory } from "history"

const Routes = () => {
  const hist = createBrowserHistory()

  return (
    <div>
      <HashRouter basename="#" >
      <Switch>
          <Route path="/" exact component={Signup} />
        </Switch>
        <Switch>
          <Route path="/login" exact component={Login} />
        </Switch>
        <Switch>
          <Route path="/forgotpassword" exact component={ForgotPassword} />
        </Switch>
        <Switch>
          <Route path="/resetpassword" exact component={ResetPassword} />
        </Switch>
      </HashRouter>
    </div>
  )
}
export default Routes