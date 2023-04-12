/**
 * OSS - Open Source Summary
 *
 * @author Afaan Bilal
 * @link   https://afaan.dev
 * @link   https://oss.afaan.dev
 * @link   https://github.com/AfaanBilal/oss
 */

import { HashMap, Repo, User } from "../types";

interface SummaryProps {
    user: User;
    repos: Repo[];
    languages: string[];
    languageFrequency: HashMap<number>;
    most_used_language: string;
}

const Summary: React.FC<SummaryProps> = ({ user, repos, languages, languageFrequency, most_used_language }) => {
    return (
        <div className="flex-1">
            <div className="text-2xl text-gray-500 m-2">Summary</div>
            <div className="text-xl text-gray-300 m-2">
                <span className="bg-cyan-900 px-2 py-1 rounded-sm">{user.name}</span> joined GitHub on {new Date(user.created_at).toDateString()}.
                They have {user.public_repos} public repositories using {languages.length} different programming languages.
                Their most used language is {most_used_language} which is the main language in {languageFrequency[most_used_language]} repositories.
                Their repositories have a total of {repos.reduce((a, b) => a + b.stargazers_count, 0)} stars with the most starred repo being {repos.sort((a, b) => b.stargazers_count - a.stargazers_count)[0].name} with {repos.sort((a, b) => b.stargazers_count - a.stargazers_count)[0].stargazers_count} stars.
                Their repositories have a total of {repos.reduce((a, b) => a + b.forks_count, 0)} forks.
                Most forked repo: {repos.sort((a, b) => b.forks_count - a.forks_count)[0].name} with {repos.sort((a, b) => b.forks_count - a.forks_count)[0].forks_count} forks.
                Community: {user.followers} followers and {user.following} following.
            </div>
        </div>
    );
};

export default Summary;
