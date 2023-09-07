import {useEffect, useState} from 'react';
import {octokit} from '../utils/octokit';

export default function useGithubGetOrgRepos(page: number) {
    const [orgRepos, setOrgRepos] = useState([]);

    useEffect(() => {
        async function onLoad() {
            await octokit.request(`GET /orgs/lmigtech/repos?sort=pushed&page=${page}`, {
                per_page: 100,
                headers: {
                    "x-github-api-version": "2022-11-28",
                },
            })
                .then(res => {
                    console.log(res)
                    setOrgRepos(res.data)
                })
                .catch(err => console.log(err));
        }

        onLoad();
    }, [])
    return {
        orgRepos
    }
};