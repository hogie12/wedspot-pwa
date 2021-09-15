import { Route, Switch } from "react-router-dom";
import PackageDetail from "./packageDetail";
import PackageList from "./packageList";
import NewPackages from "./NewPackages";

const PackageRoutes = () => {
  return (
    <>
     <Switch>
        <Route exact path="/">
          <PackageList />
        </Route>
        <Route path="/package/:id">
          <PackageDetail />
        </Route>
        <Route path="/new/package">
          <NewPackages />
        </Route> 
        <Route path="/edit/:id">
          <NewPackages />
        </Route>
      </Switch>
    </>
  );
};

export default PackageRoutes;
