import React from "react";
import {
    Button,
    Card,
    DataTable,
    GridCol,
    GridRow,
    Heading,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow
} from "@lmig/lmds-react";

import './ExistingProject.css';
import {Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, Tooltip, XAxis, YAxis} from "recharts";
import {Link} from "@tanstack/react-router";

export function ExistingProject() {
    const data = [{date: 'Jan 23', uv: 100}, {date: 'Feb 23', uv: 300}, {date: 'Mar 23', uv: 400}];
    const pieData = [
        {name: 'Lines Covered', value: 400},
        {name: 'Uncovered Lines', value: 300},
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    // @ts-ignore
    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <div className={"detailsContainer"}>
            <GridRow gutterSize="fixed-16" gutters>
                <Card
                    elevation="raised"
                    title="Project Name">
                    <Button>Regenerate Unit Tests</Button>
                    <Button>Regenerate Integration Tests</Button>
                    <GridRow gutterSize="fixed-16" gutters>
                        <GridCol base={8} className={"padd-6"}>
                            <DataTable>
                                <Heading type="h4-bold">
                                    Unit tests
                                </Heading>
                                <Table id="demo-table">
                                    <TableHeader>
                                        <TableRow>
                                            <TableCell type="colHead">
                                                Class
                                            </TableCell>
                                            <TableCell type="colHead">
                                                Uncovered lines %
                                            </TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                ClassName
                                            </TableCell>
                                            <TableCell>
                                                10%
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                OtherClassName
                                            </TableCell>
                                            <TableCell>
                                                50%
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </DataTable>
                            <DataTable>
                                <Heading type="h4-bold">
                                    Integration tests
                                </Heading>
                                <Table id="demo-table">
                                    <TableHeader>
                                        <TableRow>
                                            <TableCell type="colHead">
                                                Class
                                            </TableCell>
                                            <TableCell type="colHead">
                                                Uncovered lines %
                                            </TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                ClassName
                                            </TableCell>
                                            <TableCell>
                                                10%
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                OtherClassName
                                            </TableCell>
                                            <TableCell>
                                                50%
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </DataTable>
                        </GridCol>
                        <GridCol base={4}>
                            <Card
                                elevation="raised">
                                <h5>No. of Tests</h5>
                                <AreaChart
                                    width={350}
                                    height={150}
                                    data={data}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8"/>
                                </AreaChart>
                                <h5>Code Coverage</h5>
                                <PieChart width={350} height={350}>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                        ))}
                                    </Pie>
                                </PieChart>
                            </Card>
                        </GridCol>
                    </GridRow>
                </Card>
            </GridRow>
        </div>
    );
}