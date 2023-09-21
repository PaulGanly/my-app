import React, {useEffect, useState} from "react";
import {RepoDetails} from "../../models/Repo";
import {octokit} from "../../utils/octokit";
import {
    Button,
    GridCol,
    GridRow,
    LoadingSpinner,
    Modal,
    ModalBody,
} from "@lmig/lmds-react";

import './ProjectCard.css';
import StepWizard from "react-step-wizard";
import {StepSelectTestType} from "../step-select-test-type/StepSelectTestType";
import {StepSelectCodeToTest} from "../step-select-code-to-test/StepSelectCodeToTest";
import {StepSelectOpenapiSpec} from "../step-select-openapi-spec/StepSelectOpenapiSpec";
import {StepSelectUnitTest} from "../step-select-unit-test/StepSelectUnitTest";
import {StepSelectRunUnitTests} from "../step-select-run-unit-tests/StepSelectRunUnitTests";
import {StepSelectCommitCode} from "../step-select-commit-code/StepSelectCommitCode";



function Step5(props: any) {
    const [isCommitting, setIsCommitting] = useState(true);

    setTimeout(() => setIsCommitting(false), 5000);

    return (<div>
        <ModalBody>
            {!isCommitting ?
                <div className={'loading-container'}><h2 className={'loading-text'}>Changes committed!</h2></div> :
                <div className={'loading-container'}><LoadingSpinner className={'loading-spinner'} color="blue"
                                                                     hiddenTrack size="64"/><h2
                    className={'loading-text'}>Committing Changes</h2></div>}
        </ModalBody>
    </div>);
}

export function ProjectCard(props: any) {
    const [languages, setLanguages] = useState<any[]>([]);
    const [isOpen, setIsOpen] = React.useState(false);

    const repo = props.repo as RepoDetails;

    useEffect(() => {
        async function onLoad() {
            await octokit.request(`GET ${repo.languages_url}`, {
                headers: {
                    "x-github-api-version": "2022-11-28",
                },
            })
                .then(res => {
                    console.log(res)
                    setLanguages(res.data)
                })
                .catch(err => console.log(err));
        }

        onLoad();
    }, [])

    function sortLanguages() {
        const sortedLanguages = Object.entries(languages)
            .sort(([, valueA], [, valueB]) => valueB - valueA)
            .slice(0, 3)
            .reduce((obj, [key, value]) => ({...obj, [key]: value}), {});
        console.log(sortedLanguages)
        return Object.keys(sortedLanguages);
    }

    const renderLanguages = () => {
        const ul: any[] = []
        const sortedLanguages = sortLanguages();
        sortedLanguages.forEach(language => {
            ul.push(<li key={language}>{language}</li>)
        })
        return ul;
    };

    return (
        <div className="lm-Card lm-Card--flat project-card">
            <div className="">
                <h2 className="lm-Card-title">{repo.name}</h2>
                <div className="lm-Card-body">
                    <GridRow>
                        <GridCol base={9} className={"padd-6"}>
                            <p className="lm-Card-content">{repo.description || 'A description of this project'}</p>
                            <p className="lm-Card-content">
                                <ul className={'languageList'}>{renderLanguages()}</ul>
                            </p>
                        </GridCol>
                        <GridCol base={3}>
                            <Button onClick={() => setIsOpen(!isOpen)}>
                                Import Project
                            </Button>
                        </GridCol>
                    </GridRow>

                </div>
            </div>
            <Modal className={'noGrid'} isOpen={isOpen} onClose={() => setIsOpen(false)} size="large">
                <StepWizard isLazyMount={true}>
                    <StepSelectTestType name={repo.name}/>
                    <StepSelectCodeToTest name={repo.name} language={sortLanguages()[0]}
                                          buildType={sortLanguages()[0] == 'Java' ? 'Maven' : 'NPM'}/>
                    <StepSelectOpenapiSpec name={repo.name} language={sortLanguages()[0]}
                                           buildType={sortLanguages()[0] == 'Java' ? 'Maven' : 'NPM'}/>
                    <StepSelectUnitTest/>
                    <StepSelectRunUnitTests/>
                    <StepSelectCommitCode/>
                </StepWizard>

            </Modal>
        </div>
    );
}