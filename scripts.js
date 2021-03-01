var images = ['deer.jpg', 'elephant.jpg', 'gorilla.jpg', 'lion.jpg', 'monkey.jpg', 'panda.jpg', 'rabbit.jpg', 'tiger.jpg']
images.forEach(img => images.push(img))
var cardsOpen = []
var done = false
var minutes = 1
var seconds = 0
var score = 0
const time = document.querySelector('.time')
const scoreDiv = document.querySelector('.score')

init()
setInterval(setTime, 1000)

function shuffle(array){
    for(let i=0;i<array.length;i++){
        let j = Math.floor(Math.random() * array.length)
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

function init(){
    shuffle(images)
    const main = document.querySelector('.game')
    images.forEach((img, index) => {
        let div = document.createElement('div')
        div.setAttribute('data-img-url', 'url(./img/' + img + ')')
        div.id = 'card' + index
        div.classList.add('card')
        div.setAttribute('onclick', 'showImage(this)')
        main.appendChild(div)
    })
    updateScore()
}

function showImage(card){
    if(done) return
    if(cardsOpen.length === 1 && cardsOpen[0] === card.id) return
    if(document.getElementById(card.id).getAttribute('data-img-url') === "url('./img/tick.jpg')") return
    if(cardsOpen.length === 2){
        if(cardsOpen[0] === card.id || cardsOpen[1] === card.id) return
        if(document.getElementById(cardsOpen[0]).getAttribute('data-img-url') !== "url('./img/tick.jpg')"){
            cardsOpen.forEach(id => {
                document.getElementById(id).style.backgroundImage = ''
            })
        }
        cardsOpen = []
    }
    card.style.backgroundImage = card.getAttribute('data-img-url')
    cardsOpen.push(card.id)
    if(cardsOpen.length === 2){
        let c1 = document.getElementById(cardsOpen[0])
        let c2 = document.getElementById(cardsOpen[1])
        if(c1.getAttribute('data-img-url') === c2.getAttribute('data-img-url')){
            done = true
            setTimeout(() => {
                c1.style.backgroundImage = "url('./img/tick.jpg')"
                c2.style.backgroundImage = "url('./img/tick.jpg')"
                c1.setAttribute('data-img-url', "url('./img/tick.jpg')")
                c2.setAttribute('data-img-url', "url('./img/tick.jpg')")
                done = false
                score++
                updateScore()
            }, 1000)
        }
    }
}

function setTime(){
    if(seconds === -1) return
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
    scoreDiv.innerHTML = score
}