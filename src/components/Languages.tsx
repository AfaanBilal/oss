/**
 * OSS - Open Source Summary
 *
 * @author Afaan Bilal
 * @link   https://afaan.dev
 * @link   https://oss.afaan.dev
 * @link   https://github.com/AfaanBilal/oss
 */

import { Language } from "../types";

interface LanguagesProps {
    languages: Language[];
}

const Languages: React.FC<LanguagesProps> = ({ languages }) => {
    return (
        <div className="px-4">
            <div className="border-t border-gray-700 pt-4 text-2xl text-gray-500 m-2">Languages ({languages.length})</div>
            <div className="grid grid-cols-2">
                {languages.map(l =>
                    <div key={l.name} className="bg-cyan-900 py-2 px-4 m-2 rounded-md">
                        <div className="text-xl text-center text-bold pb-2">{l.name}</div>
                        <div className="text-center text-gray-300 flex gap-2 justify-center">
                            <div>
                                {l.repos} repo{l.repos != 1 ? "s" : ""}
                            </div>
                            <div>
                                &middot;
                            </div>
                            <div>
                                {l.years} year{l.years != 1 ? "s" : ""}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Languages;
