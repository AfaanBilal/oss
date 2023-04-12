/**
 * OSS - Open Source Summary
 *
 * @author Afaan Bilal
 * @link   https://afaan.dev
 * @link   https://oss.afaan.dev
 * @link   https://github.com/AfaanBilal/oss
 */

import { HashMap, Org, Repo, User } from "../types";

interface SummaryProps {
    user: User;
    repos: Repo[];
    orgs: Org[];
    languages: string[];
    languageFrequency: HashMap<number>;
    most_used_language: string;
}

const Summary: React.FC<SummaryProps> = ({ user, repos, orgs, languages, languageFrequency, most_used_language }) => {
    return (
        <div className="flex-1 p-2">
            <div className="text-2xl text-gray-500 m-2">Summary</div>
            <div className="text-xl lg:text-2xl text-gray-300 m-2 lg:mr-4 text-justify">
                <b>{user.name}</b> joined GitHub on <b>{new Date(user.created_at).toDateString()}</b>.
                They have <b>{user.public_repos}</b> public repositories using <b>{languages.length}</b> different programming languages.
                Their most used language is <b>{most_used_language}</b> which is the main language in <b>{languageFrequency[most_used_language]}</b> repositories.
                Their repositories have a total of <b>{repos.reduce((a, b) => a + b.stargazers_count, 0)}</b> stars
                with the most starred repo being <b>{repos.sort((a, b) => b.stargazers_count - a.stargazers_count)[0].name}</b> with <b>{repos.sort((a, b) => b.stargazers_count - a.stargazers_count)[0].stargazers_count}</b> stars.
                Their repositories have a total of <b>{repos.reduce((a, b) => a + b.forks_count, 0)}</b> forks.
                Their most forked repo is <b>{repos.sort((a, b) => b.forks_count - a.forks_count)[0].name}</b> with <b>{repos.sort((a, b) => b.forks_count - a.forks_count)[0].forks_count}</b> forks.
                They belong to <b>{orgs.length}</b> orgs.
            </div>
        </div>
    );
};

export default Summary;
