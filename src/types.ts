/**
 * OSS - Open Source Summary
 *
 * @author Afaan Bilal
 * @link   https://afaan.dev
 * @link   https://oss.afaan.dev
 * @link   https://github.com/AfaanBilal/oss
 */

export interface User {
    login: string;
    avatar_url: string;
    html_url: string;
    organizations_url: string;
    repos_url: string;
    name: string;
    company: string;
    blog: string;
    location: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
}

export interface Org {
    login: string;
    avatar_url: string;
}

export interface Repo {
    name: string;
    full_name: string;
    html_url: string;
    description: string;
    fork: boolean;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    homepage: string;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    forks_count: number;
    archived: boolean;
    disabled: boolean;
    license: {
        key: string;
        name: string;
        spdx_id: string;
        url: string;
        node_id: string;
    };
    topics: string[];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
}

export interface Language {
    name: string;
    repos: number;
    years: number;
}

export interface HashMap<T> {
    [k: string]: T;
}
