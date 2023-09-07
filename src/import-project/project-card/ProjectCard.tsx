import React, {useEffect, useState} from "react";
import {RepoDetails} from "../../models/Repo";
import {octokit} from "../../utils/octokit";
import {
    Accordion,
    AccordionTab,
    Button,
    Checkbox,
    Form,
    GridCol,
    GridRow,
    Heading,
    IconButton,
    IconEdit,
    IconFolder,
    IconSuccessAlert,
    List,
    ListItem,
    LoadingSpinner,
    Modal,
    ModalBody,
    ModalFooter,
    Toggle
} from "@lmig/lmds-react";

import './ProjectCard.css';
import StepWizard from "react-step-wizard";
import {Highlight, themes} from "prism-react-renderer";
import useCloneRepo from "../../hooks/cloneRepo";

function Step1(props: any) {
    const {repoFiles} = useCloneRepo(props.buildType, props.name);
    return <div>
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

                {!repoFiles ?
                    <div className={'loading-container'}>
                        <LoadingSpinner className={'loading-spinner'} color="blue" hiddenTrack size="64"/>
                        <h2 className={'loading-text'}>Contacting Liberty GPT...</h2>
                    </div> :
                    <div>
                        <Accordion as="div">
                            <AccordionTab active={true} labelVisual="Select code to test">
                                {
                                    repoFiles.dirs.map((directory: IDir) => {
                                        return (
                                            <AccordionTab icon={<IconFolder/>} labelVisual={directory.name}>
                                                {directory.files.map((file) => (
                                                    <Checkbox className='left-padd' id="one--default" labelVisual={file} name="default"
                                                              value={file} defaultChecked={true}/>
                                                ))}
                                            </AccordionTab>
                                        )
                                    })
                                }
                                {repoFiles.files.map((file) => (
                                    <Checkbox className='left-padd' id="one--default" labelVisual={file} name="default" value={file} defaultChecked={true}/>
                                ))}
                            </AccordionTab>
                        </Accordion>
                    </div>
                }
            </Form>
        </ModalBody>
        <ModalFooter>
            <GridRow gutterSize="fixed-16" gutters>
                <GridCol base={12} md={6}>
                </GridCol>
                <GridCol base={12} md={6}>
                    <Button dynamicWidth variant="primary" onClick={() => props.goToStep(2)}>
                        Continue
                    </Button>
                </GridCol>
            </GridRow>
        </ModalFooter>
    </div>
        ;
}

function Step2(props: any) {
    const [isHide, setIsHide] = useState(true);

    setTimeout(() => setIsHide(false), 5000);

    const codeBlock = `
    public addNumbers(a: number, b: number): number {
        const value = a + b;
        if(value < 0) {
            return 0;
        } else {
            return value > 99 ? 100 : value;
         }   
    }
    `

    const testBlock = `
    describe("addNumbers", () => {
      const testCases = [
        // Valid scenarios
        { a: 0, b: 0, expected: 0 },
        { a: 50, b: 49, expected: 99 },
        { a: 50, b: 50, expected: 100 },
        { a: 99, b: 0, expected: 99 },
        { a: 0, b: 99, expected: 99 },
        { a: 10, b: 20, expected: 30 },
        // Invalid scenarios
        { a: Number.MIN_VALUE, b: Number.MIN_VALUE, expected: 0 },
        { a: Number.MAX_VALUE, b: Number.MAX_VALUE, expected: 0 },
        { a: Number.MIN_VALUE - 1, b: Number.MIN_VALUE - 1, expected: 0 },
        { a: Number.MAX_VALUE + 1, b: Number.MAX_VALUE + 1, expected: 0 },
        { a: -50, b: -50, expected: 0 },
        { a: 50, b: 51, expected: 100 },
        { a: Number.MAX_VALUE, b: Number.MAX_VALUE + 1, expected: 100 },
        { a: Number.MIN_VALUE, b: Number.MIN_VALUE - 1, expected: 0 },
        { a: -50, b: 50, expected: 0 },
        { a: 50, b: -50, expected: 0 },
      ];
    
      test.each(testCases)(
        "given %p and %p as input, returns %p",
        ({ a, b, expected }) => {
          expect(addNumbers(a, b)).toBe(expected);
        }
      );
    });
    `

    return (<div>
        <ModalBody>
            <h2>Generating test code for class: <b>com.lmig.AddNumbers</b></h2>
            <h4>Testing this method:</h4>
            <Highlight
                theme={themes.github}
                code={codeBlock}
                language="ts"
            >
                {({className, style, tokens, getLineProps, getTokenProps}) => (
                    <pre style={style}>
                            {tokens.map((line, i) => (
                                <div key={i} {...getLineProps({line})}>
                                    <span>{i + 1}</span>
                                    {line.map((token, key) => (
                                        <span key={key} {...getTokenProps({token})} />
                                    ))}
                                </div>
                            ))}
                          </pre>
                )}
            </Highlight>

            {!isHide ? <div>
                <h4>Generated tests:</h4>
                <GridRow>
                    <GridCol base={11}>
                        <Highlight
                            theme={themes.github}
                            code={testBlock}
                            language="ts"
                        >
                            {({className, style, tokens, getLineProps, getTokenProps}) => (
                                <pre style={style}>
                                {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({line})}>
                                        <span>{i + 1}</span>
                                        {line.map((token, key) => (
                                            <span key={key} {...getTokenProps({token})} />
                                        ))}
                                    </div>
                                ))}
                              </pre>
                            )}
                        </Highlight>
                    </GridCol>
                    <GridCol className={'edit-col'} base={1}>
                        <IconButton hasOutline>
                            <IconEdit label="Edit"/>
                        </IconButton>
                    </GridCol>


                </GridRow>
                <GridRow>
                    <GridCol base={8}></GridCol>
                    <GridCol base={4}><Toggle defaultChecked dynamicWidth showOnOff={false}
                                              labelVisual="Add to test suite"/></GridCol>
                </GridRow>
            </div> : <div className={'loading-container'}><LoadingSpinner className={'loading-spinner'} color="blue"
                                                                          hiddenTrack size="64"/><h2
                className={'loading-text'}>Contacting Liberty GPT...</h2></div>}
        </ModalBody>
        <ModalFooter>
            <GridRow gutterSize="fixed-16" gutters>
                <GridCol base={12} md={6}>
                    <Button dynamicWidth onClick={() => props.goToStep(1)}>
                        Back
                    </Button>
                </GridCol>
                <GridCol base={12} md={6}>
                    <Button dynamicWidth variant="primary" onClick={() => props.goToStep(3)}>
                        Continue
                    </Button>
                </GridCol>
            </GridRow>
        </ModalFooter>
    </div>);
}

function Step3(props: any) {
    return (<div>
        <ModalBody>
            <Heading tag="span" type="h3-light">Importing {props.name}</Heading>
            <h2>Step {props.currentStep}</h2>
            <p>Total Steps: {props.totalSteps}</p>
        </ModalBody>
        <ModalFooter>
            <GridRow gutterSize="fixed-16" gutters>
                <GridCol base={12} md={6}>
                    <Button dynamicWidth onClick={() => props.goToStep(2)}>
                        Back
                    </Button>
                </GridCol>
                <GridCol base={12} md={6}>
                    <Button dynamicWidth variant="primary" onClick={() => props.goToStep(4)}>
                        Complete
                    </Button>
                </GridCol>
            </GridRow>
        </ModalFooter>
    </div>);
}


function Step4(props: any) {
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
                    <Step1 name={repo.name} language={sortLanguages()[0]}
                           buildType={sortLanguages()[0] == 'Java' ? 'Maven' : 'NPM'}/>
                    <Step2/>
                    <Step3/>
                    <Step4 name={repo.name}/>
                </StepWizard>

            </Modal>
        </div>
    );
}