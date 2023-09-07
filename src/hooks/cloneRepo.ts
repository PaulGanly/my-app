import {useEffect, useState} from 'react';
import {octokit} from '../utils/octokit';

export default function useCloneRepo(buildType: string, githubUrl: string) {
    const [repoFiles, setRepoFiles] = useState<IDir | undefined>(undefined);

    useEffect(() => {
        async function cloneRepo() {
            buildType == 'NPM' ?
                await fetch('http://localhost:5000/api/repo/clone', {
                    method: 'POST',
                    headers: new Headers({"Content-Type": "application/json"}),
                    body: JSON.stringify({
                        repoUrl: "https://github.com/PaulGanly/npm-testing-app",
                        name: "npm-testing-app"
                    }),
                } as RequestInit)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        setRepoFiles(data);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
                :
                await fetch('https://jsonplaceholder.typicode.com/posts')
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        setRepoFiles(data);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
        }

        cloneRepo();
    }, [])
    return {
        repoFiles
    }
};