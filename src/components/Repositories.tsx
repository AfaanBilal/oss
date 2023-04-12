/**
 * OSS - Open Source Summary
 *
 * @author Afaan Bilal
 * @link   https://afaan.dev
 * @link   https://oss.afaan.dev
 * @link   https://github.com/AfaanBilal/oss
 */

import { Repo } from "../types";

interface RepositoriesProps {
    repos: Repo[];
}

const Repositories: React.FC<RepositoriesProps> = ({ repos }) => {
    return (
        <div className="flex flex-col flex-grow">
            <div className="text-2xl text-gray-500 m-2">Repositories ({repos.length})</div>

            <div className="overflow-x-auto w-full">
                <table className="w-full whitespace-nowrap divide-y overflow-hidden">
                    <thead className="bg-gray-800">
                        <tr className="text-white text-left">
                            <th className="font-semibold text-sm uppercase pl-4 py-4">#</th>
                            <th className="font-semibold text-sm uppercase px-6 py-4">Repository</th>
                            <th className="font-semibold text-sm uppercase px-6 py-4">Language</th>
                            <th className="font-semibold text-sm uppercase px-6 py-4 hidden lg:table-cell">Stars</th>
                            <th className="font-semibold text-sm uppercase px-6 py-4 hidden lg:table-cell">Forks</th>
                            <th className="font-semibold text-sm uppercase px-6 py-4 hidden lg:table-cell">License</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-600 bg-slate-800">
                        {repos.filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count).map((r, i) =>
                            <tr key={r.full_name}>
                                <td className="pl-4 py-4">{i + 1}</td>
                                <td className="px-6 py-4">{r.name}</td>
                                <td className="px-6 py-4">{r.language}</td>
                                <td className="px-6 py-4 hidden lg:table-cell">{r.stargazers_count}</td>
                                <td className="px-6 py-4 hidden lg:table-cell">{r.forks_count}</td>
                                <td className="px-6 py-4 hidden lg:table-cell">{r.license?.spdx_id}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Repositories;
