import AppBar from 'material-ui/AppBar';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import Drawer from 'material-ui/Drawer';
import DrawerContent from './DrawerContent';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import RaisedButton from 'material-ui/RaisedButton';
import React, {Component} from 'react';
import {Body} from './core/react/body';
import {Playground} from './core/react/playground';
import {MuiThemeProvider} from 'material-ui';
import {HashRouter as Router} from 'react-router-dom'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecondaryDrawerOpened: false
    };
  }

  handleOpen = () => this.setState({isSecondaryDrawerOpened: true});
  handleClose = () => this.setState({isSecondaryDrawerOpened: false});
  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <div>
            <AppBar
              className="App-header"
              title="Timetable Arranging Program (UTAR)"
              iconElementLeft={< p > </p>}
              iconElementRight={< IconButton onClick = {
              this.handleOpen
            } > <MenuIcon/> </IconButton>}/>
            <br/>
            <Drawer
              width={200}
              docked={false}
              openSecondary={true}
              open={this.state.isSecondaryDrawerOpened}>
              <RaisedButton
                label='hide drawer'
                fullWidth={true}
                secondary={true}
                icon={< ArrowForward />}
                onClick={this.handleClose}/>
              <DrawerContent/>
            </Drawer>
            <Body/>
            <br/>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}
