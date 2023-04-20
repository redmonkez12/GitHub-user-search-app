import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Space_Mono } from "next/font/google";
import Image from "next/image";
import { getUserProfile, getUsers } from "@/services/user";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
    const { theme, setTheme } = useTheme();
    const [themeInfo, setThemeInfo] = useState({
        theme: "",
    });
    const [profile, setProfile] = useState<any>({});
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        setThemeInfo({
            theme: theme === "light" ? "dark" : "light",
        });
    }, [theme]);

    async function onSubmit() {
        setLoading(true);
        const user = await getUsers(searchText);

        if (user) {
            const login = user.login;
            const profile = await getUserProfile(login);

            const date = new Date(profile.created_at);
            const options = { year: "numeric", month: "short", day: "numeric" };
            // @ts-ignore
            const formatter = new Intl.DateTimeFormat("en-US", options);

            const parts = formatter.formatToParts(date);
            const formattedDate = `Joined ${parts[2].value} ${parts[0].value} ${parts[4].value}`;

            setProfile({
                avatar: user.avatar_url,
                username: login,
                profileUrl: user.html_url,
                repos: profile.public_repos,
                followers: profile.followers,
                following: profile.following,
                name: profile.name,
                createdAt: formattedDate,
                bio: profile.bio,
                company: profile.company,
                twitter: profile.twitter_username,
                blog: profile.blog,
                location: profile.location,
            });
        } else {
            setProfile({});
            setNoResults(true);
        }

        setLoading(false);
    }

    function onChangeTheme() {
        theme == "dark" ? setTheme("light") : setTheme("dark");
    }

    return (
        <main
            className={`${spaceMono.className} h-screen w-full px-6 py-8 flex md:w-[35.813rem] lg:w-[45.625rem] flex-col gap-4 mx-auto md:justify-center`}>
            <div className={"md:w-[35.813rem] lg:w-[45.625rem]"}>
                <header className={"flex justify-between mb-9"}>
                    <h1 className={"text-2xl text-black dark:text-white font-bold"}>devfinder</h1>

                    <div
                        className={`flex items-center gap-4 cursor-pointer text-darkGray dark:text-white
                            dark:hover:text-grayBlue dark:hover:fill-grayBlue dark:fill-white hover:text-black fill-lightGray hover:fill-black`}
                        onClick={onChangeTheme}>
                        <div
                            className={"uppercase font-bold text-sm"}>{themeInfo.theme}</div>
                        {themeInfo.theme === "dark" &&
                            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19.513 11.397a.701.701 0 00-.588.128 7.496 7.496 0 01-2.276 1.336 7.101 7.101 0 01-2.583.462 7.505 7.505 0 01-5.32-2.209 7.568 7.568 0 01-2.199-5.342c0-.873.154-1.72.41-2.49a6.904 6.904 0 011.227-2.21.657.657 0 00-.102-.924.701.701 0 00-.589-.128C5.32.61 3.427 1.92 2.072 3.666A10.158 10.158 0 000 9.83c0 2.8 1.125 5.342 2.967 7.19a10.025 10.025 0 007.16 2.98c2.353 0 4.527-.822 6.266-2.183a10.13 10.13 0 003.58-5.624.623.623 0 00-.46-.796z"
                                    fillRule="nonzero"/>
                            </svg>
                        }
                        {themeInfo.theme === "light" &&
                            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                <g fillRule="nonzero">
                                    <path
                                        d="M13.545 6.455c-.9-.9-2.17-1.481-3.545-1.481a4.934 4.934 0 00-3.545 1.481c-.9.9-1.481 2.17-1.481 3.545 0 1.376.582 2.646 1.481 3.545.9.9 2.17 1.481 3.545 1.481a4.934 4.934 0 003.545-1.481c.9-.9 1.481-2.17 1.481-3.545a4.934 4.934 0 00-1.481-3.545zM10 3.413a.7.7 0 00.688-.688V.688A.7.7 0 0010 0a.7.7 0 00-.688.688v2.037a.7.7 0 00.688.688zM15.635 5.344l1.455-1.455a.67.67 0 000-.952.67.67 0 00-.952 0l-1.455 1.455a.67.67 0 000 .952c.238.264.66.264.952 0zM19.312 9.312h-2.037a.7.7 0 00-.688.688.7.7 0 00.688.688h2.037A.7.7 0 0020 10a.7.7 0 00-.688-.688zM15.608 14.656a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455a.67.67 0 00.952 0 .67.67 0 000-.952l-1.455-1.455zM10 16.587a.7.7 0 00-.688.688v2.037A.7.7 0 0010 20a.7.7 0 00.688-.688v-2.037a.7.7 0 00-.688-.688zM4.365 14.656L2.91 16.111a.67.67 0 000 .952.67.67 0 00.952 0l1.455-1.455a.67.67 0 000-.952c-.238-.264-.66-.264-.952 0zM3.413 10a.7.7 0 00-.688-.688H.688A.7.7 0 000 10a.7.7 0 00.688.688h2.037A.7.7 0 003.413 10zM4.365 5.344a.67.67 0 00.952 0 .67.67 0 000-.952L3.862 2.937a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455z"/>
                                </g>
                            </svg>
                        }
                    </div>
                </header>

                <div>
                    <div
                        className={"input-wrapper rounded-2xl bg-white dark:bg-darkBlue flex items-center pr-2 pl-4"}>
                        <Image src={"/images/icon-search.svg"} width={20} height={20} alt={"Search"}/>
                        <input
                            className={"py-4 px-2 md:px-4 md:py-6 text-sm flex-1 outline-none bg-white dark:bg-darkBlue"}
                            placeholder={"Search GitHub username…"} type="text"
                            onChange={(e) => {
                                setNoResults(false);
                                setSearchText(e.target.value);
                            }}/>
                        <div className={`${noResults ? "" : "invisible"} text-red pr-6`}>No results</div>
                        <button onClick={onSubmit}
                                disabled={loading}
                                className={"text-white rounded-xl text-sm bg-blue font-bold px-4 md:py-4 md:px-7 py-3 hover:bg-lightBlue"}>Search
                        </button>
                    </div>
                </div>
            </div>

            <article
                className={`md:w-[35.813rem] lg:w-[45.625rem] px-6 md:px-10 lg:px-12
                pt-8 md:pt-10 md:pb-10 pb-12 bg-white dark:bg-darkBlue rounded-2xl w-full flex flex-col items-end ${profile.avatar ? "" : "invisible"}`}>
                <div className={"flex gap-4 md:gap-10 w-full"}>
                    <div className={"relative h-[4.375rem] w-[4.375rem] md:h-[7.313rem] md:w-[7.313rem]"}>
                        <Image className={"rounded-full"} src={profile.avatar} fill alt={"Images"}/>
                    </div>
                    <div className={"flex flex-col justify-between md:py-3"}>
                        <div className={"text-midBlack dark:text-white md:text-2xl"}>{profile.name}</div>
                        <a href={profile.profileUrl}
                           className={"text-blue text-[0.813rem] md:text-base"}>@{profile.username}</a>
                        <div
                            className={"text-[0.813rem] text-lightGray dark:text-white md:text-[0.938rem]"}>{profile.createdAt}</div>
                    </div>
                </div>

                <div className={"text-[0.813rem] leading-6 mt-8 max-w-[30rem] w-full"}>
                    {profile.bio || "No bio"}
                </div>

                <div
                    className={"bg-midGray dark:bg-background p-4 my-6 md:my-9 font-bold flex justify-between rounded-lg max-w-[30rem] w-full"}>
                    <div className={"flex-1 flex flex-col items-center gap-2"}>
                        <div className={"text-xs font-normal text-darkGray dark:text-white"}>Repos</div>
                        <div className={"text-midBlack dark:text-white"}>{profile.repos}</div>
                    </div>

                    <div className={"flex-1 flex flex-col items-center gap-2"}>
                        <div className={"text-xs font-normal text-darkGray dark:text-white"}>Followers</div>
                        <div className={"text-midBlack dark:text-white"}>{profile.followers}</div>
                    </div>

                    <div className={"flex-1 flex flex-col items-center gap-2"}>
                        <div className={"text-xs font-normal text-darkGray dark:text-white"}>Following</div>
                        <div className={"text-midBlack dark:text-white"}>{profile.following}</div>
                    </div>
                </div>

                <div
                    className={"user-info text-sm leading-5 gap-y-4 grid text-darkGray dark:text-white max-w-[30rem] w-full"}>
                    <Image src={"/images/icon-location.svg"} width={14} height={20} alt={"location"}/>
                    <div>{profile.location || "Not Available"}</div>

                    <Image src={"/images/icon-website.svg"} width={20} height={20} alt={"location"}/>
                    <a className={"hover:underline"} href={profile.blog}>{profile.blog || "Not Available"}</a>

                    <Image src={"/images/icon-twitter.svg"} width={20} height={16} alt={"location"}/>
                    <div>{profile.twitter || "Not Available"}</div>

                    <div className="relative w-[1.25rem] h-[1.25rem]">
                        <Image src={"/images/icon-company.svg"} fill alt={"location"}/>
                    </div>
                    <div>{profile.company || "Not Available"}</div>
                </div>
            </article>
        </main>
    );
}
