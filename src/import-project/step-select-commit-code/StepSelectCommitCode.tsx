import React, {useState} from "react";
import {Button, GridCol, GridRow, Heading, LoadingSpinner, ModalBody, ModalFooter, Textarea,} from "@lmig/lmds-react";
import './StepSelectCommitCode.css';

export function StepSelectCommitCode(props: any) {
    const [isCommitting, setIsCommitting] = useState(false);

    return (<div>
        <Heading tag="span" type="h3-light">Committing changes to <b>{props.branchName}</b></Heading>
        <ModalBody>
            <div>
                <Textarea
                    defaultValue="Updating Auto AI tests"
                    labelVisual="Commit Message"
                />
            </div>
            {!isCommitting ?
                <div></div> :
                <CommittingOutput/>}
        </ModalBody>
        <ModalFooter>
            <GridRow gutterSize="fixed-16" gutters>
                <GridCol base={6}>
                    <Button dynamicWidth onClick={() => props.previousStep()}>
                        Back
                    </Button>
                </GridCol>
                <GridCol base={6}>
                    <Button dynamicWidth variant="primary" onClick={() => setIsCommitting(true)}>
                        Commit and Raise Pull Request
                    </Button>
                </GridCol>
            </GridRow>
        </ModalFooter>
    </div>);
}

function CommittingOutput() {
    const [isCommitting, setIsCommitting] = useState(true);
    setTimeout(() => setIsCommitting(false), 5000);

    return (
        <div>
            {
                !isCommitting ?
                    <div className={'loading-container'}><h2 className={'loading-text'}>Changes committed!</h2></div> :
                    <div className={'loading-container'}>
                        <LoadingSpinner className={'loading-spinner'} color="blue" hiddenTrack size="64"/>
                        <h2 className={'loading-text'}>Committing Changes</h2>
                    </div>
            }
        </div>
    );
}