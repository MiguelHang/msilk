import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from "react-router-dom";

const styles = {
  navBar: {'top': AppBar.height},
  links: {'textDecoration': 'none'}
}

class Header extends Component {
  
  constructor(props) {
    super(props);
    this.state = {open: false};
  }
  
  handleToggle = () => {
    this.setState({open: !this.state.open}) 
  };
  
  render() {
    return (
      <div>
        <AppBar
          title={'mSilk'}
          showMenuIconButton={true}
          onLeftIconButtonClick={this.handleToggle}
        />
        <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={() => this.setState({open: false})}
            containerStyle={styles.navBar}
        >
          <Link style = {styles.links} to="/search"><MenuItem onClick={this.handleToggle}>Search</MenuItem></Link>
          <Link style = {styles.links} to="/myfilters"><MenuItem onClick={this.handleToggle}>My filters</MenuItem></Link>
          <Link style = {styles.links} to="/favorites"><MenuItem onClick={this.handleToggle}>Favorites</MenuItem></Link>
        </Drawer>        
      </div>
    )
  }
}

export default Header