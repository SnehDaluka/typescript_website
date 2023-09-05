"use strict";
const username = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const mainDiv = document.querySelector(".main_container");
async function dataFetcher(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`Network response was not ok - status: ${res.status}`);
    }
    const data = await res.json();
    return data;
}
const showResultUI = (user) => {
    const { avatar_url, login, url } = user;
    mainDiv.insertAdjacentHTML("beforeend", `<div class="card">
    <img src=${avatar_url} alt=${login}/>
    <h2 class="login">${login}</h2>
    <hr/>
    <div class="card-footer">
    <img src="${avatar_url}" alt="${login}"/>
    <a href="${url}">Github</a>
    </div>
   </div>
   `);
};
function fetchData(url) {
    dataFetcher(url, {}).then((userInfo) => {
        for (const user of userInfo) {
            showResultUI(user);
        }
    });
}
fetchData("https://api.github.com/users");
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = username.value.toLowerCase();
    try {
        const url = "https://api.github.com/users";
        const allUsers = await dataFetcher(url, {});
        const usersInfo = allUsers.filter((user) => {
            return user.login.toLowerCase().includes(searchTerm);
        });
        mainDiv.innerHTML = "";
        if (usersInfo.length === 0) {
            mainDiv.insertAdjacentHTML("beforeend", `<p class="empty-msg">No matching user found.</p>`);
        }
        else {
            for (const user of usersInfo) {
                showResultUI(user);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
