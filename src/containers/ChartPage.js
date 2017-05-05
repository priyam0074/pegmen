import React from 'react';
import { Link } from 'react-router';
import { grey400 } from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import { WindowResizeListener } from 'react-window-resize-listener';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentDelete from 'material-ui/svg-icons/content/delete-sweep';
import ContentRefresh from 'material-ui/svg-icons/action/autorenew';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';
import PopUpComponent from '../components/Trader/Utilities/PopUpComponent';
import {orderUrl} from '../app.config';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { pink500, grey200, grey500 } from 'material-ui/styles/colors';

var Legend = require('react-d3-core').Legend;
var BarStackChart = require('react-d3-basic').BarStackChart;
var BarStackHorizontalChart = require('react-d3-basic').BarStackHorizontalChart;

class ChartPage extends React.Component {
  constructor(props) {
    super(props);
    this.p;
    this.state = {
      showDiv: false
    }
  }
  
   handleOpen() { this.props.openModal(true) }
  handleOpenDiv() { var a=this.state.showDiv;
      this.setState({showDiv:!a}) }
  handleDelete(){this.props.deleteOrder(orderUrl)}
  handleRefresh(){this.props.fetchData(orderUrl);}
  changeWidth(size) {
    console.log(size);
    var innerWidth = size.windowWidth;
    if (innerWidth > 768) {
      this.p = 1000 - (1366 - innerWidth);
    }
    else {
      this.p = innerWidth - 10;
    }
    console.log("inside cons", this.p)
    this.setState({});
  }
  render() {
    const styles = {
      toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
      },
      toggleLabel: {
        color: grey400,
        fontWeight: 100
      },
      buttons: {
        marginTop: 30,
        float: 'right'
      },
      saveButton: {
        marginLeft: 5
      },
        floatingActionButton: {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
            zindex:1
        },
        floatingActionButton1: {
            margin: 0,
            top: 'auto',
            right: 28,
            bottom: 90,
            left: 'auto',
            position: 'fixed',
            zindex:1
        },
        floatingActionButton2: {
            margin: 0,
            top: 'auto',
            right: 28,
            bottom: 150,
            left: 'auto',
            position: 'fixed',
            zindex:1
        },
        floatingActionButton3: {
            margin: 0,
            top: 'auto',
            right: 28,
            bottom: 210,
            left: 'auto',
            position: 'fixed',
            zindex:1
        }
    };

    var item = this.props.items;
    var cc = [];
    for (var i = 0; i < item.length; i++) {
      var quantityPlaced = item[i].quantityPlaced - item[i].quantityExecuted;
      var quantity = item[i].quantity - item[i].quantityPlaced;
      var obj = { "Executed": (item[i].quantityExecuted / item[i].quantity) * 100, "Placed": (quantityPlaced / item[i].quantity) * 100, "Total": (quantity / item[i].quantity) * 100, "State": item[i].id };
      // if (quantity != 0 && quantityPlaced != 0) 
      // {
      cc.push(obj);
      // }
      console.log("Item inserted", obj);

    }
    var height;

    if (cc.length > 2) {
      height = (cc.length * 55);
    }
    if (cc.length === 2) {
      height = (cc.length * 75);
    }
    if (cc.length === 1) {
      height = (cc.length * 115);
    }

    var width = 900,

      chartSeries = [
        {
          field: 'Executed',
          name: 'Executed',
          color: '#ff8000',
        },
        {
          field: 'Placed',
          name: 'Placed',
          color: '#febb68',
        }, {
          field: 'Total',
          name: 'Total',
          color: '#ffefbf',
        }
      ],
      y = function (d) {
        return d.State;
      },
      yScale = 'ordinal',
      xTicks = [2, "%"],
      x = function (d) {

        return +d / 100;
      },
      xTickFormat = d3.format("%");
    var widthL = 140,

      margins = { top: 50, right: 50, bottom: 50, left: 50 },
      legendClassName = "test-legend-class",
      legendPosition = 'left',
      legendOffset = 90;


      

    var widthLg = 300;
    console.log(window.innerWidth);
    if (window.innerWidth > 768) {
      this.p = 1000 - (1366 - window.innerWidth) / 1.3;
    }
    else {
      this.p = window.innerWidth - 10;
    }
    width = this.p;


    if (typeof this.props.loginId.id == "undefined") {
      return (<div>
        <h1>PLEASE LOGIN</h1>
        <br />
        <h3>click <Link to="/"><a href="">here</a></Link></h3>
      </div>)
    }

    if (typeof this.props.items == "undefined") {
      return (
        <PageBase title="Chart Page"
        navigation="Application / Chart Page">
        <h1>No Orders Yet!!</h1>
        </PageBase>)
    }

    let changeIcon = [];
    if (this.state.showDiv === false) {
      changeIcon.length = 0;
      changeIcon.push(<ContentAdd />)
    }
    else {
      changeIcon.length = 0;
      changeIcon.push(<ContentClear />)
    }

    return (
      <PageBase title="Chart Page"
        navigation="Application / Chart Page">
        <div>
          <PopUpComponent {...this.props}/>
          <div className="col-xs-5 col-xs-offset-5  hidden-md hidden-lg hidden-xl ">
            <Legend width={widthLg} height={height} legendClassName={legendClassName} legendPosition={legendPosition}
              legendOffset={legendOffset}
              chartSeries={chartSeries} />
          </div>
          <WindowResizeListener onResize={this.changeWidth.bind(this)} />
          <div className="col-sm-9 col-xs-12">
            <BarStackHorizontalChart width={width} height={height} data={cc} chartSeries={chartSeries}
              y={y}
              yLabel="Order id"
              xTicks={xTicks}
              yScale={yScale}
              x={x}
              xTickFormat={xTickFormat}
              horizontal={true}
              showLegend={false} />
          </div>

          <div className="col-sm-2 hidden-sm hidden-xs pull-left">
            <Legend width={widthL} height={height} legendClassName={legendClassName} legendPosition={legendPosition}
              legendOffset={legendOffset} xTicks={xTicks}
              chartSeries={chartSeries} />
          </div>
          <div className={this.state.showDiv ? '' : 'hidden'}>
            <FloatingActionButton mini={true} style={styles.floatingActionButton1} backgroundColor={pink500} onClick={this.handleRefresh.bind(this)}>
              <ContentRefresh />
            </FloatingActionButton>
            <FloatingActionButton mini={true} style={styles.floatingActionButton2} backgroundColor={pink500} onClick={this.handleDelete.bind(this)}>
              <ContentDelete />
            </FloatingActionButton>
            <FloatingActionButton mini={true} style={styles.floatingActionButton3} backgroundColor={pink500} onClick={this.handleOpen.bind(this)}>
              <ContentCreate />
            </FloatingActionButton>
          </div>
          <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500} onClick={this.handleOpenDiv.bind(this)}>
            {changeIcon}
          </FloatingActionButton>
        </div>
      </PageBase>
    );
  };



}

export default ChartPage;
