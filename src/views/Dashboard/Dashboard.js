import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import { fetchData } from '../../api/dashboard'
import moment from 'moment'

// const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
// const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

// Main Chart
const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function (tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: true,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          // maxTicksLimit: 5,
          stepSize: Math.ceil(30 / 5),
          max: 30,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

const Dashboard = () => {
  const [pm25, setPm25] = useState([])
  const [pm10, setPm10] = useState([])
  const [labels, setLabels] = useState([])

  const getData = () => {
    fetchData(50).then(data => {
      let newPm25 = [], newPm10 = [], newLabels = []
      for (let i in data) {
        newPm25.push(data[i].pm25)
        newPm10.push(data[i].pm10)
        newLabels.push(moment(data[i].timestamp).format('H:mm:ss'))
      }
      setPm25(newPm25.reverse())
      setPm10(newPm10.reverse())
      setLabels(newLabels.reverse())
    })
  }

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useEffect(() => getData(), [])

  useInterval(() => getData(), 3000)

  const mainChart = {
    labels,
    datasets: [
      {
        label: 'PM 2.5',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: pm25,
      },
      {
        label: 'PM 10',
        backgroundColor: 'transparent',
        borderColor: brandSuccess,
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: pm10,
      },
      {
        label: 'Threshold',
        backgroundColor: 'transparent',
        borderColor: brandDanger,
        pointHoverBackgroundColor: '#fff',
        borderWidth: 1,
        borderDash: [8, 5],
        data: Array(50).fill(18),
      },
    ],
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col>
          <h1>FooFoo Smart Air Purifier</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <CardBody>
              <Row>
                <Col sm="5">
                  <CardTitle className="mb-0">PM 2.5</CardTitle>
                  <div className="small text-muted">Recent PM 2.5 Level</div>
                </Col>
                {/* <Col sm="7" className="d-none d-sm-inline-block">
                    <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>
                    <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                      <ButtonGroup className="mr-3" aria-label="First group">
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>5 Min</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>30 Min</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>1 Hr</Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col> */}
              </Row>
              <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                <Line data={mainChart} options={mainChartOpts} height={300} />
              </div>
            </CardBody>
            {/* <CardFooter>
                <Row className="text-center">
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Average PM2.5</div>
                    <strong>29.703 (40%)</strong>
                    <Progress className="progress-xs mt-2" color="success" value="40" />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <div className="text-muted">CPU Usage</div>
                    <strong>24.093 (20%)</strong>
                    <Progress className="progress-xs mt-2" color="info" value="20" />
                  </Col>
                </Row>
              </CardFooter> */}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
