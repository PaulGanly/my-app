import React, {useState} from "react";
import {
    Button,
    GridCol,
    GridRow, Heading, IconButton, IconEdit,
    LoadingSpinner,
    ModalBody,
    ModalFooter, Toggle
} from "@lmig/lmds-react";
import './StepSelectRunUnitTests.css';
import {Highlight, themes} from "prism-react-renderer";

export function StepSelectRunUnitTests(props: any) {
    const [isHide, setIsHide] = useState(true);

    setTimeout(() => setIsHide(false), 5000);

    return (<div>
        <Heading tag="span" type="h3-light">Running Generated Tests</Heading>
        <ModalBody>
            <h2>Running Unit Tests</h2>
        </ModalBody>
        <ModalFooter>
            <GridRow gutterSize="fixed-16" gutters>
                <GridCol base={6}>
                    <Button dynamicWidth onClick={() => props.previousStep()}>
                        Back
                    </Button>
                </GridCol>
                <GridCol base={6}>
                    <Button dynamicWidth variant="primary" onClick={() => props.goToStep(6)}>
                        Continue
                    </Button>
                </GridCol>
            </GridRow>
        </ModalFooter>
    </div>);
}