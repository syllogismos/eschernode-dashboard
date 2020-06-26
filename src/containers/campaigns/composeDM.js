import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

const dropdownOptions = ['Escher', 'Custom'];
const ComposeDM = ({
  dm,
  setDM,
  linkCheck,
  setLinkCheck,
  selectedDropdown,
  setSelectedDropdown,
  text,
  setText,
  url,
  setURL,
}) => {
  // const [linkCheck, setLinkCheck] = useState(false);
  // const [selectedDropdown, setSelectedDropdown] = useState('Escher');
  // const [text, setText] = useState('');
  // const [url, setURL] = useState('');
  function handleTextChange(evt) {
    setText(evt.target.value);
  }
  function handleUrlChange(evt) {
    setURL(evt.target.value);
  }

  useEffect(() => {
    switch (selectedDropdown) {
      case 'Escher':
        setURL('http://eschernode.com');
        break;
      case 'Custom':
        setURL('');
        break;
      default:
        break;
    }
  }, [selectedDropdown, setURL]);

  useEffect(() => {
    setDM(linkCheck ? `${text} ${url}` : text);
  }, [text, url, linkCheck, setDM]);

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>Compose DM</CardTitle>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">Text</InputGroupAddon>
            <Input
              type="textarea"
              name="text"
              value={text}
              onChange={handleTextChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">URL</InputGroupAddon>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <Input
                  addon
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  onChange={() => setLinkCheck((l) => !l)}
                />
              </InputGroupText>
            </InputGroupAddon>
            <UncontrolledDropdown addonType="prepend" disabled={!linkCheck}>
              <DropdownToggle caret outline color="primary">
                {selectedDropdown}
              </DropdownToggle>
              <DropdownMenu>
                {dropdownOptions.map((option, index) => {
                  return (
                    <DropdownItem
                      key={index}
                      onClick={() => setSelectedDropdown(option)}
                    >
                      {option}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
            <Input
              disabled={!linkCheck || selectedDropdown === 'Escher'}
              value={url}
              onChange={handleUrlChange}
            />
            {/* <InputGroupAddon addonType="append">
              <Button>Go</Button>
            </InputGroupAddon> */}
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">DM</InputGroupAddon>
            <Input disabled type="textarea" name="dmtext" value={dm} />
          </InputGroup>
        </CardBody>
      </Card>
    </>
  );
};

export default ComposeDM;
