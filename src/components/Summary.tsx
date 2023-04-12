/**
 * OSS - Open Source Summary
 *
 * @author Afaan Bilal
 * @link   https://afaan.dev
 * @link   https://oss.afaan.dev
 * @link   https://github.com/AfaanBilal/oss
 */

import { Repo, User } from "../types";

interface SummaryProps {
    user: User;
    repos: Repo[];
    languages: string[];
    languageFrequency: { [key: string]: number };
    most_used_language: string;
}

const Summary: React.FC<SummaryProps> = ({ user, repos, languages, languageFrequency, most_used_language }) => {
    return (
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
    );
};

export default Summary;
