import React from "react";
import { BarChart, Bar, PieChart, Pie } from "recharts";
import {
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  RadialBarChart,
  RadialBar
} from "recharts";
import { AreaChart, Area } from "recharts";

const dataBar = [
  {
    name: "Sept 10",
    python: 4000,
    js: 2400,
    java: 2400,
  },
  {
    name: "Sept 11",
    python: 3000,
    js: 1398,
    java: 2210,
  },
  {
    name: "Sept 12",
    python: 2000,
    js: 9800,
    java: 2290,
  },
  {
    name: "Sept 13",
    python: 2780,
    js: 3908,
    java: 2000,
  },
  {
    name: "Sept 14",
    python: 1890,
    js: 4800,
    java: 2181,
  },
  {
    name: "Sept 15",
    python: 2390,
    js: 3800,
    java: 2500,
  },
  {
    name: "Sept 16",
    python: 3490,
    js: 4300,
    java: 2100,
  },
];

const dataPie = [
  { name: "Writing Code", value: 100 },
  { name: "Running Tests", value: 300 },
  { name: "Making Coffee", value: 100 },
];

const dataArea = [
  {
    name: "Sept 10",
    python: 4000,
    js: 2400,
    java: 2400,
  },
  {
    name: "Sept 11",
    python: 3000,
    js: 1398,
    java: 2210,
  },
  {
    name: "Sept 12",
    python: 2000,
    js: 9800,
    java: 2290,
  },
  {
    name: "Sept 13",
    python: 2780,
    js: 3908,
    java: 2000,
  },
  {
    name: "Sept 14",
    python: 1890,
    js: 4800,
    java: 2181,
  },
  {
    name: "Sept 15",
    python: 2390,
    js: 3800,
    java: 2500,
  },
  {
    name: "Sept 16",
    python: 3490,
    js: 4300,
    java: 2100,
  },
];
const dataArea2 = [
  {
    name: "Page A",
    python: 4000,
    js: 2400,
    java: 2400,
  },
  {
    name: "Page B",
    python: 3000,
    js: 1398,
    java: 2210,
  },
  {
    name: "Page C",
    python: 2000,
    js: 9800,
    java: 2290,
  },
  {
    name: "Page D",
    python: 2780,
    js: 3908,
    java: 2000,
  },
  {
    name: "Page E",
    python: 1890,
    js: 4800,
    java: 2181,
  },
  {
    name: "Page F",
    python: 2390,
    js: 3800,
    java: 2500,
  },
  {
    name: "Page G",
    python: 3490,
    js: 4300,
    java: 2100,
  },
];

const dataRadial = [
  {
    "name": "18-24",
    "uv": 31.47,
    "pv": 2400,
    "fill": "#8884d8"
  },
  {
    "name": "25-29",
    "uv": 26.69,
    "pv": 4567,
    "fill": "#83a6ed"
  },
 
]

export function ChartsBar() {
  return (
    <ResponsiveContainer width={"99%"} height={300}>
      <BarChart
        data={dataBar}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="js" stackId="a" fill="#8884d8" />
        <Bar dataKey="python" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ChartsArea() {
  return (
    <ResponsiveContainer width={"99%"} height={500}>
      <AreaChart
        width={500}
        height={400}
        data={dataArea}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="python"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="js"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="java"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function ChartsPie() {
  return (
    <ResponsiveContainer width={"99%"} height={'100%'} minHeight={75}>
      <PieChart>
        <Pie dataKey="value" data={dataPie} fill="#82ca9d" label />
      </PieChart>
    </ResponsiveContainer>
  );
}
