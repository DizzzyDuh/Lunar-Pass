import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Index from "./screens/index";
import ShuttleDetails from "./screens/ShuttleDetails";
import PassengersScreen from "./screens/PassengersScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register";
import BillingAddress from "./screens/BillingAddress";
import PaymentMethod from "./screens/PaymentMethod";
import PlaceOrder from "./screens/PlaceOrder";
import OrderScreen from "./screens/OrderScreen";
import Profile from "./screens/Profile";
import Admin from "./screens/Admin";
import AllShuttles from "./screens/AllShuttles";
import AllOrders from "./screens/AllOrders";
import AllUsers from "./screens/AllUsers";
import UserEdit from "./screens/UserEdit";
import ShuttleEdit from "./screens/ShuttleEdit";
import CreateShuttle from "./screens/CreateShuttle";
import "./css/root.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Route path="/admin/shuttle/add/new" component={CreateShuttle} exact />
        <Route path="/admin/shuttle/:id" component={ShuttleEdit} exact />
        <Route path="/admin/users" exact component={AllUsers} />
        <Route path="/admin/user/:id" component={UserEdit} />
        <Route path="/admin/shuttles" exact component={AllShuttles} />
        <Route path="/admin/orders" exact component={AllOrders} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/user/profile" exact component={Profile} />
        <Route path="/order/:id" component={OrderScreen} />
        <Route path="/placeorder" component={PlaceOrder} />
        <Route path="/payment" component={PaymentMethod} />
        <Route path="/billing" component={BillingAddress} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Index} />
        <Route path="/shuttle/:id" exact component={ShuttleDetails} />
        <Route path="/shuttle/:id/proceed" component={PassengersScreen} />
      </Router>
      <Footer />
    </>
  );
}

export default App;
