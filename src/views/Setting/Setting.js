import React, { useState, useEffect } from 'react';
import {
  Col,
  Row,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import { fetchFanState, toggleAuto, toggleFan } from '../../api/dashboard'

export default () => {
  const [isAuto, setAuto] = useState(false)
  const [isOpen, setOpen] = useState(false)

  const toggleAutoState = () => {
    toggleAuto()
      .then(() => setAuto(!isAuto))
  }
  const toggleOpenState = () => {
    toggleFan()
      .then(() => setOpen(!isOpen))
  }

  useEffect(() => {
    fetchFanState().then(fanState => {
      if (fanState === 'auto') setAuto(true)
      else setOpen(fanState)
    })
  }, [])

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
              Auto mode
                <AppSwitch className="float-right" label color="success" onClick={toggleAutoState} checked={isAuto} />
            </ListGroupItem>
            <ListGroupItem>
              Open air purifier manually
                <AppSwitch className="float-right" label color="success" onClick={toggleOpenState} disabled={isAuto} checked={isOpen} />
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}
