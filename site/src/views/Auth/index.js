import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import QuickCheckout from './QuickCheckout';
import SignIn from './Login';
import SignUp from './SignUp';
import Forgot from './Forgot';
import Reset from './Reset';
import logo from 'assets/logo_white.png';
import man from 'assets/auth/man.png';
import './style.scss';

const Auth = () => {
  const { path } = useRouteMatch();

  return (
    <main className="auth flex flex-col min-h-screen bg-theme">
      <div className="nav container mx-auto flex items-center justify-between h-20">
        <a href="https://utiva.io">
          <img src={logo} alt="logo" className="w-24" />
        </a>

        <p className="italic text-white opacity-70">The future of learning</p>
      </div>
      <div className="card container mx-auto flex-center flex-grow mt-7 md:mt-0">
        <div className="pages flex items-end bg-white rounded-lg w-full md:w-auto shadow-lg">
          <div className="auth-con w-full md:w-auto p-5 sm:py-12 sm:px-16 ">
            <Switch>
              <Route exact path={`${path}/signin`} component={SignIn} />
              <Route exact path={`${path}/signup`} component={SignUp} />
              <Route
                exact
                path={`${path}/quickcheckout/:courseCohortId`}
                component={QuickCheckout}
              />
              <Route exact path={`${path}/forgot`} component={Forgot} />
              <Route exact path={`${path}/reset-password`} component={Reset} />
              <Route component={SignIn} />
            </Switch>
          </div>
          <div className="img-sec w-2/5 hidden md:block">
            <img
              src={man}
              alt="man"
              className="w-full h-full block object-contain"
            />
          </div>
        </div>
      </div>
      <div className="ftr container flex-row text-center text-sm mx-auto">
        <div className="py-7">
          <p className="italic text-white opacity-70">
            By continuing, you agree to Utiva’s Terms of Use, Privacy Policy,
            and to receive promotional materials from Utiva.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Auth;
