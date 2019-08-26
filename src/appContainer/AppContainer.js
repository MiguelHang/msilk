import React from "react";
import { Switch, Route } from "react-router-dom";
import MotoContainer from "../motosContainer/motosContainer";
import Favorite from "../favorites/favorite";
import MyFilter from "../myFilters/myFilter";
import styled from 'styled-components';

const MainSection = styled.div`
    padding: 10px 20px;

    a {
        color: #000;
    }
    a:hover {
        color: #fff;
    }
`;

const AppContainer = () => (
  <MainSection>
    <Switch>
      <Route exact path="/" component={MotoContainer} />
      <Route path="/myfilters" component={MyFilter} />
      <Route path="/favorites" component={Favorite} />
    </Switch>
  </MainSection>
);
export default AppContainer;