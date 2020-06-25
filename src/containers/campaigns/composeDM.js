import React, { useState } from 'react';
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

const ComposeDM = () => {
  const [linkCheck, setLinkCheck] = useState(false);

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>Compose DM</CardTitle>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">DM</InputGroupAddon>
            <Input type="textarea" name="text" />
          </InputGroup>
          <InputGroup className="mb-3">
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
            <UncontrolledDropdown addonType="prepend">
              <DropdownToggle caret outline color="secondary">
                Share Link
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem disabled>Custom Link</DropdownItem>
                <DropdownItem>Email Link</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Input disabled={!linkCheck} />
          </InputGroup>
        </CardBody>
      </Card>
    </>
  );
};

export default ComposeDM;
