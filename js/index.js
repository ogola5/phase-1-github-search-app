const gitForm = document.querySelector('#github-form')

document.addEventListener('DOMContentLoaded', () => {
  gitForm.addEventListener('submit', searchGitHubUser)
})

// Fetches the GitHub user details / info using the url provided.
let searchGitHubUser = (e) => {
  e.preventDefault()
  const username = document.querySelector('#search').value
  fetch(`https://api.github.com/search/users?q=${username}`)
    .then((resp) => resp.json())
    .then((users) => {
      renderUserDetails(users.items)
    })
    .catch((error) => {
      alert('bug present')
    })
}

// Renders GitHub user details for each retrieved toy from the response
let renderUserDetails = (users) => {
  users.forEach((user) => {
    createGitUserCardElement(user)
  })
}

// Creates the card and it's child elements as well as interpolates the specific user's details
let createGitUserCardElement = (user) => {
  const gitUserCard = document.createElement('div')
  gitUserCard.className = 'user-card'
  document.querySelector('#user-list').appendChild(gitUserCard)
  gitUserCard.innerHTML =
    `<img src="${user.avatar_url}" >` +
    `<h2>${user.login}</h2>` +
    `<a class="fs11" href="${user.html_url}" target="_blank">Go to Github Profile</a><br>` +
    `<button class="submit-btn fs11">View ${user.login}'s Repos</button>`
  gitUserCard.querySelector('.submit-btn').addEventListener('click', () => {
    fetchRepositories(user)
  })
}

// Fetches the toys details / info using the url provided.
let fetchRepositories = (username) => {
  fetch(`https://api.github.com/users/${username.login}/repos`)
    .then((resp) => resp.json())
    .then((repos) => {
      renderRepositoryDetails(repos)
    })
    .catch((error) => {
      alert(`Error: ${error}`)
    })
}

// Renders repo details for each retrieved toy from the response
let renderRepositoryDetails = (repos) => {
  repos.forEach((repo) => createReposCardElement(repo))
}

// Creates the card and it's child elements as well as interpolates the specific repo's details
let createReposCardElement = (repo) => {
  const repositoryCard = document.createElement('div')
  repositoryCard.className = 'repo-card'
  document.querySelector('#repos-list').appendChild(repositoryCard)
  repositoryCard.innerHTML =
    `<h2 class="margin-none">${repo.name}</h2>` +
    `<p class="fs14 margin-none">${repo.description}</p>`
}