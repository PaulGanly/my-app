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
    TableRow
} from "@lmig/lmds-react";
import './Dashboard.css';

export function Dashboard() {
    return (
        <div className={'top-padd'}>
            <GridRow gutterSize="fixed-16" gutters>
                <GridCol base={6} className={"padd-6"}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Card
                        elevation="raised"
                        title="Number of Unit tests">
                        <h2 className={'centered-text'}>632</h2>
                    </Card>
                </GridCol>
                <GridCol base={6}>
                    <Card
                        elevation="raised"
                        title="Number of Integration tests">
                        <h2 className={'centered-text'}>132</h2>
                    </Card>
                </GridCol>
            </GridRow>
            <GridRow gutterSize="fixed-16" gutters>
                <GridCol base={6} className={"padd-6"}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Card
                        elevation="raised"
                    >
                        <DataTable>
                            <Heading type="h4-bold">
                                Uncovered lines
                            </Heading>
                            <Table id="demo-table">
                                <TableHeader>
                                    <TableRow>
                                        <TableCell type="colHead">
                                            Project Name
                                        </TableCell>
                                        <TableCell type="colHead">
                                            Uncovered lines
                                        </TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            blah
                                        </TableCell>
                                        <TableCell>
                                            300
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            other
                                        </TableCell>
                                        <TableCell>
                                            50
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </DataTable>
                    </Card>
                </GridCol>
                <GridCol base={6}>
                    <Card
                        content="Use raised cards to draw attention to the content that's more important than the rest of the page."
                        elevation="raised"
                        title="Important content"
                    />
                </GridCol>
            </GridRow>
        </div>
    )
}