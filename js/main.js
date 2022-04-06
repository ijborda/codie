// Use strict
"use strict";

// Set listener
document.querySelector('#submit').addEventListener('click', displayData)

// Define getData function
function displayData() {
    // Get username
    const username = document.querySelector('#username').value
    let obj
    
    // Fetch data
    const url = `https://www.codewars.com/api/v1/users/${username}`
    fetch(url)
    .then(response => response.json())
    .then(result => process(result))
    .catch(error => console.error(error))
}

function process(result) {
    let title = document.querySelector('#title')
    if (result.clan === 'None') {
        title.innerHTML = `Hi, ${result.username}! You don't belong to any clan.`
    } else {
        title.innerHTML = `Hi, ${result.username} of ${result.clan}!`
    }

    let honor = document.querySelector('#honor')
    let leaderboard = document.querySelector('#leaderboard')
    let overallrank = document.querySelector('#overallrank')
    let challengesCompleted = document.querySelector('#challengesCompleted')
    let challengesAuthored = document.querySelector('#challengesAuthored')

    honor.innerHTML = result.honor
    leaderboard.innerHTML = '#' + result.leaderboardPosition
    overallrank.innerHTML = result.ranks.overall.name
    challengesCompleted.innerHTML = result.codeChallenges.totalCompleted
    challengesAuthored.innerHTML = result.codeChallenges.totalAuthored

    let proglang = result.ranks.languages
    Object.keys(proglang).forEach(a => {
        let img = document.createElement('img')
        img.src = `assets/proglang/${a}.png`
        
        let kyu = document.createElement('span')
        kyu.innerHTML = 'Rank: ' + proglang[a].name

        let score = document.createElement('span')
        score.innerHTML = 'Score: ' + proglang[a].score

        let div = document.createElement('div')
        let skills = document.querySelector('#skills')
        skills.appendChild(div)

        let divLast = document.querySelector('#skills div:last-child')
        divLast.appendChild(img)
        divLast.appendChild(kyu)
        divLast.appendChild(score)
    })
    
    document.querySelector('#content').style.display = 'contents'
    document.querySelector('#main').style.display = 'none'
}

