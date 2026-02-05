let maxScore = 25
let totalScore1 = 0
let currentScore1 = 0
let totalScore2 = 0
let currentScore2 = 0
let diceResult = "0 / 0"
let remains = 5


const maxScoreSpan = document.getElementById('max-score')
const gamer1H2 = document.getElementsByClassName('gamer-1')[0]
const totalScore1Span = document.getElementById('total-score-1')
const currentScore1Span = document.getElementById('current-score-1')
const gamer2H2 = document.getElementsByClassName('gamer-2')[0]
const totalScore2Span = document.getElementById('total-score-2')
const currentScore2Span = document.getElementById('current-score-2')
const diceResultSpan = document.getElementById('dice-result')
const remainsSpan = document.getElementById('remains')
const dice1Img = document.getElementById('dice-1')
const dice2Img = document.getElementById('dice-2')

const rollDiceBtn = document.getElementById('roll-dice')
const holdBtn = document.getElementById('hold')

diceResultSpan.display = "none"

function rollTwoDices() {
    let dice1 = Math.floor(Math.random() * 6) + 1
    let dice2 = Math.floor(Math.random() * 6) + 1
    let score = dice1 + dice2
    return { dice1, dice2, score }
}

function syncroMaxScore() {
    maxScoreSpan.textContent = maxScore
}
function syncroTotalScore1() {
    totalScore1Span.textContent = totalScore1
}
function syncroCurrentScore1() {
    currentScore1Span.textContent = currentScore1
}
function syncroTotalScore2() {
    totalScore2Span.textContent = totalScore2
}
function syncroCurrentScore2() {
    currentScore2Span.textContent = currentScore2
}
function syncroDiceResult() {
    dice1Img.src = `./images/dice${diceResult[0]}.png`
    dice2Img.src = `./images/dice${diceResult[4]}.png`
    diceResultSpan.textContent = diceResult

}
function syncroRemains() {
    remainsSpan.textContent = remains
}

function chosePlayerToStart() {
    const num = Math.random() * 10;
    if (num < 5)
        gamer1H2.className = "isPlay"
    else
        gamer2H2.className = "isPlay"
}
function changePlayer() {
    if (gamer1H2.className === "isPlay") {
        gamer1H2.className = "gamer-1"
        gamer2H2.className = "isPlay"
    }
    else {
        gamer2H2.className = "gamer-2"
        gamer1H2.className = "isPlay"
    }
}

function addCurrentToTotal() {
    if (gamer1H2.className === "isPlay") {
        totalScore1 = totalScore1 + currentScore1
        currentScore1 = 0
        syncroTotalScore1()
        syncroCurrentScore1()
    }
    else {
        totalScore2 = totalScore2 + currentScore2
        currentScore2 = 0
        syncroTotalScore2()
        syncroCurrentScore2()
    }
}

function handover() {
    addCurrentToTotal()
    remains = 5
    syncroRemains()
    if (!isWin())
        changePlayer()
}

function isWin() {
    if (totalScore1 >= maxScore) {
        gamer1H2.className = "isWin"
        rollDiceBtn.disabled = true
        holdBtn.disabled = true
        alert("PLAYER 1 WIN !!!")
        return true
    }
    else if (totalScore2 >= maxScore) {
        gamer2H2.className = "isWin"
        rollDiceBtn.disabled = true
        holdBtn.disabled = true
        alert("PLAYER 2 WIN !!!")
        return true
    }
    return false
}


rollDiceBtn.addEventListener('click', function () {
    if (remains === 0) {
        handover()
        return
    }
    const { dice1, dice2, score } = rollTwoDices()
    diceResult = `${dice1} / ${dice2}`
    syncroDiceResult()
    if (dice1 === dice2) {
        currentScore1 = currentScore2 = 0
        handover()
        return
    }
    remains = remains - 1
    syncroRemains()
    if (gamer1H2.className === "isPlay") {
        currentScore1 = currentScore1 + score
        syncroCurrentScore1()
    }
    else {
        currentScore2 = currentScore2 + score
        syncroCurrentScore2()
    }
});

holdBtn.addEventListener('click', function () {
    handover()
});

// Start Game :

syncroMaxScore()
syncroTotalScore1()
syncroCurrentScore1()
syncroTotalScore2()
syncroCurrentScore2()
syncroDiceResult()
syncroRemains()
chosePlayerToStart()