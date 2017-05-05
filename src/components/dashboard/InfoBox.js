import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import {white, grey800} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';
import {orderUrl} from '../../app.config';

class InfoBox extends React.Component {
  constructor(props){
    super(props)
  }
  deleteAllOrders() {
		this.props.deleteOrder(orderUrl)
	}

	refershOrders() {
		this.props.fetchData(orderUrl);
	}
  render() {

//     var paperSettings = {
//   overlayColor  : undefined,
//   burstSpeed    : 2000,
//   burstColor    : undefined,
//   clickable     : true,
//   liftOnHover   : true,
//   liftOnClick   : true,
//   zDepth        : 3,
//   zoom: true
// }
    const {color, title, value, Icon} = this.props;

    const styles = {
      content: {
        padding: '5px 10px',
        marginLeft: '90px',
        height: '90px'
      },
      number: {
        display: 'block',
        fontWeight: typography.fontWeightMedium,
        fontSize: '18px',
        color: grey800
      },
      text: {
        fontSize: '20px',
        fontWeight: typography.fontWeightLight,
        color: grey800
      },
      iconSpan: {
        float: 'left',
        height: '90px',
        width: '90px',
        textAlign: 'center',
        backgroundColor: color
      },
      icon: {
        height: '48px',
        width: '48px',
        marginTop: '20px',
        maxWidth: '100%'

      }
    };

    return (
      <Paper >
        <span style={styles.iconSpan}>
          <Icon color={white}
                style={styles.icon}
          />
        </span>

        <div  style={styles.content}>
          <span style={styles.text}>{title}</span>
          <span style={styles.number}>{value}</span>
        </div>
      </Paper>
      );
  }
}

InfoBox.propTypes = {
  Icon: PropTypes.any, // eslint-disable-line
  color: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string
};

export default InfoBox;
