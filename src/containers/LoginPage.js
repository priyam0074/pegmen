import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import firebaseAuth from '../firebase/config';
import Checkbox from 'material-ui/Checkbox';
import { grey500, white } from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router';
import { userUrl } from '../app.config';
import ThemeDefault from '../theme-default';

class LoginPage extends React.Component {

  componentDidMount() {
    this.props.fetchTraders(userUrl);
  }

  loginClicked() {
    var id = ReactDOM.findDOMNode(this.refs.selectedTrader).value;
    var selectedUser;
    for (let user of this.props.users) {
      if (user.id === id) {
        selectedUser = user;
      }
    }
    //Firebase logic
    var reg = new RegExp(" ", "g");
    var password = id.replace(reg, "").toLowerCase()

    var email = password.concat("@gmail.com");

    let users;
    firebaseAuth().signInWithEmailAndPassword(email, password + "@123").then(function (user) {

      users = user;
      browserHistory.push('/');
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      // ...
    });
    this.setState({ loadScreen: true });
    this.props.getUser(selectedUser);
    this.props.change("LOAD");

  }
  componentWillMount() {
    this.props.getUser(null);
    console.log(this.props)
    this.props.change("NOT_LOAD");
    this.Listener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
    this.Listener();
  }

  render() {

    var users = this.props.users.map((user) => {
      return (
        <option id="traderList" key={user.id} value={user.id}>{user.name}</option>
      )
    });


    return (<div>
      <div id="fback" className="col-md-12 hidden-xs">
        <div className="kayitback">

        </div>
      </div>

      <div id="textbox" className="col-md-12">
        <div className="toplam">
          <div className="right">
            <div className="inerdiv">
              <center>
                <img src="https://www.sapientglobalmarkets.com/images/sgm-logo-large.png" height="50" width="40" />
              </center>
              <center>
                <h2>Powered by Sapient</h2>
              </center>
              <center>
                <div id="ic">

                  <h2>Welcome to Traders Desktop</h2>

                  <p>The markets are unforgiving, and smart trading always results in profits.</p>
                  <form name="login-form" id="girisyap sidebar-user-login" method="post" onsubmit="return false;">

                    <div className="form-group">
                      <div className="form-group">
                        <select ref="selectedTrader" className="form-control" id="traderNameList">
                          {users}
                        </select>
                      </div>

                    </div>
                    <Link to={`/dashboard`}>
                      <input type="submit" value="Login" onClick={this.loginClicked.bind(this)} className="girisbtn" tabindex="100" />
                    </Link>
                  </form>

                </div>
              </center>
            </div>
          </div>

        </div>
      </div>
    </div>

    );
  }

}


export default LoginPage;
