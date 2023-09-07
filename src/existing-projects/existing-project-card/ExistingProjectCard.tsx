import React, {useEffect, useState} from "react";
import {RepoDetails} from "../../models/Repo";
import {octokit} from "../../utils/octokit";
import {
    Accordion,
    AccordionTab,
    Button, Checkbox, CheckboxGroup,
    FieldGroup,
    Form,
    GridCol,
    GridRow,
    Heading,
    IconButton,
    IconEdit,
    IconFolder,
    LoadingSpinner,
    Modal,
    ModalBody,
    ModalFooter,
    Select,
    SelectOption,
    Toggle
} from "@lmig/lmds-react";

import './ExistingProjectCard.css';

export function ExistingProjectCard(props: any) {
    const [isOpen, setIsOpen] = React.useState(false);
    const repo = props.repo as RepoDetails;

    function getRandomDate(from: string, to: string) {
        const date1 = new Date(from);
        const date2 =new Date(to)
        const fromTime = date1.getTime();
        const toTime = date2.getTime();
        return Intl.DateTimeFormat("en", {
            year: "numeric",
            day: "2-digit",
            month: "long",
        }).format(new Date(fromTime + Math.random() * (toTime - fromTime)));
    }

    return (
        <div className="lm-Card lm-Card--flat project-card">
            <div className="">
                <h2 className="lm-Card-title">{repo.name}</h2>
                <div className="lm-Card-body">
                    <GridRow>
                        <GridCol base={9} className={"padd-6"}>
                            <p className="lm-Card-content">{repo.description || 'A description of this project'}</p>
                            <GridRow>
                                <GridCol base={6} className={"padd-6"}>
                                    Latest Commit: {getRandomDate("2023-07-01", "2023-08-01")}
                                </GridCol>
                                <GridCol base={6} className={"padd-6"}>
                                    Last Test Generation: {getRandomDate("2023-08-01", "2023-08-22")}
                                </GridCol>
                            </GridRow>
                        </GridCol>
                        <GridCol base={3}>
                            <Button onClick={() => setIsOpen(!isOpen)}>
                                Edit Tests
                            </Button>
                        </GridCol>
                    </GridRow>

                </div>
            </div>
        </div>
    );
}