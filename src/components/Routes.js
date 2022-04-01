import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect, useLocation, Switch } from "react-router-dom";
import DataReadIn from "./DataReadIn/DataReadIn";
import NQTLAnalysis from "./NQTLAnalysis/NQTLAnalysis";
import QTLAnalysis from "./QTLAnalysis/QTLAnalysis";
import { TAB_REFRESH } from "../actions/types";
import ScrollToTop from "./ScrollToTop";

export default function Routes(props) {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.tab.selected);
  let location = useLocation();

  useEffect(() => {
    let path = location.pathname;
    dispatch({ type: TAB_REFRESH, payload: path });
    // eslint-disable-next-line
  }, [selected]);

  return (
    <React.Fragment>
      <ScrollToTop />
      <Switch>
        {/* Data Read In Tab */}
        <Route path="/data_read_in">
          <DataReadIn />
        </Route>

        {/* NQTL Analysis Tab */}
        <Route path="/nqtl_analysis">
          <NQTLAnalysis />
        </Route>

        {/* QTL Analysis Tab */}
        <Route path="/qtl_analysis">
          <QTLAnalysis />
        </Route>

        {/* Provider Reimbursement Tab */}
        {/* <Route path="/provider_reimbursement">
        <ProviderReimbursement />
      </Route> */}

        {/* Root path - redirect to Data Read In Tab */}
        <Route path={"/"}>
          <Redirect to="/data_read_in" />
        </Route>
      </Switch>
    </React.Fragment>
  );
}
