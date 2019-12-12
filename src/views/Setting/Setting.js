import React, { Component, lazy, Suspense, useState } from 'react';
import {
  Col,
  Row,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { AppSwitch } from '@coreui/react'

export default () => {
  const [isAuto, setAuto] = useState(true)
  const [isOpen, setOpen] = useState(false)

  const toggleAuto = () => setAuto(!isAuto)
  const toggleOpen = () => setOpen(!isOpen)

  return (
    <div className="animated fadeIn">
      <Row>
        <Col>
          <h1>Setting</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <ListGroup>
            <ListGroupItem>
              Auto open air purifier when PM2.5 level reach the threshold
                <AppSwitch className="float-right" label color="success" onClick={toggleAuto} checked={isAuto} />
            </ListGroupItem>
            <ListGroupItem>
              Open air purifier manually
                <AppSwitch className="float-right" label color="success" onClick={toggleOpen} disabled={isAuto} checked={isOpen} />
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}
