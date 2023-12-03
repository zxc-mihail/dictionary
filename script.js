function addWord(){
    let table = document.getElementById('table')
    let row = table.insertRow(-1)
    let wordCell = row.insertCell(0);
    let translateCell = row.insertCell(1);
    let deleteCell = row.insertCell(2);

    wordCell.innerHTML = `<input type="text" placeholder="Новое слово">`
    translateCell.innerHTML = `<input type="text" placeholder="Перевод">`
    deleteCell.innerHTML = '<button onclick="deleteRow(this)">Удалить</button>'

    addEventListeners()
}

function deleteRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    addEventListeners()
}

function saveData(){
    let table = document.getElementById('table')
    let words = []
    let translations = []
    for (let row of table.children[1].children){
        if (row.children[0].children[0].value == '' && row.children[1].children[0].value == '') continue
        words.push(row.children[0].children[0].value)
        translations.push(row.children[1].children[0].value)
    }
    localStorage.setItem('words', words)
    localStorage.setItem('translations', translations)
}

function setData(){
    let table = document.getElementById('table')
    let words = localStorage.getItem('words').split(',')
    let translations = localStorage.getItem('translations').split(',')
    for (let i = 0; i < words.length; i++){
        if (words[i] === '' && translations[i] === '') continue
        addWord()
        table.children[1].children[i].children[0].children[0].value = words[i]
        table.children[1].children[i].children[1].children[0].value = translations[i]
    }
    
}

function addEventListeners(){
    for (let input of document.querySelectorAll('input')){
        input.addEventListener('input', function(){
            saveData()
        })
    }
    for (let button of document.querySelectorAll('button')){
        button.addEventListener('click', function(){
            // alert('saved!')
            saveData()
        })
    }
}

addEventListeners()

setData()
