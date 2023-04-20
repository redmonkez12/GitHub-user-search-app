export async function getUsers(searchText: string) {
    const request = await fetch(`https://api.github.com/search/users?q=${searchText}`);
    const result = await request.json();

    return result.items?.[0];
}

export async function getUserProfile(username: string) {
    const request = await fetch(`https://api.github.com/users/${username}`);
    return request.json();
}