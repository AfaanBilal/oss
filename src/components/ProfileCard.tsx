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
                <div className="mx-4 text-center">&middot;</div>
                <div>{user.followers} followers</div>
            </div>
        </div>
    );
};

export default ProfileCard;
