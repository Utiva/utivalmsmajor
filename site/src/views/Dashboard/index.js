import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NavBar from "./NavBar";
// import Footer from './Footer'
import SideBar from "../../components/SideBar";
import Home from "./Home";
import "./style.scss";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  let { path, url } = useRouteMatch();

  const openBar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const close = () => {
      setOpen(false);
    };

    const closeSlider = () => {
      const smallerScreen = window.matchMedia("(max-width: 800px)");

      if (smallerScreen.matches) {
        close();
      } else {
      }
    };

    window.addEventListener("resize", closeSlider);
    window.addEventListener("scroll", close);
    return () => {
      window.removeEventListener("resize", closeSlider);
      window.removeEventListener("scroll", close);
    };
  }, []);

  return (
    <main className="dashboard flex-row">
      <aside className={`dh-aside ${open ? " open" : ""}`}>
        <SideBar url={url} />
      </aside>
      <section className="dh-main">
        <div className="contents flex-col">
          <NavBar />
          <Switch>
            <Route exact path={path}>
              <Home />
            </Route>
            <Route path={`${path}/courses`}>
              <Home />
            </Route>
          </Switch>
        </div>
        {/* </Footer> */}
      </section>
    </main>
  );
};

export default Dashboard;
