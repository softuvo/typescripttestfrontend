import React from "react"
import { BrowserRouter, HashRouter,Route,Switch } from "react-router-dom"
import Signup from '../component/Signup'
import Login from '../component/Login'
import ForgotPassword from '../component/ForgotPassword'
import ResetPassword from '../component/ResetPassword'
import { createBrowserHistory } from "history"

const Routes = () => {
  const hist = createBrowserHistory()

  return (
    <div>
      <BrowserRouter >
      <Switch>
          <Route path="/" exact component={Signup} />
        </Switch>
        <Switch>
          <Route path="/login/" exact component={Login} />
        </Switch>
        <Switch>
          <Route path="/forgotpassword" exact component={ForgotPassword} />
        </Switch>
        <Switch>
          <Route path="/resetpassword" exact component={ResetPassword} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
export default Routes