import React from "react";
import {
    Accordion,
    AccordionTab,
    Button, Card,
    Checkbox,
    Form,
    GridCol,
    GridRow,
    Heading,
    IconFolder,
    IconSuccessAlert,
    List,
    ListItem,
    LoadingSpinner,
    ModalBody,
    ModalFooter
} from "@lmig/lmds-react";
import unitTestImg from './images/unit-test.png';
import integrationTestImg from './images/integration-test.png';
import './StepSelectTestType.css';
import useCloneRepo from "../../hooks/cloneRepo";

export function StepSelectTestType(props: any) {
    const {repoFiles} = useCloneRepo(props.buildType, props.name);
    return (
        <div>
            <Heading tag="span" type="h3-light">Importing <b>{props.name}</b></Heading>
            <ModalBody>
                <div className={"marginBottom"}>Please select the type of tests you wish to generate</div>
                <Form id="form--default">
                    <GridRow gutterSize="fixed-16" gutters className={"cardRow"}>
                        <Card className={"selectCard"}>
                            <GridRow gutterSize="fixed-16" gutters>
                                <GridCol base={8}>
                                    <GridRow gutters>
                                        <GridCol base={4}>
                                            <img className={"imageSize"} src={unitTestImg} />
                                        </GridCol>
                                        <GridCol base={8} className={"centreItemsVert"}>
                                            <h2>Unit Tests</h2>
                                        </GridCol>
                                    </GridRow>
                                </GridCol>
                                <GridCol base={4} className={"centreItemsVert"}>
                                    <Button dynamicWidth variant="primary" onClick={() => props.goToStep(2)}>
                                        Select
                                    </Button>
                                </GridCol>
                            </GridRow>
                        </Card>
                    </GridRow>
                    <GridRow gutterSize="fixed-16" gutters className={"cardRow"}>
                        <Card className={"selectCard"}>
                            <GridRow gutterSize="fixed-16" gutters>
                                <GridCol base={8}>
                                    <GridRow gutters>
                                        <GridCol base={4}>
                                            <img className={"integrationImageSize"} src={integrationTestImg} />
                                        </GridCol>
                                        <GridCol base={8} className={"centreItemsVert"}>
                                            <h2>Integration Tests</h2>
                                        </GridCol>
                                    </GridRow>
                                </GridCol>
                                <GridCol base={4} className={"centreItemsVert"}>
                                    <Button dynamicWidth variant="primary" onClick={() => props.goToStep(3)}>
                                        Select
                                    </Button>
                                </GridCol>
                            </GridRow>
                        </Card>
                    </GridRow>
                </Form>
            </ModalBody>
        </div>)
}