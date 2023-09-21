import React from "react";
import {Accordion, AccordionTab, Card, Checkbox, IconFolder, LoadingSpinner,} from "@lmig/lmds-react";

import './RepoExplorer.css';
import useCloneRepo from "../../hooks/cloneRepo";

export function RepoExplorer(props: any) {
    const {repoFiles} = useCloneRepo(props.buildType, props.name);
    return (!repoFiles ?
            <div className={'loading-container'}>
                <LoadingSpinner className={'loading-spinner'} color="blue" hiddenTrack size="64"/>
                <h2 className={'loading-text'}>Retrieving Project Files</h2>
            </div> :
            <div>
                <Card>
                    <Accordion as="div">
                        {
                            repoFiles.dirs.map((directory: IDir) => {
                                return (
                                    <AccordionTab icon={<IconFolder/>} labelVisual={directory.name}>
                                        {directory.files.map((file) => (
                                            <Checkbox className='left-padd' id="one--default"
                                                      labelVisual={file}
                                                      name="default"
                                                      value={file} defaultChecked={false}/>
                                        ))}
                                    </AccordionTab>
                                )
                            })
                        }
                        {repoFiles.files.map((file) => (
                            <Checkbox className='left-padd' id="one--default" labelVisual={file}
                                      name="default"
                                      value={file} defaultChecked={false}/>
                        ))}
                    </Accordion>
                </Card>
            </div>
    );
}