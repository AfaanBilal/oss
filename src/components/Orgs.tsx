/**
 * OSS - Open Source Summary
 *
 * @author Afaan Bilal
 * @link   https://afaan.dev
 * @link   https://oss.afaan.dev
 * @link   https://github.com/AfaanBilal/oss
 */

import { Org } from "../types";

interface OrgsProps {
    orgs: Org[]
}

const Orgs: React.FC<OrgsProps> = ({ orgs }) => {
    return (
        <div className="p-2 border-b border-gray-700">
            <div className="text-2xl text-gray-500 m-2">Orgs ({orgs.length})</div>
            <div className="flex flex-wrap items-center justify-center">
                {orgs.map(o =>
                    <a key={o.login} href={"https://github.com/" + o.login} target="_blank" rel="noopener noreferrer">
                        <div className="flex flex-col w-40 m-2 p-4 items-center border border-gray-700 rounded-lg hover:border-cyan-600">
                            <div className="my-2">
                                <img src={o.avatar_url} className="w-16 rounded-xl" alt="avatar" />
                            </div>
                            <div className="text-xs mt-2">{o.login}</div>
                        </div>
                    </a>
                )}
            </div>
        </div>
    );
};

export default Orgs;
