import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Layout, Row, Col } from 'antd';
import DataSet from '@antv/data-set';
import {G2,Chart,Geom,Axis,Tooltip,Coord,Label,Legend,View,Guide,Shape,Facet, Util} from "bizcharts";

import {
  increment,
  decrement,
} from '../../modules/counter'

const { Header, Footer, Sider, Content } = Layout;
const { Text } = Guide;
    const text = [
      "MIDNIGHT",
      "3 AM",
      "6 AM",
      "9 AM",
      "NOON",
      "3 PM",
      "6 PM",
      "9 PM"
    ];
    const data = [];

    for (let i = 0; i < 24; i++) {
      const item = {};
      item.type = i + "";
      item.value = 10;
      data.push(item);
    }

    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "value",
      dimension: "type",
      as: "percent"
    });
    const userData = [
      {
        type: "React",
        value: 70
      },
      {
        type: "Angular",
        value: 10
      },
      {
        type: "Webpack",
        value: 10
      },
      {
        type: "Node",
        value: 40
      },
      {
        type: "Ant Design",
        value: 40
      },
      {
        type: "Biz Charts",
        value: 10
      },
      {
        type: "Material UI",
        value: 30
      },
      {
        type: "Bootstrap",
        value: 30
      }
    ];
    const userDv = new DataView();
    userDv.source(userData).transform({
      type: "percent",
      field: "value",
      dimension: "type",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          return (val * 100).toFixed(2) + "%";
        }
      }
    };
const Home = props => (
  <div>
      <Row type="flex">
        <Col span={6} value={100} style={{background:'rgb(218, 218, 218)'}}>
        <h1>Home</h1>
        <h2>Count: {props.count}</h2>

        <div>
          <Button type="primary" onClick={props.increment}>Increment</Button>
        </div>

        <div>
          <Button type="danger" onClick={props.decrement}>Decrement</Button>
        </div>

        <p>
          <button onClick={() => props.changePage()}>
            Go to about page via redux
          </button>
        </p>
        </Col>
        <Col span={18} value={100}>
          <Chart height={500} data={data} padding={40} forceFit>
            <Coord type="theta" radius={0.8} />
            <Tooltip showTitle={false} />
            <View data={dv}>
              <Coord type="theta" innerRadius={0.9} />
              <Geom
                type="intervalStack"
                position="percent"
                color={["type", ["rgba(255, 255, 255, 0)"]]}
                style={{
                  stroke: "#444",
                  lineWidth: 1
                }}
              />
              <Guide>
                <Text
                  position={["50%", "50%"]}
                  content="24 hours"
                  style={{
                    lineHeight: "240px",
                    fontSize: "48",
                    fill: "#262626",
                    textAlign: "center"
                  }}
                />
              </Guide>
            </View>
            <View data={data}>
              <Coord type="polar" innerRadius={0.9} />
              <Geom
                type="interval"
                position="type*value"
                color="#444"
                size={[
                  "type",
                  function(val) {
                    if (val % 3 === 0) {
                      return 4;
                    } else {
                      return 0;
                    }
                  }
                ]}
                style={{
                  stroke: "#444",
                  lineWidth: 1
                }}
              >
                <Label
                  content={[
                    "type",
                    function(val) {
                      if (val % 3 === 0) {
                        return text[val / 3];
                      }

                      return "";
                    }
                  ]}
                  offset={15}
                  textStyle={{
                    fontSize: 12,
                    fontWeight: "bold",
                    fill: "#bfbfbf"
                  }}
                />
              </Geom>
              <Guide>
                <Text
                  position={["50%", "50%"]}
                  content="24 hours"
                  style={{
                    lineHeight: "240px",
                    fontSize: "48",
                    fill: "#609064",
                    textAlign: "center"
                  }}
                />
              </Guide>
            </View>
            <View data={userDv} scale={cols}>
              <Coord type="theta" innerRadius={0.75} />
              <Geom type="intervalStack" position="percent" color={"type"}>
                <Label content="type" offset={40} />
              </Geom>
            </View>
          </Chart>
        </Col>
      </Row>
  </div>
)

const mapStateToProps = ({ counter }) => ({
  count: counter.count,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      decrement,
      changePage: () => push('/about-us')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
