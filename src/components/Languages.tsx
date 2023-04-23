/**
 * OSS - Open Source Summary
 *
 * @author Afaan Bilal
 * @link   https://afaan.dev
 * @link   https://oss.afaan.dev
 * @link   https://github.com/AfaanBilal/oss
 */

import { HashMap } from "../types";

interface LanguagesProps {
    languages: string[];
    languageFrequency: HashMap<number>;
    languageTime: HashMap<number>;
}

const Languages: React.FC<LanguagesProps> = ({ languages, languageFrequency, languageTime }) => {
    return (
        <div className="px-4">
            <div className="border-t border-gray-700 pt-4 text-2xl text-gray-500 m-2">Languages ({languages.length})</div>
            <div className="grid grid-cols-2">
                {languages.map(l =>
                    <div key={l} className="bg-cyan-900 py-2 px-4 m-2 rounded-md flex justify-between">
                        <div className="flex-1">{l}</div>
                        <div className="pl-1">{languageTime[l!]} year{languageTime[l!] != 1 ? "s" : ""} &middot; {languageFrequency[l!]} repo{languageFrequency[l!] != 1 ? "s" : ""}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Languages;
