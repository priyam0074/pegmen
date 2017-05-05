import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
//import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentDelete from 'material-ui/svg-icons/content/delete-sweep';
import ContentRefresh from 'material-ui/svg-icons/action/autorenew';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';
import { pink500, grey200, grey500 } from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import PopUpComponent from '../components/Trader/Utilities/PopUpComponent';
import Data from '../data';
import { BootstrapTable } from 'react-bootstrap-table';
import { orderUrl } from '../app.config';
import css from 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import moment from 'moment';

class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadItems: true,
      showDiv: false
    }
  }

  componentWillMount() {
    this.setState({ showDiv: false })
    this.setState({ loadItems: true });
    this.props.openModal(false);
  }

  searchItems(event) {
    let criteria = ReactDOM.findDOMNode(this.refs.criteria).value;
    let key = event.target.value;
    if (key == "") {
      this.setState({ loadItems: true })
    }
    else {
      console.log(key, criteria)
      this.props.searchOrders(key, criteria, this.props.items);
      this.setState({ loadItems: false })
    }
  }
  handleOpen() { this.props.openModal(true) }
  handleOpenDiv() {
    var a = this.state.showDiv;
    this.setState({ showDiv: !a })
  }
  handleDelete() { this.props.deleteOrder(orderUrl) }
  handleRefresh() { this.props.fetchData(orderUrl); }

  expandComponent(row) {
    return (
      <div id="myModal" role="dialog">
        <div className="modal-dialog">


          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Details</h4>
            </div>
            <div className="modal-body">
              <p>Id :{row.id}</p>
              <p>Creation Time : {row.creationTime}</p>
              <p>Side : {row.side}</p>
              <p>Symbol : {row.symbol}</p>
              <p>Quantity : {row.quantity}</p>
              <p>Placed : {row.quantityPlaced}</p>
              <p>Executed : {row.quantityExecuted}</p>
              <p>Limit Price : {row.limitPrice}</p>
              <p>Priority : {row.priority}</p>
              <p>Status : {row.status}</p>
              <p>Trader : {row.traderId}</p>
            </div>
          </div>

        </div>
      </div>
    );
  }
  dateFormatter(cell, row) {
    console.log('pika')
    return moment(cell).format('DD-MM-YY HH:mm:ss');
  }
  numFormatter(cell, row) {
    console.log('pikapika')
    return parseInt(cell);
  }

  render() {
    var data = [];
    const options = {
      afterSearch: this.afterSearch,
      expandRowBgColor: '#C0C0E4'
    };
    const selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,
      hideSelectColumn: true,
      clickToExpand: true,   // you should add this to trigger selection and expand both on clicking
      bgColor: 'pink'
    };
    let orderRow, searchRow;
    this.state.loadItems == false
      ?
      data = this.props.searchResults
      :
      data = this.props.items;
    const styles = {
      floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        zindex: 1
      },
      floatingActionButton1: {
        margin: 0,
        top: 'auto',
        right: 28,
        bottom: 90,
        left: 'auto',
        position: 'fixed',
        zindex: 1
      },
      floatingActionButton2: {
        margin: 0,
        top: 'auto',
        right: 28,
        bottom: 150,
        left: 'auto',
        position: 'fixed',
        zindex: 1
      },
      floatingActionButton3: {
        margin: 0,
        top: 'auto',
        right: 28,
        bottom: 210,
        left: 'auto',
        position: 'fixed',
        zindex: 1
      }
    };


    if (typeof this.props.loginId.id == "undefined") {
      return (<div>
        <h1>PLEASE LOGIN</h1>
        <br />
        <h3>click <Link to="/"><a href="">here</a></Link></h3>
      </div>)
    }
    /*return (
      <PageBase title="Orders">
        <div>
          
          <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500} onClick = {this.handleOpen.bind(this)}>
            <ContentAdd/>
          </FloatingActionButton>
        <PopUpComponent {...this.props}/>
          <Table selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableRowColumn colSpan="7">
                  <input onChange={this.searchItems.bind(this)} type="text" className="form-control" id="search" placeholder="Search...." />
                </TableRowColumn>
                <TableRowColumn colSpan="4" >

                  <select ref="criteria" className="form-control" id="sel1">
                    <option>Search By</option>
                    <option value="ID">ID</option>
                    <option value="SIDE">Side</option>
                    <option value="SYMBOL">Symbol</option>
                    <option value="QUANTITY">Quantity</option>
                    <option value="PRIORITY">Priority</option>
                    <option value="STATUS">Status</option>
                    <option value="TRADER">Trader</option>
                  </select>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn >ID</TableHeaderColumn>
                <TableHeaderColumn >Time</TableHeaderColumn>
                <TableHeaderColumn >Side</TableHeaderColumn>
                <TableHeaderColumn >Symbol</TableHeaderColumn>
                <TableHeaderColumn >Quantity</TableHeaderColumn>
                <TableHeaderColumn >Placed</TableHeaderColumn>
                <TableHeaderColumn >Executed</TableHeaderColumn>
                <TableHeaderColumn >Price</TableHeaderColumn>
                <TableHeaderColumn >Priority</TableHeaderColumn>
                <TableHeaderColumn >Status</TableHeaderColumn>
                <TableHeaderColumn >Trader</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {data.map(item =>
                <TableRow key={item.id}>
                  <TableRowColumn >{item.id}</TableRowColumn>
                  <TableRowColumn >{item.creationTime}</TableRowColumn>
                  <TableRowColumn >{item.side}</TableRowColumn>
                  <TableRowColumn >{item.symbol}</TableRowColumn>
                  <TableRowColumn >{item.quantity}</TableRowColumn>
                  <TableRowColumn >{item.quantityPlaced}</TableRowColumn>
                  <TableRowColumn >{item.quantityExecuted}</TableRowColumn>
                  <TableRowColumn >{item.limitPrice}</TableRowColumn>
                  <TableRowColumn >{item.priority}</TableRowColumn>
                  <TableRowColumn >{item.status}</TableRowColumn>
                  <TableRowColumn >{item.traderId}</TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </PageBase>
    );*/
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
      <PageBase title="Orders" >
        <div >

          <PopUpComponent {...this.props} />
          <form>
            <div className="form-group col-xs-9 ">
              <input onChange={this.searchItems.bind(this)} type="text" className="form-control" id="search" placeholder="Search...." />
            </div>
            <div className="form-group col-xs-3">
              <select ref="criteria" className="form-control" id="sel1">
                <option>Search By</option>
                <option value="ID">ID</option>
                <option value="SIDE">Side</option>
                <option value="SYMBOL">Symbol</option>
                <option value="QUANTITY">Quantity</option>
                <option value="PRIORITY">Priority</option>
                <option value="STATUS">Status</option>
                <option value="TRADER">Trader</option>
              </select>
            </div>

          </form>
          < div className="tableCont col-md-12 hidden-xs  hidden-sm">
            <BootstrapTable data={data} options={options} pagination={true} striped tableHeaderClass='my-header-class'>

              <TableHeaderColumn dataField='id' isKey={true} dataSort width='48'>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='creationTime' width='80' dataSort  >Time</TableHeaderColumn>
              <TableHeaderColumn dataField='side' width='70' dataSort >Side</TableHeaderColumn>
              <TableHeaderColumn dataField='symbol' dataSort >Symbol</TableHeaderColumn>
              <TableHeaderColumn dataField='quantity' dataSort >Quantity</TableHeaderColumn>
              <TableHeaderColumn dataField='quantityPlaced' dataSort >Placed</TableHeaderColumn>
              <TableHeaderColumn dataField='quantityExecuted' dataSort >Executed</TableHeaderColumn>
              <TableHeaderColumn dataField='limitPrice' dataSort dataFormat={this.numFormatter.bind(this)}>Limit Price</TableHeaderColumn>
              <TableHeaderColumn dataField='priority' width='68' >Priority</TableHeaderColumn>
              <TableHeaderColumn dataField='status' dataSort >Status</TableHeaderColumn>
              <TableHeaderColumn dataField='traderId' dataSort >Trader</TableHeaderColumn>
            </BootstrapTable>
          </div>

          < div className="tableCont col-sm-12 hidden-md hidden-lg  hidden-xs">
            <BootstrapTable data={data} options={options} pagination={true} hover>
              <TableHeaderColumn dataField='id' isKey={true} dataSort width='48' >ID</TableHeaderColumn>
              <TableHeaderColumn dataField='creationTime' width='80' dataSort >Time</TableHeaderColumn>
              <TableHeaderColumn dataField='side' dataSort >Side</TableHeaderColumn>
              <TableHeaderColumn dataField='symbol' dataSort >Symbol</TableHeaderColumn>
              <TableHeaderColumn dataField='quantity' dataSort >Quantity</TableHeaderColumn>
              <TableHeaderColumn dataField='quantityPlaced' dataSort >Placed</TableHeaderColumn>
              <TableHeaderColumn dataField='quantityExecuted' dataSort >Executed</TableHeaderColumn>
              <TableHeaderColumn dataField='limitPrice' dataSort dataFormat={this.numFormatter.bind(this)}>Limit Price</TableHeaderColumn>
              <TableHeaderColumn dataField='status' dataSort >Status</TableHeaderColumn>
            </BootstrapTable>
          </div>

          < div className="tableCont col-xs-12 hidden-md hidden-lg  hidden-sm">

            <BootstrapTable data={data} options={options} pagination={true} selectRow={selectRowProp}
              expandableRow={(row) => { return true; }} expandComponent={this.expandComponent} hover >
              <TableHeaderColumn dataField='id' isKey={true} dataSort width='48'>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='side' dataSort>Side</TableHeaderColumn>
              <TableHeaderColumn dataField='symbol' dataSort >Symbol</TableHeaderColumn>
              <TableHeaderColumn dataField='quantity' dataSort >Quantity</TableHeaderColumn>
              <TableHeaderColumn dataField='limitPrice' dataSort dataFormat={this.numFormatter.bind(this)}>Limit Price</TableHeaderColumn>
            </BootstrapTable>
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
    )
  };

}





export default TablePage;
