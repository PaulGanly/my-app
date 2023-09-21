import React from "react";
import useGithubGetUser from "../hooks/getUser";
import useGithubGetRepo from "../hooks/getRepos";
import {FieldGroup, Form, SearchInput} from "@lmig/lmds-react";
import {ExistingProjectCard} from "./existing-project-card/ExistingProjectCard";
import {RootRoute} from "@tanstack/react-router";

const projectsRootRoute = new RootRoute({
    component: ExistingProjects,
})

export function ExistingProjects() {
    const {user} = useGithubGetUser()
    const {repos} = useGithubGetRepo('https://api.github.com/users/PaulGanly/repos')

    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div>
            <Form id="form--default">
                <FieldGroup id="fieldgroup--default" labelVisual="Auto Test AI managed projects">
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
                        <ExistingProjectCard repo={repo}/>
                    )
                })
            }
        </div>
    );
}