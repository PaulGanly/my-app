import {useEffect, useState} from 'react';
import {octokit} from '../utils/octokit';

export default function useGithubSearchOrgRepos(term: string) {
    const [foundRepos, setFoundRepos] = useState<any>(undefined);

    useEffect(() => {
        async function onLoad() {
            const uri = encodeURIComponent('org:lmigtech&sort=stars&order=desc');
            await octokit.request(`GET /search/repositories?q=${term}+${uri}`, {
                per_page: 100,
                headers: {
                    "x-github-api-version": "2022-11-28",
                },
            })
                .then(res => {
                    console.log(res)
                    setFoundRepos(res.data)
                })
                .catch(err => console.log(err));
        }

        onLoad();
    }, [])
    return {
        foundRepos
    }
};