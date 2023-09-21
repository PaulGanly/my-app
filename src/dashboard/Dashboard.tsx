import React from "react";
import {
  Card,
  DataTable,
  GridCol,
  GridRow,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@lmig/lmds-react";
import "./Dashboard.css";
import { ChartsBar, ChartsArea, ChartsPie } from "./charts/Charts";

export function Dashboard() {
  return (
    <div className={"top-padd"}>
      <GridRow gutterSize="fixed-16" gutters>
        <GridCol base={6} className={"padd-6"}>
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <Card elevation="raised" title="Number of Tests">
            <Heading align="center" type="h1-bold">632</Heading>
          </Card>
        </GridCol>
        <GridCol base={6}>
          <Card elevation="raised" title="Time Saved">
          <ChartsPie/>
          </Card>
        </GridCol>
      </GridRow>
      <GridRow gutterSize="fixed-16" gutters>
        <GridCol base={12} className={"padd-6"}>
          <Card elevation="raised" title="Test Generated This Week">
            <ChartsArea />
          </Card>
        </GridCol>
      </GridRow>
      <GridRow gutterSize="fixed-16" gutters>
        <GridCol base={6} className={"padd-6"}>
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <Card elevation="raised" title="Lines of Code Generated">
            <Heading align="center" type="h1-bold">1016</Heading>
          </Card>
        </GridCol>
        <GridCol base={6}>
          <Card elevation="raised" title="Number of Integration tests">
            <Heading align="center" type="h1-bold">56</Heading>
          </Card>
        </GridCol>
      </GridRow>
      <GridRow gutterSize="fixed-16" gutters>
        <GridCol base={12}>
          <Card elevation="raised" title="Hello Liam">
            <ChartsBar />
          </Card>
        </GridCol>
      </GridRow>
      <GridRow gutterSize="fixed-16" gutters>
        <GridCol base={12} className={"padd-6"}>
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <Card elevation="raised">
            <DataTable>
              <Heading type="h4-light">Uncovered lines</Heading>
              <Table id="demo-table">
                <TableHeader>
                  <TableRow>
                    <TableCell type="colHead">Project Name</TableCell>
                    <TableCell type="colHead">Uncovered lines</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>financial-billing-api</TableCell>
                    <TableCell>47</TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell>policy-communications-cdk</TableCell>
                    <TableCell>50</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </DataTable>
          </Card>
        </GridCol>
      </GridRow>
    </div>
  );
}
