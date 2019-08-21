// import styled from 'styled-components';

// export default styled.div`
    
// `
import React from "react";
import { Switch, Route } from "react-router-dom";
import MotoContainer from "../motosContainer/motosContainer";
import Favorite from "../favorites/favorite";
import MyFilter from "../myfilters/myfilter";
const AppContainer = () => (
  <div>
    <Switch>
      <Route exact path="/" component={MotoContainer} />
      <Route path="/myfilters" component={MyFilter} />
      <Route path="/favorites" component={Favorite} />
    </Switch>
  </div>
);
export default AppContainer;