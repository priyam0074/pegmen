import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import ViewModule from 'material-ui/svg-icons/action/view-module';
import { white } from 'material-ui/styles/colors';
import Badge from 'material-ui/Badge';
import SearchBox from './SearchBox';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import { NotificationComponent } from './Trader/Utilities/NotificationComponent';

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  logout() {
    this.props.logoutUser();
    this.props.change("NOT_LOAD");
  }

  render() {
    const {styles, handleChangeRequestNavDrawer} = this.props;
    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57
      },
      menuButton: {
        marginLeft: 10
      },
      iconsRightContainer: {
        marginLeft: 20
      }
    };
    var notifications = this.props.notificationMsg.map((item, index) => {
      return (<MenuItem key={index} primaryText={item} />);
    })
    var number = this.props.notificationMsg.length;
    if (number > 10) {
      number = '10+'
    }
    return (
      <div>
        <AppBar
          style={{ ...styles, ...style.appBar }}
          
          iconElementLeft={
            <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
              <Menu color={white} />
            </IconButton>
          }
          iconElementRight={
            <div style={style.iconsRightContainer}>
              <IconMenu color={white}
                iconButtonElement={
                  <Badge
                    badgeContent={number}
                    secondary={true}
                    badgeStyle={{ top: 0, right: 0 }}
                    style={{ paddingTop: 0, paddingRight: 0, paddingLeft: 0, paddingBottom: 0 }}
                  >
                    <IconButton tooltip="Notifications">
                      <NotificationsIcon color={white} />
                    </IconButton>
                  </Badge>
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                {notifications}
              </IconMenu>
              <IconMenu color={white}
                iconButtonElement={
                  <IconButton><MoreVertIcon color={white} /></IconButton>
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                <Link to={`/`}>
                  <MenuItem primaryText="Sign Out" onClick={this.logout.bind(this)} />
                </Link>
              </IconMenu>


            </div>
          }
        />
      </div>
    );
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func
};

export default Header;