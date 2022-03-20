import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import "../css/NavbarComp.css";
import "../css/Footer.css";
import "../css/Home.css";
import AddRestaurent from "./AddRestaurent";
import RestaurentList from "./RestaurentList";
import ShopPage from "./ShopPage";
import Cart from "./Cart";
import UsersCart from "../database/UsersCart";
import DeliveryStatus from "./DeliveryStatus";
import MyRestaurent from "./MyRestaurent";
import MyOrders from "./MyOrders";
import RestaurentOrders from "./RestaurentOrders";
import axios from "axios";
import RestaurentLogin from "./RestaurentLogin";

export default function NavbarComp({
  user,
  setUser,
  restaurent,
  setRestaurent,
}) {
  console.log(restaurent.res_name);
  useEffect(() => {
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setUser(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        console.log("You are not authorized please login");
      }
    };

    fetchPrivateData();
  }, []);

  useEffect(() => {
    const fetchResData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authTokenRes")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/resdata", config);
        setUser(data.data);
      } catch (error) {
        localStorage.removeItem("authTokenRes");
        console.log("You are not authorized please login");
      }
    };

    fetchResData();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    setUser("");
  };
  const reslogoutHandler = () => {
    localStorage.removeItem("authTokenRes");
    setRestaurent("");
  };

  const [res_id, setResId] = useState();
  const [restaurent_path, setRestaurentPath] = useState();
  const [cart_count, setCartCount] = useState(UsersCart[0].cart);

  //For User Food Tracking
  const [order_placed, setOp] = React.useState();
  const [order_confirmed, setOc] = React.useState(0.5);
  const [preparing, setPrep] = React.useState(0.5);
  const [out_for_delivery, setOfd] = React.useState(0.5);
  const [complete, setComplete] = React.useState(0.5);
  const [time_progress, setTp] = React.useState(0.5);
  const [order_placed_progress, setOpp] = React.useState(0.5);
  const [order_confirmed_progress, setOcp] = React.useState(0.5);
  const [preparing_progress, setPp] = React.useState(0.5);
  const [out_for_delivery_progress, setOfdp] = React.useState(0.5);
  //For User Food Tracking

  return (
    <Router>
      <div>
        <Navbar bg="dark" expand="md" variant={"dark"} className="nav--bar">
          <Container>
            <Navbar.Brand className="navbar--brand" href="#home">
              FoodsBD
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to={"/home"}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to={"/login"}>
                  Contact
                </Nav.Link>
                <Nav.Link as={Link} to={"/register"}>
                  About
                </Nav.Link>
                <NavDropdown title="Categories">
                  <NavDropdown.Item href="#action/3.1">Burger</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Cakes</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Chicken
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Rice Item
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              {user || restaurent ? (
                <Nav>
                  {user ? (
                    <div>
                      <Nav.Link href="/delivery-status">Track</Nav.Link>
                      <Nav.Link href="/cart">
                        <i className="fa badge fa-lg" value={cart_count}>
                          <img src="images/cart.png" alt="cart" />
                        </i>
                      </Nav.Link>
                    </div>
                  ) : null}
                  <NavDropdown
                    title={user ? user.name : restaurent.res_name}
                    id="basic-nav-dropdown"
                    menuVariant="dark"
                  >
                    <NavDropdown.Item
                      href={user ? "/profile" : "/myrestaurent"}
                    >
                      {user ? "Profile" : "My Shop"}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={user ? logoutHandler : reslogoutHandler}
                    >
                      Logout
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Settings
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#">Separated link</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              ) : (
                <Nav.Link
                  as={Link}
                  to={"/login"}
                  className="login--btn"
                  style={{ color: "white" }}
                >
                  Login
                </Nav.Link>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      {/* Routes */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route
            path="/restaurentlogin"
            element={<RestaurentLogin setRestaurent={setRestaurent} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/delivery-status"
            element={
              <DeliveryStatus
                order_placed={order_placed}
                order_confirmed={order_confirmed}
                preparing={preparing}
                out_for_delivery={out_for_delivery}
                complete={complete}
                order_placed_progress={order_placed_progress}
                order_confirmed_progress={order_confirmed_progress}
                preparing_progress={preparing_progress}
                out_for_delivery_progress={out_for_delivery_progress}
              />
            }
          />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/addrestaurent" element={<AddRestaurent />} />
          <Route
            path="/orders"
            element={
              <RestaurentOrders
                setOp={setOp}
                setOc={setOc}
                setPrep={setPrep}
                setOfd={setOfd}
                setComplete={setComplete}
                setOpp={setOpp}
                setOcp={setOcp}
                setPp={setPp}
                setOfdp={setOfdp}
              />
            }
          />
          <Route path="/myrestaurent" element={<MyRestaurent />} />
          <Route
            path="/restaurents"
            element={
              <RestaurentList
                setResId={setResId}
                setRestaurentPath={setRestaurentPath}
                user={user}
              />
            }
          />
          <Route
            path={restaurent_path}
            element={<ShopPage res_id={res_id} setCartCount={setCartCount} />}
          />
        </Routes>
      </div>
      <div>
        <footer className="bg-dark text-center text-white">
          <div className="container p-4 pb-0">
            <section className="">
              <form action="">
                <div className="row d-flex justify-content-center">
                  <div className="col-md-6">
                    <div className="row">
                      <h1>FoodsBD for Business</h1>
                      <h6>Add Your Restaurent & Make Money</h6>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Nav.Link
                          as={Link}
                          to={"/addrestaurent"}
                          className="business--btn--reg"
                          style={{ color: "black" }}
                        >
                          Register
                        </Nav.Link>
                      </div>
                      <div className="col">
                        <Nav.Link
                          as={Link}
                          to={"/restaurentlogin"}
                          className="business--btn--login"
                          style={{ color: "white" }}
                        >
                          Login
                        </Nav.Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex justify-content-center">
                    <div>
                      <h6>JavaScript</h6>
                      <h6>NodeJs</h6>
                      <h6>MongoDB</h6>
                    </div>
                    <div>
                      <h6>React</h6>
                      <h6>ExpressJS</h6>
                      <h6>Atlas</h6>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </div>

          <div
            className="text-center p-3 mt-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}
          >
            © 2022 Copyright: <strong>AAF Production</strong>
          </div>
        </footer>
      </div>
    </Router>
  );
}
