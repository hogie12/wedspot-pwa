import { Route, Switch } from "react-router-dom";
import MyStore from "./MyStore";
import MyStoreDoneSubmit from "./MyStoreDoneSubmit";
const StoreRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <MyStoreDoneSubmit />
        </Route>
        <Route path="/edit">
          <MyStore />
        </Route>
      </Switch>
    </>
  );
};

export default StoreRoutes;
