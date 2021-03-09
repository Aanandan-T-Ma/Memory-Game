var images = ['deer.jpg', 'elephant.jpg', 'gorilla.jpg', 'lion.jpg', 'monkey.jpg', 'panda.jpg', 'rabbit.jpg', 'tiger.jpg']
images.forEach(img => images.push(img))
const tickImg = 'url("./img/tick.jpg")'
const time = document.querySelector('.time')
const scoreDiv = document.querySelector('.score')
var cardsOpen, done, minutes, seconds, score, countdown

startGame = () => {
    init()
    shuffle(images)
    placeCards()
    setTime()
    updateScore()
    document.querySelector('.startup').style.opacity = 0
    document.querySelector('.startup').style.transform = 'scale(0)'
    countdown = setInterval(setTime, 1000)
}

timeUp = () => {
    clearInterval(countdown)
    document.querySelector('.content').innerHTML = 'Time Up!'
    document.getElementById('points').innerHTML = 'Your Score: ' + score
    document.getElementById('play-btn').innerHTML = 'Play Again'
    document.querySelector('.startup').style.opacity = 1
    document.querySelector('.startup').style.transform = 'scale(1)'
    document.querySelector('.game').innerHTML = ''
}

function init(){
    cardsOpen = []
    done = false
    minutes = 1
    seconds = 0
    score = 0
}

function shuffle(array){
    for(let i=0;i<array.length;i++){
        let j = Math.floor(Math.random() * array.length)
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

function placeCards(){
    const grid = document.querySelector('.game')
    images.forEach((img, index) => {
        let div = document.createElement('div')
        div.setAttribute('data-img-url', 'url(./img/' + img + ')')
        div.style.backgroundImage = 'url(./img/' + img + ')'
        div.id = 'card' + index
        div.classList.add('card')
        div.setAttribute('onclick', 'showImage(this)')
        grid.appendChild(div)
    })
    setTimeout(() => openClose(Array.from(grid.children)), 500)
}

function showImage(card){
    //if(time.innerHTML === 'Time Over!') return
    if(done) return
    if(cardsOpen.length === 1 && cardsOpen[0] === card.id) return
    if(document.getElementById(card.id).getAttribute('data-img-url') === tickImg) return
    if(cardsOpen.length === 2){
        if(cardsOpen[0] === card.id || cardsOpen[1] === card.id) return
        if(document.getElementById(cardsOpen[0]).getAttribute('data-img-url') !== tickImg){
            cardsOpen.forEach(id => {
                document.getElementById(id).style.backgroundImage = ''
            })
        }
        cardsOpen = []
    }
    card.classList.add('close-card')
    setTimeout(() => {
        card.style.backgroundImage = card.getAttribute('data-img-url')
        cardsOpen.push(card.id)
        if(cardsOpen.length === 2){
            let c1 = document.getElementById(cardsOpen[0])
            let c2 = document.getElementById(cardsOpen[1])
            if(c1.getAttribute('data-img-url') === c2.getAttribute('data-img-url')){
                done = true
                setTimeout(() => {
                    c1.style.backgroundImage = tickImg
                    c2.style.backgroundImage = tickImg
                    c1.setAttribute('data-img-url', tickImg)
                    c2.setAttribute('data-img-url', tickImg)
                    done = false
                    score++
                    updateScore()
                }, 500)
            }
        }
        setTimeout(() => {
            card.classList.remove('close-card')
            card.classList.add('open-card')
            setTimeout(() => card.classList.remove('open-card'), 500)
        }, 10)
    }, 200)
}

function setTime(){
    if(seconds === -1){
        timeUp()
        return
    }
    var mins = (minutes>9)? minutes : '0'+minutes
    var secs = (seconds>9)? seconds : '0'+seconds
    time.innerHTML = mins + ':' + secs
    if(seconds) seconds--
    else if(minutes){
        minutes--
        seconds = 59
    }
    else seconds = -1
}

function updateScore(){
    scoreDiv.innerHTML = 'Score: ' + score
}

function openClose(grid){
    grid.forEach(card => {
        card.classList.add('close-card')
        setTimeout(() => {
            card.style.backgroundImage = ''
            setTimeout(() => {
                card.classList.remove('close-card')
                card.classList.add('open-card')
                setTimeout(() => card.classList.remove('open-card'), 500)
            }, 100)
        }, 200)
    })
}