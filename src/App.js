import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import { auth } from './firebase/firebase.utils.js';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }


  unsubscribeFromAuth = null;

  // componentDidMount内でsetStateを使わないほうが良いらしい。
  // 使うなら、constructor内で走らせたほうが吉。
  // でも、これって、reder()では、情報を取得していない(別の問題？)だから、悪くはないのかな？
  // 認証ができれいれば、実行。currentUserのデータを取得。
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
      console.log(user);
    })
  }

  // マウントの解除(例えば、componentDidMountでの設定を解除できる)。
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          {/* ベースとなるルーティング */}
          {/* exactがないと、「/hats」の時、「/」も含まれたルーティングになってしまう */}
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ ShopPage } />
          <Route exact path='/signin' component={ SignInAndSignUpPage } />
        </Switch>
  
      </div>
    );
  }

}

export default App;
