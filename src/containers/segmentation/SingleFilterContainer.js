import React, { useState } from 'react';
import { Card, Row, CardBody, Input, Button } from 'reactstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import TagsInput from 'react-tagsinput';
import CustomSelectInput from '../../components/common/CustomSelectInput';
import { Colxx } from '../../components/common/CustomBootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-tagsinput/react-tagsinput.css';
import { filterInitialState } from '../../constants/filter';

const filterData = [
  { label: 'Twitter Handle', value: 'twitterHandle', key: 0 },
  { label: 'Follower Count', value: 'followerCount', key: 1 },
  { label: 'Friend Count', value: 'friendCount', key: 2 },
  { label: 'Topics', value: 'topics', key: 3 },
  { label: 'Last Seen', value: 'lastSeen', key: 4 },
  { label: 'From Country', value: 'country', key: 5 },
];

const countryData = [
  { label: 'United State', value: 'us', key: 0 },
  { label: 'India', value: 'in', key: 1 },
  { label: 'United Kingdom', value: 'uk', key: 2 },
];

const stringCondition = [{ label: 'Is', value: 'is', key: 0 }];
const numberCondition = [
  { label: 'Is Greater Than', value: 'isGreaterThan', key: 0 },
  { label: 'Is Less Than', value: 'isLessThan', key: 1 },
  { label: 'In Between', value: 'inBetween', key: 2 },
];

const topicsCondition = [
  { label: 'AND', value: 'and', key: 0 },
  { label: 'OR', value: 'or', key: 1 },
];

const SingleFilterContainer = (props) => {
  // const [selectedFilter, setSelectedFilter] = useState('');
  // const [selectedCountry, setSelectedCountry] = useState('');
  // const [selectedTopicsCondition, setSelectedTopicsCondition] = useState({
  //   label: 'AND',
  //   value: 'and',
  //   key: 0,
  // });
  const [filter, setFilter] = useState(
    JSON.parse(JSON.stringify(filterInitialState))
  );

  const {
    key,
    i,
    filters,
    setFilters,
    closeButton,
    handleDeleteFilter,
  } = props;
  function handleSelectChange(evt, target) {
    const value = evt;
    let f = filters[i];
    f = { ...f, [target.name]: value };
    filters[i] = f;
    setFilters(filters);
    setFilter(f);
  }

  function handleChange(evt) {
    const { value } = evt.target;
    let f = filters[i];
    f = { ...f, [evt.target.name]: value };
    filters[i] = f;
    setFilters(filters);
    setFilter(f);
  }

  function handleTopicsChange(e) {
    let f = filters[i];
    f = { ...f, topics: e };
    filters[i] = f;
    setFilters(filters);
    setFilter(f);
  }

  function handleStartDateChange(e) {
    let f = filters[i];
    f = { ...f, startDate: e };
    filters[i] = f;
    setFilters(filters);
    setFilter(f);
  }
  function handleEndDateChange(e) {
    let f = filters[i];
    f = { ...f, endDate: e };
    filters[i] = f;
    setFilters(filters);
    setFilter(f);
  }

  // const [selectedStringCondition, setSelectedStringCondition] = useState({
  //   label: 'Is',
  //   value: 'is',
  //   key: 0,
  // });
  // const [selectedNumberCondition, setSelectedNumberCondition] = useState({
  //   label: 'Is Greater Than',
  //   value: 'isGreaterThan',
  //   key: 0,
  // });

  // const [startDate, setStartDate] = useState(new Date());
  // const [topics, setTopics] = useState([]);

  return filter ? (
    <>
      <Card>
        <CardBody>
          <Row>
            <Colxx lg="3" xxs="12">
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="selectedFilter"
                value={filter.selectedFilter}
                onChange={handleSelectChange}
                options={filterData}
                placeholder="Select a Filter..."
              />
            </Colxx>
            {(() => {
              switch (
                filter.selectedFilter ? filter.selectedFilter.value : ''
              ) {
                case 'twitterHandle':
                  return (
                    <>
                      <Colxx lg="1" xxs="1">
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="twitterStringCondition"
                          value={filter.twitterStringCondition}
                          onChange={handleSelectChange}
                          options={stringCondition}
                        />
                      </Colxx>
                      <Colxx lg="3" xxs="12">
                        <Input
                          name="twitterHandle"
                          value={filter.twitterHandle}
                          onChange={handleChange}
                        />
                      </Colxx>
                    </>
                  );
                case 'followerCount':
                  return (
                    <>
                      <Colxx lg="2" xxs="1">
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="followerCountCondition"
                          value={filter.followerCountCondition}
                          onChange={handleSelectChange}
                          options={numberCondition}
                        />
                      </Colxx>
                      {filter.followerCountCondition.value === 'inBetween' ? (
                        <>
                          <Colxx lg="2" xxs="6">
                            <Input
                              name="followerCount"
                              value={filter.followerCount}
                              onChange={handleChange}
                            />
                          </Colxx>
                          <Colxx lg="2" xxs="6">
                            <Input
                              name="followerCount1"
                              value={filter.followerCount1}
                              onChange={handleChange}
                            />
                          </Colxx>
                        </>
                      ) : (
                        <Colxx lg="3" xxs="6">
                          <Input
                            name="followerCount"
                            value={filter.followerCount}
                            onChange={handleChange}
                          />
                        </Colxx>
                      )}
                    </>
                  );
                case 'friendCount':
                  return (
                    <>
                      <Colxx lg="2" xxs="1">
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="friendCountCondition"
                          value={filter.friendCountCondition}
                          onChange={handleSelectChange}
                          options={numberCondition}
                        />
                      </Colxx>
                      {filter.friendCountCondition.value === 'inBetween' ? (
                        <>
                          <Colxx lg="2" xxs="6">
                            <Input
                              name="friendCount"
                              value={filter.friendCount}
                              onChange={handleChange}
                            />
                          </Colxx>
                          <Colxx lg="2" xxs="6">
                            <Input
                              name="friendCount1"
                              value={filter.friendCount1}
                              onChange={handleChange}
                            />
                          </Colxx>
                        </>
                      ) : (
                        <Colxx lg="3" xxs="6">
                          <Input
                            name="friendCount"
                            value={filter.friendCount}
                            onChange={handleChange}
                          />
                        </Colxx>
                      )}
                    </>
                  );
                case 'topics':
                  return (
                    <>
                      <Colxx lg="2" xxs="2">
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="topicsCondition"
                          value={filter.topicsCondition}
                          onChange={handleSelectChange}
                          options={topicsCondition}
                        />
                      </Colxx>
                      <Colxx lg="5" xss="6">
                        <TagsInput
                          value={filter.topics}
                          onChange={handleTopicsChange}
                          name="topics"
                          inputProps={{
                            placeholder: 'Add a topic',
                          }}
                        />
                      </Colxx>
                    </>
                  );
                case 'lastSeen':
                  return (
                    <>
                      <Colxx lg="2" xxs="1">
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="lastSeenCondition"
                          value={filter.lastSeenCondition}
                          onChange={handleSelectChange}
                          options={numberCondition}
                        />
                      </Colxx>
                      {filter.lastSeenCondition.value === 'inBetween' ? (
                        <>
                          <Colxx lg="3" xxs="6">
                            <DatePicker
                              selected={filter.startDate}
                              name="startDate"
                              onChange={handleStartDateChange}
                            />
                          </Colxx>
                          <Colxx lg="3" xxs="6">
                            <DatePicker
                              selected={filter.endDate}
                              name="endDate"
                              onChange={handleEndDateChange}
                            />
                          </Colxx>
                        </>
                      ) : (
                        <Colxx lg="3" xxs="6">
                          <DatePicker
                            selected={filter.startDate}
                            name="startDate"
                            onChange={handleStartDateChange}
                          />
                        </Colxx>
                      )}
                    </>
                  );
                case 'country':
                  return (
                    <Colxx lg="3" xxs="6">
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="selectedCountry"
                        value={filter.selectedCountry}
                        onChange={handleSelectChange}
                        options={countryData}
                        placeholder="Select a Country..."
                      />
                    </Colxx>
                  );
                default:
                  return <></>;
              }
            })()}
            {closeButton ? (
              <Colxx lg="1" className="col-right">
                <Button
                  className="btn calendar-prev-btn mr-1"
                  onClick={handleDeleteFilter(i)}
                >
                  <span className="simple-icon-arrow-left" />
                </Button>
              </Colxx>
            ) : (
              <></>
            )}
          </Row>
        </CardBody>
      </Card>
    </>
  ) : (
    <></>
  );
};

export default SingleFilterContainer;
