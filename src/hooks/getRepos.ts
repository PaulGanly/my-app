import {useEffect, useState} from 'react';
import {octokit} from '../utils/octokit';

export default function useGithubGetRepo(url: string) {
    const [repos, setRepos] = useState<any[]>([]);

    useEffect(() => {
        async function onLoad(url: string) {
            if(!!url){
                await octokit.request(`GET ${url}`, {
                    per_page: 10,
                    type: 'all',
                    headers: {
                        "x-github-api-version": "2022-11-28",
                    },
                })
                    .then(res => {
                        console.log(res)
                        setRepos(res.data)
                    })
                    .catch(err => console.log(err));
            }

        }

        onLoad(url);
    }, [])
    return {
        repos
    }
};