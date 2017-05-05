import React, { PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { grey400, cyan600, white } from 'material-ui/styles/colors';
import { typography } from 'material-ui/styles';
import Wallpaper from 'material-ui/svg-icons/device/wallpaper';

class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var paperSettings = {
      clickable: true,
      liftOnHover: true,
      liftOnClick: true,
      zDepth: 1
    }
    let data = [];
    if (typeof this.props.items !== 'undefined' && this.props.items.length > 0) {
      data = this.props.items.slice(0, 4);
    }
    const styles = {
      subheader: {
        fontSize: 24,
        fontWeight: typography.fontWeightLight,
        backgroundColor: cyan600,
        color: white
      }
    };

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>View</MenuItem>
      </IconMenu>
    );
    return (
      <Paper settings={paperSettings}>
        <List>
          <Subheader style={styles.subheader}>Order Details</Subheader>
          {
            data.map(item =>
              <div key={item.title}>
                <ListItem
                  leftAvatar={<Avatar icon={<Wallpaper />} />}
                  primaryText={item.symbol}
                  secondaryText={item.quantity}
                  rightIconButton={rightIconMenu}
                />
                <Divider inset={true} />
              </div>
            )}
        </List>
      </Paper>
    );
  };
}



OrderDetails.propTypes = {
  data: PropTypes.array
};

export default OrderDetails;
