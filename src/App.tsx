/**
 * OSS - Open Source Summary
 *
 * @author Afaan Bilal
 * @link   https://afaan.dev
 * @link   https://oss.afaan.dev
 * @link   https://github.com/AfaanBilal/oss
 */

import React from "react";

interface User {
    login: string;
    avatar_url: string;
    html_url: string;
    organizations_url: string;
    repos_url: string;
    name: string;
    company: string;
    blog: string;
    location: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
}

interface Org {
    login: string;
    avatar_url: string;
}

interface Repo {
    name: string;
    full_name: string;
    html_url: string;
    description: string;
    fork: boolean;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    homepage: string;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    forks_count: number;
    archived: boolean;
    disabled: boolean;
    license: {
        key: string;
        name: string;
        spdx_id: string;
        url: string;
        node_id: string;
    };
    topics: string[];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
}

const languageFrequency: { [k: string]: number } = {};

const App: React.FC = () => {
    const username = window.location.hash.substring(1) || "AfaanBilal";

    const [user, setUser] = React.useState<User | null>(null);
    const [orgs, setOrgs] = React.useState<Org[]>([]);
    const [repos, setRepos] = React.useState<Repo[]>([]);

    React.useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
            .then(res => res.json())
            .then(res => setUser(res))
            .catch(err => console.error(err));
    }, []);

    React.useEffect(() => {
        if (!user) {
            return;
        }

        fetch(user!.organizations_url)
            .then(res => res.json())
            .then(res => setOrgs(res))
            .catch(err => console.error(err));

        fetch(user!.repos_url + "?per_page=100")
            .then(res => res.json())
            .then(res => setRepos(res))
            .catch(err => console.error(err));
    }, [user]);

    const languages = [...new Set(repos.map(r => r.language))].filter(l => !!l).sort();
    languages.forEach(l => languageFrequency[l || ""] = repos.filter(r => r.language === l).length);
    const most_used_language = languages.length ? Object.keys(languageFrequency).reduce((a, b) => languageFrequency[a] > languageFrequency[b] ? a : b) : "";

    return !user || !repos.length ?
        <div>Loading...</div> :
        <div className="flex flex-col text-white">
            <div className="flex flex-row p-4 items-end justify-between border-b border-b-gray-700">
                <div className="text-4xl font-mono">
                    OSS
                </div>
                <div className="text-2xl ml-2 font-serif">Open Source Summary of @{username}</div>
                <div className="text-xl mr-4 text-gray-400 hover:text-cyan-700">&copy; <a href="https://afaan.dev" target="_blank" rel="noopener noreferrer">Afaan Bilal</a></div>
            </div>
            <div className="flex flex-row flex-grow">
                <div className="flex flex-col border-r border-gray-700">
                    <div className="flex flex-col p-6 items-center">
                        <div className="my-2">
                            <img src={user.avatar_url} className="w-40 rounded-xl" alt="avatar" />
                        </div>
                        <div className="mt-4 text-3xl">{user.name}</div>
                        <div className="text-lg text-cyan-700">
                            <a href={user.html_url} target="_blank" rel="noopener noreferrer">@{user.login}</a>
                        </div>
                        <div className="w-48 mt-4 text-sm text-justify text-gray-400">{user.bio}</div>
                        <div className="flex gap-2 justify-between text-gray-300">
                            <div className="mt-4">{user.public_repos} repos</div>
                            <div className="mt-4">{user.followers} followers</div>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4 text-2xl text-gray-500 m-2">Languages ({languages.length})</div>
                    <div className="flex flex-col">
                        {languages.map(l =>
                            <div key={l} className=" bg-cyan-900 py-1 px-2 m-2 rounded-md flex justify-between">
                                <div>{l}</div>
                                <div>{languageFrequency[l!]}</div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col flex-grow">
                    <div className="flex flex-wrap border-b border-gray-700">
                        <div className="flex-1">
                            <div className="text-2xl text-gray-500 m-2">Summary</div>
                            <div className="text-xl text-gray-300 m-2">
                                {user.name} joined GitHub on {new Date(user.created_at).toDateString()} and they live in {user.location}.
                                They have {user.public_repos} public repositories using {languages.length} different programming languages.
                                Their most used language is {most_used_language} used across {languageFrequency[most_used_language]} repositories.
                                Their repositories have a total of {repos.reduce((a, b) => a + b.stargazers_count, 0)} stars.
                                Their most starred repo is {repos.sort((a, b) => b.stargazers_count - a.stargazers_count)[0].name} with {repos.sort((a, b) => b.stargazers_count - a.stargazers_count)[0].stargazers_count} stars.
                                Their repositories have a total of {repos.reduce((a, b) => a + b.forks_count, 0)} forks.
                                Their most forked repo is {repos.sort((a, b) => b.forks_count - a.forks_count)[0].name} with {repos.sort((a, b) => b.forks_count - a.forks_count)[0].forks_count} forks.
                                They have {user.followers} followers and follow {user.following} users.
                            </div>
                        </div>
                        <div className="border-l border-gray-700 p-2">
                            <div className="text-2xl text-gray-500 m-2">Orgs</div>
                            <div className="flex flex-wrap">
                                {orgs.map(o =>
                                    <a key={o.login} href={"https://github.com/" + o.login} target="_blank" rel="noopener noreferrer">
                                        <div className="flex flex-col w-48 m-2 p-4 items-center border border-gray-700 rounded-lg">
                                            <div className="my-2">
                                                <img src={o.avatar_url} className="w-16 rounded-xl" alt="avatar" />
                                            </div>
                                            <div className="text-sm mt-2">{o.login}</div>
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col flex-grow">
                        <div className="text-2xl text-gray-500 m-2">Repositories</div>

                        <div className="overflow-x-auto w-full">
                            <table className="w-full whitespace-nowrap divide-y overflow-hidden">
                                <thead className="bg-gray-800">
                                    <tr className="text-white text-left">
                                        <th className="font-semibold text-sm uppercase pl-4 py-4">#</th>
                                        <th className="font-semibold text-sm uppercase px-6 py-4">Repository</th>
                                        <th className="font-semibold text-sm uppercase px-6 py-4">Language</th>
                                        <th className="font-semibold text-sm uppercase px-6 py-4">Stars</th>
                                        <th className="font-semibold text-sm uppercase px-6 py-4">Forks</th>
                                        <th className="font-semibold text-sm uppercase px-6 py-4">License</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-600 bg-slate-800">
                                    {repos.filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count).map((r, i) =>
                                        <tr key={r.full_name}>
                                            <td className="pl-4 py-4">{i + 1}</td>
                                            <td className="px-6 py-4">{r.name}</td>
                                            <td className="px-6 py-4">{r.language}</td>
                                            <td className="px-6 py-4">{r.stargazers_count}</td>
                                            <td className="px-6 py-4">{r.forks_count}</td>
                                            <td className="px-6 py-4">{r.license?.spdx_id}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
};

export default App;
