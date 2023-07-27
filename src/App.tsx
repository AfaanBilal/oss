/**
 * OSS - Open Source Summary
 *
 * @author Afaan Bilal
 * @link   https://afaan.dev
 * @link   https://oss.afaan.dev
 * @link   https://github.com/AfaanBilal/oss
 */

import React from "react";
import { Language, Org, Repo, User } from "./types";
import Loading from "./components/Loading";
import ProfileCard from "./components/ProfileCard";
import Summary from "./components/Summary";
import Languages from "./components/Languages";
import Orgs from "./components/Orgs";
import Repositories from "./components/Repositories";

const App: React.FC = () => {
    const [username, setUsername] = React.useState<string>(window.location.search.substring(1) || "AfaanBilal");

    const [user, setUser] = React.useState<User | null>(null);
    const [orgs, setOrgs] = React.useState<Org[]>([]);
    const [repos, setRepos] = React.useState<Repo[]>([]);
    const [languages, setLanguages] = React.useState<Language[]>([]);

    React.useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
            .then(res => {
                if (!res.ok) {
                    alert("Please check the username.");
                    window.location.replace(location.pathname);
                }

                return res.json();
            })
            .then(res => setUser(res));
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
            .then(res => {
                if (!res.length) {
                    alert("This user doesn't seem to have any public repos.");
                    window.location.replace(location.pathname);
                }

                setRepos(res);
            })
            .catch(err => console.error(err));

        document.title = "OSS - Open Source Summary of @" + username;
    }, [user]);

    React.useEffect(() => {
        const langs: Language[] = [];

        [...new Set(repos.map(r => r.language))].filter(l => !!l).map(l => {
            const thisYear = new Date().getFullYear();
            const langStartYear = new Date(
                repos
                    .filter(r => r.language === l)
                    .sort((a, b) => (new Date(a.created_at)).getTime() - new Date(b.created_at).getTime())[0].created_at
            ).getFullYear();

            langs.push({
                name: l,
                repos: repos.filter(r => r.language === l).length,
                years: Math.max(1, thisYear - langStartYear + 1),
            });
        });

        langs.sort((a, b) => b.repos - a.repos);

        setLanguages(langs);
    }, [repos]);

    return !user || !repos.length ?
        <Loading /> :
        <div className="flex flex-col text-white font-source-sans w-full">
            <div className="flex flex-wrap gap-4 md:gap-0 p-2 md:p-4 justify-center items-end md:justify-between border-b border-b-gray-700 w-full">
                <div className="text-4xl text-center md:text-left">
                    OSS
                </div>
                <div className="text-2xl ml-2 text-center">
                    Open Source Summary of
                    <input
                        className="ml-2 border-b border-dashed border-b-gray-400 pb-1 bg-gray-800 text-center focus:outline-none"
                        onKeyUp={e => { if (e.key === "Enter") window.location.href = "/?" + username; }}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="GitHub Username"
                    />
                </div>
                <div className="text-center md:text-right text-sm lg:text-xl lg:mr-4 text-gray-400 hover:text-cyan-700">&copy; <a href="https://afaan.dev" target="_blank" rel="noopener noreferrer">Afaan Bilal</a></div>
            </div>
            <div className="flex flex-grow flex-wrap w-full">
                <div className="flex flex-col md:border-r border-gray-700 lg:w-1/4 w-full border-b lg:border-b-0">
                    <ProfileCard user={user} />
                    <Languages languages={languages} />
                    <div className="mt-4 border-t border-gray-700 py-4 text-center">
                        <a className="hover:text-cyan-700" href="https://github.com/AfaanBilal/oss" target="_blank" rel="noopener noreferrer">Source code</a> &middot;
                        &copy; <a className="hover:text-cyan-700" href="https://afaan.dev" target="_blank" rel="noopener noreferrer">Afaan Bilal</a>
                    </div>
                </div>
                <div className="flex flex-col flex-grow md:flex-1 w-full">
                    <Summary user={user} repos={repos} orgs={orgs} languages={languages} />
                    {orgs.length > 0 && <Orgs orgs={orgs} />}
                    <Repositories repos={repos} />
                </div>
            </div>
        </div>;
};

export default App;
