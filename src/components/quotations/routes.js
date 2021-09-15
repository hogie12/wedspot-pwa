import { Route, Switch } from "react-router-dom";
import QuotationDetail from "./quotationDetail";
import Quotations from "./quotations";

const QuotationsRouters = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Quotations/>
        </Route>
        <Route path="/quotation/:id">
          <QuotationDetail/>
        </Route>
      </Switch>
    </>
  );
};

export default QuotationsRouters;
