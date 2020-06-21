import React, { useState } from 'react';
import { Row, Nav, NavItem, Button, TabPane, TabContent } from 'reactstrap';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import SingleFilterContainer from './SingleFilterContainer';
import { Colxx } from '../../components/common/CustomBootstrap';
import { generateInitFilter } from '../../constants/filter';

const FiltersContainer = () => {
  const [activeTab, setActiveTab] = useState('filter');

  const [filters, setFilters] = useState([generateInitFilter()]);

  function handleDeleteFilter(id) {
    // filters.splice(i, i + 1);
    return () =>
      setFilters((filters) => filters.filter((e, index) => index !== id));
  }

  function addFilter() {
    setFilters((filters) => filters.concat(generateInitFilter()));
  }

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
          {filters.map((f, i) => (
            <Row key={i}>
              <Colxx xxs="12" lg="12" className="mb-4">
                <SingleFilterContainer
                  filters={filters}
                  setFilters={setFilters}
                  closeButton={i > 0}
                  i={i}
                  handleDeleteFilter={handleDeleteFilter}
                />
              </Colxx>
            </Row>
          ))}
          <Row>
            <Colxx>
              <Button
                className="btn calendar-prev-btn mr-1"
                onClick={addFilter}
              >
                <span className="simple-icon-plus" />
              </Button>
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
