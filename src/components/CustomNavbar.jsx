import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useContext, useEffect, useState } from "react";
import { doLogout, getCurrentUserDetail, isLoggedIn } from "../auth/auth";
import { UserContext } from "../context/userContext";

const CustomNavbar = () => {
  const userContextData = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());
  }, [login]);

  const logout = () => {
    doLogout(() => {
      //logged out
      setLogin(false);

      //updating userContext
      userContextData.setUser({
        userData: null,
        login: false,
      });

      navigate("/");
    });
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed="top" className="px-4">
        <NavbarBrand tag={ReactLink} to="/">
          BlogHorizon
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/blogs">
                Blogs
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink tag={ReactLink} to="/about">
                About
              </NavLink>
            </NavItem> */}
            {/* <NavItem>
              <NavLink tag={ReactLink} to="/services">
                Services
              </NavLink>
            </NavItem> */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem tag={ReactLink} to="mailto:harshitjoshi67@gmail.com" target={"_blank"}>
                  Contact Us
                </DropdownItem>
                <DropdownItem tag={ReactLink} to="https://www.linkedin.com/in/harshitjoshi1503/" target={"_blank"}>LinkedIn</DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={ReactLink} to="https://github.com/harrythewizard07" target={"_blank"}>GitHub</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          <Nav navbar>
            {login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to={`/user/${user.id}/profile-info`}>
                    Profile Info
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard">
                    {user.username}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={logout}>Logout</NavLink>
                </NavItem>
              </>
            )}

            {!login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    Signup
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
