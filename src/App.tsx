/**
 * OSS - Open Source Summary
 *
 * @author Afaan Bilal
 * @link   https://afaan.dev
 * @link   https://oss.afaan.dev
 * @link   https://github.com/AfaanBilal/oss
 */

import React from "react";
import { HashMap, Org, Repo, User } from "./types";
import Loading from "./components/Loading";
import ProfileCard from "./components/ProfileCard";
import Summary from "./components/Summary";
import Languages from "./components/Languages";
import Orgs from "./components/Orgs";
import Repositories from "./components/Repositories";

const languageFrequency: HashMap<number> = {};
const languageTime: HashMap<number> = {};

const App: React.FC = () => {
    const [username, setUsername] = React.useState<string>(window.location.search.substring(1) || "AfaanBilal");

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

        document.title = "OSS - Open Source Summary of @" + username;
    }, [user]);

    const languages = [...new Set(repos.map(r => r.language))].filter(l => !!l).sort();
    languages.forEach(l => languageFrequency[l || ""] = repos.filter(r => r.language === l).length);
    languages.forEach(l => languageTime[l || ""] = Math.max(1, new Date().getFullYear() - new Date(repos.filter(r => r.language === l).sort((a, b) => (new Date(a.created_at)).getTime() - new Date(b.created_at).getTime())[0].created_at).getFullYear()));
    const most_used_language = languages.length ? Object.keys(languageFrequency).reduce((a, b) => languageFrequency[a] > languageFrequency[b] ? a : b) : "";

    return !user || !repos.length ?
        <Loading /> :
        <div className="flex flex-col text-white">
            <div className="flex flex-row p-4 items-end justify-between border-b border-b-gray-700">
                <div className="text-2xl lg:text-4xl font-mono flex-1">
                    OSS
                </div>
                <div className="text-xl lg:text-2xl ml-2 font-serif text-center flex-1">
                    Open Source Summary of
                    <input
                        className="ml-2 border-b border-dashed border-b-gray-400 pb-1 bg-gray-800 text-center focus:outline-none"
                        onKeyUp={e => { if (e.key === "Enter") window.location.href = "/?" + username; }}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="GitHub Username"
                    />
                </div>
                <div className="flex-1 text-right text-sm lg:text-xl lg:mr-4 text-gray-400 hover:text-cyan-700">&copy; <a href="https://afaan.dev" target="_blank" rel="noopener noreferrer">Afaan Bilal</a></div>
            </div>
            <div className="flex flex-row flex-grow flex-wrap">
                <div className="flex flex-col border-r border-gray-700 lg:w-1/4 w-full border-b lg:border-b-0">
                    <ProfileCard user={user} />
                    <Languages languages={languages} languageFrequency={languageFrequency} languageTime={languageTime} />
                    <div className="mt-4 border-t border-gray-700 py-4 text-center">
                        <a className="hover:text-cyan-700" href="https://github.com/AfaanBilal/oss" target="_blank" rel="noopener noreferrer">Source code</a> &middot;
                        &copy; <a className="hover:text-cyan-700" href="https://afaan.dev" target="_blank" rel="noopener noreferrer">Afaan Bilal</a>
                    </div>
                </div>
                <div className="flex flex-col flex-grow flex-1">
                    <Summary user={user} repos={repos} orgs={orgs} languages={languages} languageFrequency={languageFrequency} most_used_language={most_used_language} />
                    {orgs.length > 0 && <Orgs orgs={orgs} />}
                    <Repositories repos={repos} />
                </div>
            </div>
        </div>;
};

export default App;
