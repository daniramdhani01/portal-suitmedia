import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate()
  const location = useLocation().pathname.split("/")[1];
  const line =
    "border border-white border-3 border-top-0 border-end-0 border-start-0";
  const menu = ["Work", "About", "Services", "Ideas", "Careers", "Contact"];
  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Container>
        <Navbar.Brand>
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="logo"
            height={"50"}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {menu.map((el: string, i: number) => {
              const manuName =el.toLowerCase() 
              const active = manuName === location;
              return (
                <Nav.Link key={i} onClick={()=>navigate(`/${manuName}`)} className={active? line:''} active={active}>
                  {el}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
