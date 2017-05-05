import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';
import {instrumentsUrl,orderUrl} from '../../../app.config';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class PopUpComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
        this.props.fetchStocks(instrumentsUrl);
    }

    createOrder() {
        var number = this.refs.tradeInput.input.value;
        console.log(this.refs.tradeInput.input.value, "taeraenfadfkadmfkf")
        for (let i = 0; i < number; i++) {
            var index = Math.floor(Math.random() * 20);
            var side = Math.floor(Math.random() * 2);
            var s;
            if (side == 1) s = "BUY";
            else s = "SELL";
            var stock = this.props.stocks[i];
            var orderData = {
                symbol: stock.symbol,
                side: s,
                quantity: Math.floor(Math.random() * 100),
                limitPrice: stock.lastTrade - 1,
                traderId: this.props.loginId.id
            }
            this.props.makeOrders(orderUrl, orderData);
            this.handleClose();
        }

        // console.log(responseOrder)
        // this.props.storeOrders(responseOrder);
    }
    handleClose(){
        this.props.openModal(false);
    };

    render() {
        const actions = [
                      <FlatButton
                        label="Cancel"
                        primary={true}
                        onTouchTap={this.handleClose.bind(this)}
                      />,
                      <FlatButton
                        label="Submit"
                        primary={true}
                        onClick={this.createOrder.bind(this)}
                      />,
                        ];
        return (
           
                        
                        <div>
                            <Dialog
                            title="Create new Orders"
                            actions={actions}
                            modal={true}
                            open={this.props.open}
                          >
                          <TextField
                            hintText="Number"
                            ref = "tradeInput"
                            type = "number"
                            floatingLabelText="Enter the number of orders"
                            floatingLabelFixed={false}
                          />
                          </Dialog>
         </div>
        );
    }

}