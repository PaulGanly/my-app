import {useEffect, useState} from 'react';
import {octokit} from '../utils/octokit';
import {Octokit} from "@octokit/rest";

export default function useGithubGetUser() {
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        async function onLoad() {
            await octokit.request('GET /user', {
                headers: {
                    "x-github-api-version": "2022-11-28",
                },
            })
                .then(res => {
                    console.log(res)
                    setUser(res.data)
                })
                .catch(err => console.log(err));
        }

        onLoad();
    }, [])
    return {
        user
    }
};