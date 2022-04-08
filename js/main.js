// Use strict
"use strict";

// Set listener
document.querySelector('#submit').addEventListener('click', showResults)

// Define getData function
function showResults() {

    // Get username
    const username = document.querySelector('#username').value
    
    // Fetch data for username then render it
    fetch(`https://www.codewars.com/api/v1/users/${username}`)
        .then(res => res.json())
        .then(data => showStats(data))
        .catch(err => console.log(`Error: ${err}`))

}

function showStats(result) {

    // Render name
    document.querySelector('.name > p').innerHTML = result.clan === null ? 
        `Hi, ${result.username}! You don't belong to any clan.` : 
        `Hi, ${result.username} of ${result.clan}!`

    // Render highlights
    console.log(result)
    document.querySelector('#honor').innerHTML = result.honor
    document.querySelector('#leaderboard').innerHTML = result.leaderboardPosition
    document.querySelector('#overallrank').innerHTML = result.ranks.overall.name
    document.querySelector('#challengesCompleted').innerHTML = result.codeChallenges.totalCompleted
    document.querySelector('#challengesAuthored').innerHTML = result.codeChallenges.totalAuthored

    // Render skills
    let proglang = result.ranks.languages
    Object.keys(proglang).forEach(a => {
        console.log(proglang[a])
        // Create skill image
        let img = document.createElement('img')
        img.src = `assets/proglang/${a}.png`
        // Create skill rank
        let kyu = document.createElement('span')
        kyu.innerHTML = 'Rank: ' + proglang[a].name
        // Create skill score
        let score = document.createElement('span')
        score.innerHTML = 'Score: ' + proglang[a].score
        // Render skill
        let div = document.createElement('div')
        div.appendChild(img)
        div.appendChild(kyu)
        div.appendChild(score)
        let skills = document.querySelector('#skills')
        skills.appendChild(div)
    })
    
    // Hide welcome and show only contents
    document.querySelector('#welcome').style.display = 'none'
    document.querySelector('#results').style.display = 'contents'

}

