/**
 * OSS - Open Source Summary
 *
 * @author Afaan Bilal
 * @link   https://afaan.dev
 * @link   https://oss.afaan.dev
 * @link   https://github.com/AfaanBilal/oss
 */

import { User } from "../types";

interface ProfileCardProps {
    user: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
    return (
        <div className="flex flex-col p-6 items-center">
            <div className="my-2">
                <img src={user.avatar_url} className="w-40 rounded-xl" alt="avatar" />
            </div>
            <div className="mt-4 text-3xl">{user.name}</div>
            <div className="text-lg text-cyan-700">
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">@{user.login}</a>
            </div>
            <div className="mx-6 lg:mx-8 mt-4 text-sm text-justify text-gray-400">{user.bio}</div>
            <div className="flex gap-2 text-gray-300 pt-4">
                <div>{user.public_repos} repositories</div>
                <div className="mx-2 text-center">&middot;</div>
                <div>{user.followers} followers</div>
            </div>
            <div className="flex pt-2 items-center">
                <svg aria-hidden="true" className="w-4 h-4 mr-2 text-gray-400 fill-gray-400" viewBox="0 0 297 297" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645 c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645 C259.253,49.703,209.57,0,148.5,0z M148.5,272.689c-22.049-21.366-90.243-93.029-90.243-161.892 c0-49.784,40.483-90.287,90.243-90.287s90.243,40.503,90.243,90.287C238.743,179.659,170.549,251.322,148.5,272.689z" />
                        <path d="M148.5,59.183c-28.273,0-51.274,23.154-51.274,51.614c0,28.461,23.001,51.614,51.274,51.614 c28.273,0,51.274-23.153,51.274-51.614C199.774,82.337,176.773,59.183,148.5,59.183z M148.5,141.901 c-16.964,0-30.765-13.953-30.765-31.104c0-17.15,13.801-31.104,30.765-31.104c16.964,0,30.765,13.953,30.765,31.104 C179.265,127.948,165.464,141.901,148.5,141.901z" />
                    </g>
                </svg>
                {user.location}
            </div>
        </div>
    );
};

export default ProfileCard;
