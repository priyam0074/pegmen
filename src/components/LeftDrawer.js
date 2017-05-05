import React,  { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import {spacing, typography} from 'material-ui/styles';
import {white, blue600} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import Avatar from 'material-ui/Avatar';

const LeftDrawer = (props) => {
  let { navDrawerOpen } = props;

  const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: '22px',
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: blue600,
      paddingLeft: '40px',
      height: '56px',
    },
    menuItem: {
      color: white,
      fontSize: '14px'
    },
    avatar: {
      div: {
        padding: '15px 0 20px 15px',
        backgroundImage:  'url(' + require('../images/material_bg.png') + ')',
        height: '70px'
      },
      icon: {
        float: 'left',
        display: 'block',
        marginRight: '15px',
        boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
      },
      span: {
        paddingTop: '12px',
        display: 'block',
        color: 'white',
        fontWeight: 300,
        textShadow: '1px 1px #444'
      }
    }
  };

  return (
    <Drawer
      docked={true}
      open={navDrawerOpen}>
        <div style={styles.logo}>

          Trader Desktop
        </div>
        <div style={styles.avatar.div}>
          <Avatar src="http://www.material-ui.com/images/uxceo-128.jpg"
                  size={50}
                  style={styles.avatar.icon}/>
          <span style={styles.avatar.span}>{props.loginId.name}</span>
        </div>
        <div>
          {props.menus.map((menu, index) =>
            <MenuItem
              key={index}
              style={styles.menuItem}
              primaryText={menu.text}
              leftIcon={menu.icon}
              containerElement={<Link to={menu.link}/>}
            />
          )}
        </div>
    </Drawer>
  );
};

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string,
};

export default LeftDrawer;
