import React, {useEffect, useState} from "react";
import {
    Button,
    FieldGroup,
    Form,
    GridCol,
    GridRow,
    Heading,
    ModalBody,
    ModalFooter, Radio, RadioGroup, Textarea
} from "@lmig/lmds-react";

import './StepSelectOpenapiSpec.css';
import useCloneRepo from "../../hooks/cloneRepo";
import {RepoExplorer} from "../repo-explorer/RepoExplorer";

export function StepSelectOpenapiSpec(props: any) {
    const {repoFiles} = useCloneRepo(props.buildType, props.name);
    const [importType, setImportType] = useState('');

    const onChangeImportType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImportType(e.currentTarget.value);
    };

    return (
        <div>
            <Heading tag="span" type="h3-light">Importing <b>{props.name}</b></Heading>
            <ModalBody>
                <Form id="form--default">
                    <FieldGroup
                        id="fieldgroup--default"
                        labelA11y="Choose a number."
                        labelVisual="Choose how you want to import the OpenAPI spec"
                    >
                        <RadioGroup name="RadioGroup--default" onChange={onChangeImportType}>
                            <Radio id="one--default" labelVisual="From Repository" value="repo" />
                            <Radio id="two--default" labelVisual="Paste JSON" value="json" />
                        </RadioGroup>
                    </FieldGroup>

                    <hr/>

                    {importType == '' ? <div></div> : importType == 'repo' ?
                        <RepoExplorer name={props.name} buildType={props.buildType}/> :
                        <div>
                            <Textarea
                                labelVisual="JSON OpenAPI Spec"
                            />
                        </div>
                    }
                </Form>
            </ModalBody>
            <ModalFooter>
                <GridRow gutterSize="fixed-16" gutters>
                    <GridCol base={6}>
                        <Button dynamicWidth variant="secondary" onClick={() => props.goToStep(1)}>
                            Back
                        </Button>
                    </GridCol>
                    <GridCol base={6}>
                        <Button dynamicWidth variant="primary" onClick={() => props.goToStep(2)}>
                            Continue
                        </Button>
                    </GridCol>
                </GridRow>
            </ModalFooter>
        </div>)
}