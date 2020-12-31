import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component.jsx';

import { auth, createUserProfileDocument } from './firebase/firebase.utils.js';

import { setCurrentUser } from './redux/user/user-actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {
  unsubscribeFromAuth = null;

  // componentDidMount内でsetStateを使わないほうが良いらしい。
  // 使うなら、constructor内で走らせたほうが吉。
  // でも、これって、render()では、情報を取得していない(別の問題？)だから、悪くはないのかな？
  // 認証ができれいれば、実行。currentUserのデータを取得。
  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
                id: snapShot.id,
                ...snapShot.data()
            });
        });
      }
      setCurrentUser( userAuth );
    });
  }

  // マウントの解除(例えば、componentDidMountでの設定を解除できる)。
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          {/* ベースとなるルーティング */}
          {/* exactがないと、「/hats」の時、「/」も含まれたルーティングになってしまう */}
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ ShopPage } />
          <Route exact path='/checkout' component={ CheckoutPage } />
          <Route 
            exact 
            path='/signin' 
            render={() => 
              this.props.currentUser ? (
              <Redirect to='/'/>
              ) : (
              <SignInAndSignUpPage />
              )
            }
            />
        </Switch>
  
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);
