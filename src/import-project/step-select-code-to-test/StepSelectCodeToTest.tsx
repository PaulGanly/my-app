import React from "react";
import {
    Button,
    Form,
    GridCol,
    GridRow,
    Heading,
    IconSuccessAlert,
    List,
    ListItem,
    ModalBody,
    ModalFooter
} from "@lmig/lmds-react";

import './StepSelectCodeToTest.css';
import useCloneRepo from "../../hooks/cloneRepo";
import {RepoExplorer} from "../repo-explorer/RepoExplorer";

export function StepSelectCodeToTest(props: any) {
    const {repoFiles} = useCloneRepo(props.buildType, props.name);
    return (
        <div>
            <Heading tag="span" type="h3-light">Importing <b>{props.name}</b></Heading>
            <ModalBody>
                <Form id="form--default">
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <List icon={<IconSuccessAlert color="positive"/>}>
                        <ListItem>
                            The primary programming language has been identified as <b>{props.language}</b>
                        </ListItem>
                        <ListItem>
                            Dependency management is handled by <b>{props.buildType}</b>
                        </ListItem>
                    </List>
                    <hr/>

                    <RepoExplorer name={props.name}  buildType={props.buildType}/>
                </Form>
            </ModalBody>
            <ModalFooter>
                <GridRow gutterSize="fixed-16" gutters>
                    <GridCol base={6}>
                        <Button dynamicWidth onClick={() => props.previousStep()}>
                            Back
                        </Button>
                    </GridCol>
                    <GridCol base={6}>
                        <Button dynamicWidth variant="primary" onClick={() => props.goToStep(4)}>
                            Continue
                        </Button>
                    </GridCol>
                </GridRow>
            </ModalFooter>
        </div>)
}