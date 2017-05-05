import React from 'react';
import { cyan600, pink600, purple600, orange600 } from 'material-ui/styles/colors';
import Refresh from 'material-ui/svg-icons/action/cached';
import Delete from 'material-ui/svg-icons/action/delete-forever';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import Statastics from 'material-ui/svg-icons/action/perm-identity';
import InfoBox from '../components/dashboard/InfoBox';
import NewOrders from '../components/dashboard/NewOrders';
import MonthlySales from '../components/dashboard/MonthlySales';
import BrowserUsage from '../components/dashboard/BrowserUsage';
import OrderDetails from '../components/dashboard/RecentlyProducts';
import globalStyles from '../styles';
import Data from '../data';
import {orderUrl} from '../app.config';
import { Link } from 'react-router';
import PopUpComponent from '../components/Trader/Utilities/PopUpComponent';
import Stats from '../components/Trader/Utilities/StatsComponent';

export default class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
  }

  deleteAllOrders() {
    this.props.deleteOrder(orderUrl)
  }

  refershOrders() {
    this.props.fetchData(orderUrl);
  }
  handleOpen(){
    this.props.openModal(true);
  };
dialogueOpen(){
  this.props.openDialogue(true);
};
  

  render() {

    if (typeof this.props.loginId.id == "undefined") {
      return (<div>
        <h1>PLEASE LOGIN</h1>
        <br />
        <h3>click <Link to="/"><a href="">here</a></Link></h3>
      </div>)
    }
    return (
      <div>

        <div className="row">


         <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 animate" onClick ={this.handleOpen.bind(this)} > 

            <InfoBox Icon={NoteAdd}
              color={pink600}
              title="Create Trades"
            />
          </div>
          <PopUpComponent {...this.props}></PopUpComponent>

     
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 animate" onClick ={this.deleteAllOrders.bind(this)} >
            <InfoBox Icon={Delete} {...this.props}
              color={cyan600}
              title="Delete"
            />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 animate" onClick ={this.refershOrders.bind(this)} >

            <InfoBox Icon={Refresh}
              color={purple600}
              title="Refresh"
            />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 animate" onClick ={this.dialogueOpen.bind(this)}>
            <InfoBox Icon={Statastics}
              color={orange600}
              title="Stats"

            />
            
          </div>
          <Stats {...this.props}></Stats>
        </div>

        <div className="row">

          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 animate">
            <Link to={`/table`}>
              <OrderDetails {...this.props} />
            </Link>
          </div>



          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 animate">
            <Link to={`/chart`}>
              <BrowserUsage data={Data.dashBoardPage.browserUsage} />
            </Link>
          </div>
        </div>
      </div>
    );
  };

}
