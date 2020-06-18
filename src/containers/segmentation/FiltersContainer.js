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
import SingleFilterContainer from './SingleFilterContainer';
import { Colxx } from '../../components/common/CustomBootstrap';
import { filterInitialState } from '../../constants/filter';

const FiltersContainer = () => {
  const [activeTab, setActiveTab] = useState('filter');
  const [filter, setFilter] = useState(
    JSON.parse(JSON.stringify(filterInitialState))
  );

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
      <TabContent activeTab={activeTab}>
        <TabPane tabId="filter">
          <Row>
            <Colxx xxs="12" lg="12" className="mb-4">
              <SingleFilterContainer
                filter={filter}
                setFilter={setFilter}
                closeButton={false}
              />
            </Colxx>
          </Row>
        </TabPane>
        <TabPane tabId="custom_filters">
          <Row>
            <Colxx xxs="12" lg="12" className="mb-4 col-left">
              {/* <SingleFilterContainer /> */}
            </Colxx>
          </Row>
        </TabPane>
      </TabContent>
    </>
  );
};

export default FiltersContainer;
