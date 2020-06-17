import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  Badge,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImg,
} from 'reactstrap';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

const FilterContainer = () => {
  const [activeTab, setActiveTab] = useState('filter');
  return (
    <>
      <Nav tabs className="separator-tabs ml-0 mb-5">
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === 'filter',
              'nav-link': true,
            })}
            onClick={() => {
              setActiveTab('filter');
            }}
            location={{}}
            to="#"
          >
            Filter
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === 'custom_filters',
              'nav-link': true,
            })}
            onClick={() => {
              setActiveTab('custom_filters');
            }}
            location={{}}
            to="#"
          >
            Custom Filters
          </NavLink>
        </NavItem>
      </Nav>
    </>
  );
};

export default FilterContainer;
