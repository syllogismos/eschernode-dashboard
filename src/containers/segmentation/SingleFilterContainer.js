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
  { label: 'All Followers', value: 'allFollowers', key: 0 },
  { label: 'Twitter Handle', value: 'twitterHandle', key: 1 },
  { label: 'Follower Count', value: 'followerCount', key: 2 },
  { label: 'Friend Count', value: 'friendCount', key: 3 },
  { label: 'Topics', value: 'topics', key: 4 },
  { label: 'Last Seen', value: 'lastSeen', key: 5 },
  { label: 'From Country', value: 'country', key: 6 },
  // { label: 'Prioritise By', value: 'prioritiseBy', key: 7 },
  { label: 'User Flag', value: 'flag', key: 8 },
];

const flagOptions = [
  { label: 'Verified', value: 'verified', key: 0 },
  { label: 'Muted By You', value: 'muting', key: 1 },
];

const flagConditions = [
  { label: 'Is', value: 'is', key: 0 },
  { label: 'Is Not', value: 'not', key: 1 },
];

const countryData = [
  { label: 'United States', value: 'us', key: 0 },
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
  { label: 'And', value: 'and', key: 0 },
  { label: 'Or', value: 'or', key: 1 },
];

const prioritiseOptions = [
  { label: 'Follow Order', value: 'followOrder', key: 0 },
  { label: 'Follow Count', value: 'followCount', key: 1 },
  { label: 'Friend Count', value: 'friendCount', key: 2 },
];

const prioritiseConditions = [
  { label: 'Descending', value: 'desc', key: 0 },
  { label: 'Ascending', valud: 'asc', key: 1 },
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
    i,
    filters,
    setFilters,
    closeButton,
    handleDeleteFilter,
    updateFiltersState,
  } = props;
  function handleSelectChange(evt, target) {
    const value = evt;
    let f = filters[i];
    f = { ...f, [target.name]: value };
    filters[i] = f;
    setFilters(filters);
    setFilter(f);
    updateFiltersState();
  }

  function handleChange(evt) {
    const { value } = evt.target;
    let f = filters[i];
    f = { ...f, [evt.target.name]: value };
    filters[i] = f;
    setFilters(filters);
    setFilter(f);
    updateFiltersState();
  }

  function handleTopicsChange(e) {
    let f = filters[i];
    f = { ...f, topics: e };
    filters[i] = f;
    setFilters(filters);
    setFilter(f);
    updateFiltersState();
  }

  function handleStartDateChange(e) {
    let f = filters[i];
    f = { ...f, startDate: e };
    filters[i] = f;
    setFilters(filters);
    setFilter(f);
    updateFiltersState();
  }
  function handleEndDateChange(e) {
    let f = filters[i];
    f = { ...f, endDate: e };
    filters[i] = f;
    setFilters(filters);
    setFilter(f);
    updateFiltersState();
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
            <Colxx lg="3" xxs="12" className="mb-1">
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
                case 'allFollowers':
                  return <></>;
                case 'twitterHandle':
                  return (
                    <>
                      <Colxx lg="1" xxs="6" className="mb-1">
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
                      <Colxx lg="3" xxs="12" className="mb-1">
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
                      <Colxx lg="2" xxs="6" className="mb-1">
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
                          <Colxx lg="2" xxs="6" className="mb-1">
                            <Input
                              name="followerCount"
                              value={filter.followerCount}
                              onChange={handleChange}
                            />
                          </Colxx>
                          <Colxx lg="2" xxs="6" className="mb-1">
                            <Input
                              name="followerCount1"
                              value={filter.followerCount1}
                              onChange={handleChange}
                            />
                          </Colxx>
                        </>
                      ) : (
                        <Colxx lg="3" xxs="6" className="mb-1">
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
                      <Colxx lg="2" xxs="6" className="mb-1">
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
                          <Colxx lg="2" xxs="6" className="mb-1">
                            <Input
                              name="friendCount"
                              value={filter.friendCount}
                              onChange={handleChange}
                            />
                          </Colxx>
                          <Colxx lg="2" xxs="6" className="mb-1">
                            <Input
                              name="friendCount1"
                              value={filter.friendCount1}
                              onChange={handleChange}
                            />
                          </Colxx>
                        </>
                      ) : (
                        <Colxx lg="3" xxs="6" className="mb-1">
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
                      <Colxx lg="2" xxs="4" className="mb-1">
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
                      <Colxx lg="5" xss="6" className="mb-1">
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
                      <Colxx lg="2" xxs="6" className="mb-1">
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
                          <Colxx lg="3" xxs="6" className="mb-1">
                            <DatePicker
                              selected={filter.startDate}
                              name="startDate"
                              onChange={handleStartDateChange}
                            />
                          </Colxx>
                          <Colxx lg="3" xxs="6" className="mb-1">
                            <DatePicker
                              selected={filter.endDate}
                              name="endDate"
                              onChange={handleEndDateChange}
                            />
                          </Colxx>
                        </>
                      ) : (
                        <Colxx lg="3" xxs="6" className="mb-1">
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
                    <Colxx lg="3" xxs="12" className="mb-1">
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
                case 'prioritiseBy':
                  return (
                    <>
                      <Colxx lg="3" xxs="6" className="mb-1">
                        <Select
                          component={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="prioritiseBy"
                          value={filter.prioritiseBy}
                          onChange={handleSelectChange}
                          options={prioritiseOptions}
                        />
                      </Colxx>
                      <Colxx lg="2" xxs="4" className="mb-1">
                        <Select
                          component={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="prioritiseCondition"
                          value={filter.prioritiseCondition}
                          onChange={handleSelectChange}
                          options={prioritiseConditions}
                        />
                      </Colxx>
                    </>
                  );
                case 'flag':
                  return (
                    <>
                      <Colxx lg="2" xxs="4" className="mb-1">
                        <Select
                          component={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="flagCondition"
                          value={filter.flagCondition}
                          onChange={handleSelectChange}
                          options={flagConditions}
                        />
                      </Colxx>
                      <Colxx lg="3" xxs="6" className="mb-1">
                        <Select
                          component={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="flagOption"
                          value={filter.flagOption}
                          onChange={handleSelectChange}
                          options={flagOptions}
                        />
                      </Colxx>
                    </>
                  );
                default:
                  return <></>;
              }
            })()}
            {closeButton ? (
              <Colxx lg="1" className="col-right" className="mb-1">
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
