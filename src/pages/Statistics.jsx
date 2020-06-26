import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card } from "antd";
import * as ApiClient from "../helpers/ApiClient";
import moment from "moment";
import { Typography } from "antd";
const { Title } = Typography;
const Statistics = () => {
  const [data, setData] = useState();
  const token = localStorage.getItem("_token");
  const fetchData = async () => {
    const _data = await ApiClient.ApiGet("statistics", token);
    console.log("_data", _data);
    const data = _data.data.map((item) => {
      const newDate = moment(item.date).format("DD/MM/YYYY");

      return { ...item, date: newDate };
    });
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div align="center">
      <Title>Thống kê doanh thu</Title>
      <Card
        style={{ width: window.screen.width - 300 }}
        title="Thống kê doanh thu theo từng ngày"
      >
        <LineChart
          width={window.screen.width - 400}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 50,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="phoneAmount"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="laptopAmount" stroke="#82ca9d" />
          <Line type="monotone" dataKey="accessoriesAmount" stroke="#FF7F50" />
        </LineChart>
      </Card>
    </div>
  );
};
export default Statistics;
