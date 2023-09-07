import React from "react";
import useGithubGetUser from "../hooks/getUser";
import useGithubGetRepo from "../hooks/getRepos";
import {Card, FieldGroup, Form, SearchInput} from "@lmig/lmds-react";
import {ProjectCard} from "./project-card/ProjectCard";

export function ImportProject() {
    const {user} = useGithubGetUser()
    const {repos} = useGithubGetRepo('https://api.github.com/users/PaulGanly/repos')

    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div>
            <Form id="form--default">
                <FieldGroup id="fieldgroup--default" labelVisual="Import Project">
                    <SearchInput
                        id="Alphanumeric--default"
                        labelVisual="Filter"
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                        aria-live="polite"
                        onClearClicked={() => setSearchValue('')}
                    />
                </FieldGroup>
            </Form>
            {
                repos.filter((repo: any) => {
                    return (!!searchValue) ? repo?.name.includes(searchValue) : true
                }).map((repo: any) => {
                    return (
                        <ProjectCard repo={repo}/>
                    )
                })
            }
        </div>
    );
}