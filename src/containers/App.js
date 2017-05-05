import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import LeftDrawer from '../components/LeftDrawer';
import withWidth, { LARGE, SMALL } from 'material-ui/utils/withWidth';
import ThemeDefault from '../theme-default';
import Data from '../data';
import Notifications from 'react-notification-system-redux';
import { NotificationComponent } from '../components/Trader/Utilities/NotificationComponent';
import {orderUrl, websocketUrl} from '../app.config';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Websocket from 'react-websocket';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false
    };
  }

  componentWillMount(){
    this.props.openDialogue(false);
    this.props.openModal(false);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({ navDrawerOpen: nextProps.width === LARGE });
    }
  }

  componentDidMount(){
    this.props.fetchData(orderUrl);
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }
  inc1(notificationMsg) {
    this.inc(1);
    this.props.notify(notificationMsg, this.props.notificationMsg);
  }
  // dec1() {
  //     this.inc(-1);
  // }
  inc(n) {
    let count = this.state.count + n;
    if (count < 0) count = 0;
    this.setState({
      count: count
    });
  }
  handleData(data) {
    let msg = '';
    for (let i = 0; i < data.length; i++) {
      if (i >= 3)
        msg += data[i];
      if (data[i] == "}" && data[i + 1] != "}")
        break;
    }
    console.log(msg, "msg");
    let result = JSON.parse(msg);
    let notificationMsg = "";
    let type;
    if (result.orderMessage == "placementCreatedEvent") {
      notificationMsg = "Total of " + result.order.quantityPlaced + " Units of \n Order with OrderId : " + result.order.id + " are now placed. \nWaiting for Execution";
      this.inc1(notificationMsg);
      if (result.order.status == "Placed")
        this.props.info({
          // uid: 'once-please', // you can specify your own uid if required
          title: 'Order Placed',
          message: notificationMsg,
          position: 'bl',
          autoDismiss: 3,
          // action: {
          //     label: 'Click me!!',
          //     callback: () => alert('clicked!')
          // }
        });
    }
    if (result.orderMessage == "executionCreatedEvent") {
      notificationMsg = "Total of " + result.order.quantityExecuted + " Units of \nOrder with OrderId : " + result.order.id + " are executed \nwith price " + result.order.executionPrice;
      this.inc1(notificationMsg);
      if (result.order.status == "Executed")
        this.props.warning({
          // uid: 'once-please', // you can specify your own uid if required
          title: 'Order Executed',
          message: notificationMsg,
          position: 'bl',
          autoDismiss: 3,
          // action: {
          //     label: 'Click me!!',
          //     callback: () => alert('clicked!')
          // }
        });
    }
    if (result.orderMessage == "orderCreatedEvent") {
      notificationMsg = "A new Order with " + result.order.quantity + " Units of and OrderId : " + result.order.id + " is being created by Trader with ID " + result.order.traderId;
      type = 'warning';
      //  this.showNotifications(notificationMsg, type)
      this.props.success({
        // uid: 'once-please', // you can specify your own uid if required
        title: 'Order Created',
        message: notificationMsg,
        position: 'bl',
        autoDismiss: 3,
        // action: {
        //     label: 'Click me!!',
        //     callback: () => alert('clicked!')
        // }
      });
      console.log("called")
    }
    this.props.updateOrder(result.orderMessage, this.props.items, result.order);
    this.props.updateSearch(result.order, this.props.searchResults);
  }
  render() {
    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 236;
    console.log(this.props, "App");
    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    };
    let notificationRow, notification;
    if (typeof this.props.notifications !== 'undefined' && this.props.notifications.length > 0) {
      notification = this.props.notifications.map((item, index) => {
        console.log(item, "notifications")
        return (<NotificationComponent {...this.props} />);
      })
    }

    return (
      <div>
        <MuiThemeProvider muiTheme={ThemeDefault}>
          {this.props.loadHeader ?
            <div>
              <Header styles={styles.header}
                handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)} {...this.props} />

              <LeftDrawer navDrawerOpen={navDrawerOpen}
                menus={Data.menus}
                username="User Admin" {...this.props} />

               <div style={styles.container} className="padTablePage">
                {React.cloneElement(this.props.children, this.props)}
              </div>
            </div> :
            <div>
              {React.cloneElement(this.props.children, this.props)}
            </div>
          }
        </MuiThemeProvider>

        <Websocket url={websocketUrl}
          onMessage={this.handleData.bind(this)} />
        {notification}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number
};

export default withWidth()(App);
