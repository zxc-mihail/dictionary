function startTest(){

    document.querySelector('.container').innerHTML = `<div><h2>Слово</h2></div>
    <form><p>Выберите правильный перевод:</p>
        <div id="choise">

            <div>
                <input type="radio" id="contactChoice1" name="answer"  />
                <label for="contactChoice1">Первый вариант</label><br>
            </div>

            <div>
                <input type="radio" id="contactChoice2" name="answer"  /> 
                <label for="contactChoice2">Второй вариант</label> <br>
            </div>

            <div>
                <input type="radio" id="contactChoice3" name="answer"  />
                <label for="contactChoice3">Третий вариант</label> <br>
            </div>

            <div>
                <input type="radio" id="contactChoice4" name="answer"  />
                <label for="contactChoice4">Четвертый вариант</label>
            </div>

        </div>
        <div>
            <button onclick="nextWord(event)">Далее</button>
        </div>
    </form>`

    answ = ''
     set = []
     translations = []
     number = 0
     translationsAll = localStorage.getItem('translations').split(',')
     result = 0
    
    let words = localStorage.getItem('words').split(',')
    
    if (words.length <= 10) {
        for (let word of words) {
            set.push(word)
            translations.push(translationsAll[words.indexOf(word)])
        }
    }
    else {
        while (set.length !== 10){
        let word = words[Math.floor(Math.random() * words.length)]
        if (set.includes(word)) continue
        set.push(word)
        translations.push(translationsAll[words.indexOf(word)])
    }}

    // set = Array.from(set)

    makeQuestion(set[number], translations[number])
}


function makeQuestion(word, answer){
    document.querySelector('.container').children[0].children[0].textContent = word
    let numberOfAnswer = Math.floor(Math.random()*4)
    let variants = document.getElementById('choise')
    answ = answer
    variants.children[numberOfAnswer].children[1].textContent = answer

    let varTrans = []

    while (varTrans.length != 3){
        let trans = translationsAll[Math.floor(Math.random() * translationsAll.length)]
        if (trans == answer || varTrans.includes(trans)) continue
        varTrans.push(trans)
    }
    
    for (let i = 0; i < 4; i++){
        if (i == numberOfAnswer) continue
        variants.children[i].children[1].textContent = varTrans[i] ? varTrans[i] : varTrans[numberOfAnswer]
    }
}

function nextWord(event){
    event.preventDefault()
    for (let item of document.querySelectorAll('input[name="answer"]')){

        if (item.parentNode.children[1].textContent == answ) {
            item.parentNode.children[1].style.color = 'green'
            item.parentNode.children[1].style.fontSize = '22px'
            setTimeout(() => {
                item.parentNode.children[1].style.color = 'black'
                item.parentNode.children[1].style.fontSize = '16px'
            }, 2000)
        }

        if(item.checked && item.parentNode.children[1].textContent !== answ){
            item.parentNode.children[1].style.color = 'red'
            item.parentNode.children[1].style.fontSize = '22px'
            setTimeout(() => {
                item.parentNode.children[1].style.color = 'black'
                item.parentNode.children[1].style.fontSize = '16px'
            }, 2000)
            item.checked = false
        }

        else if (item.checked ){
            // console.log('верно')
            item.parentNode.children[1].style.color = 'green'
            item.parentNode.children[1].style.fontSize = '22px'
            result++
            setTimeout(() => {
                item.parentNode.children[1].style.color = 'black'
                item.parentNode.children[1].style.fontSize = '16px'
            }, 2000)
            item.checked = false
        }
        
    }
    
    number += 1
    
    setTimeout(() => {
        if (number >= 10 || number >= set.length) {
        let form = document.querySelector('form')
        form.innerHTML = `Результат: ${result}/${set.length}` //сюда записать результат
        form.parentNode.children[0].children[0].textContent = 'Вы завершили тест'
        return
    }
        makeQuestion(set[number], translations[number])
    }, 2000);
    
}

let answ = ''
let set = new Set()
let translations = []
let number = 0
let translationsAll = localStorage.getItem('translations').split(',')
let result = 0
startTest()