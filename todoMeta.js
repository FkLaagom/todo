window.onbeforeunload = () =>{
        let notes = [];
        let checkbox = Array.from(document.getElementsByClassName('noteCheckBox'));
        Array.from(document.getElementsByClassName('noteInput')).forEach((x,i) =>{
            notes.push({'text': x.value, checked: });
        })



        window.localStorage.setItem('notes', JSON.stringify(notes));
}

if(window.localStorage.getItem("notes") != null){
   let notes= JSON.parse(window.localStorage.getItem('notes'));
   notes.forEach(x =>{
       document.getElementById('notes').appendChild(x);
   })
}


// TEXT NOTE SUBMIT
document.querySelector('form').addEventListener('submit',function(event){
    event.preventDefault();
    let noteText = document.getElementById('noteInput').value;
    if(noteText != ''){
        let noteContainer = document.createElement('div');
            noteContainer.classList.add('noteContainer');
        
        let checkbox = document.createElement('input');
            checkbox.classList.add('noteCheckBox'); 
            checkbox.type = "checkbox"; 
            checkbox.name = "name"; 
            checkbox.value = "value";
            checkbox.width = '10%';
            checkbox.onclick = function(){noteChecked(this)};
            checkbox.addEventListener('check', function(){
                noteChecked(this);
            });

        let note = document.createElement('input');
            note.value = noteText;
            note.classList.add('addedNote');
            note.ondblclick = function(){editNote(this)}
        
        let deleteButton = document.createElement('BUTTON');
            deleteButton.textContent ='×';
            deleteButton.classList.add('deleteButton');
            deleteButton.onclick = function(){deleteNote(noteContainer)}
            
        noteContainer.appendChild(checkbox);
        noteContainer.appendChild(note);
        noteContainer.appendChild(deleteButton);
    
        noteContainer.onmouseover = function() {hoverInNoteDiv(deleteButton)};
        noteContainer.onmouseout = function() {hoverOutNoteDiv(deleteButton)};

        document.getElementById('noteInput').value ='';
        document.getElementById('notes').appendChild(noteContainer);
    }
    setCounter();
    checkActiveBottomButton();
    saveLocalSiteDump();
})



function deleteNote(note){
    note.remove();
    setCounter();
}

function hoverInNoteDiv(deleteButton){
deleteButton.style.opacity = 100;
}
function hoverOutNoteDiv(deleteButton){
    deleteButton.style.opacity = 0;
}



// NOTE CHECKED
function noteChecked(checkbox){
    if(checkbox.checked == true){
        checkbox.nextSibling.classList.add('noteTextDone');
    }
    else{
        checkbox.nextSibling.classList.remove('noteTextDone');
    }   
    setCounter();
}

// CHECK ALL NOTES
function checkAllNotes(){
   let boxes = Array.from(document.getElementsByClassName('noteCheckBox'));
    if(boxes.some(x => x.checked == false)){
        boxes.forEach(x =>{
            x.checked = true;
            noteChecked(x);
        })
        // document.getElementById('downArrow').style.color =  '#737377';
    }
    else{
        boxes.forEach(x =>{
            x.checked = false;
            noteChecked(x);
        })
    }
    setCounter();
}

function checkActiveBottomButton(){
    let asd = Array.from(document.getElementsByClassName('button1'));
    Array.from(document.getElementsByClassName('button1')).forEach(x =>{
        if(x.classList.contains('button1Selected')){
            footerClick(x);
        }
    })
}

function footerClick(button){
    let element = button;
    setAllActiveCompletedBorder(element);
    switch(element.textContent){
        case 'Clear completed': clearFinnishedNotes();
        break;
        case 'All': showAllNotes();
        break;
        case 'Active': showActiveNotes();
        break;
        case 'Completed': showCompletedNotes();
        break;
    }
}

function setAllActiveCompletedBorder(button){
    Array.from(document.getElementsByClassName('button1')).forEach(element => {
        if(element.textContent != 'clearCompleted'){
            element.classList.remove('button1Selected');
            element.classList.add('button1')
        }
    })
    let but = button;
    button.classList.add('button1Selected');
}

function showCompletedNotes(){
    location.hash = 'Completed';
    Array.from(document.getElementsByClassName('noteCheckBox')).forEach(x =>{
        let father = x.parentElement;
        father.classList.remove('hideMyAss');
        if(!x.checked){
            father.classList.add('hideMyAss');
        }
    })
    setCounter();
    
}

function showActiveNotes(){
    location.hash ='Active';
    Array.from(document.getElementsByClassName('noteCheckBox')).forEach(x =>{
        let father = x.parentElement;
        father.classList.remove('hideMyAss');
        if(x.checked){
           father.classList.add('hideMyAss');
        }
    })
}

function showAllNotes(){
    location.hash = 'All';
    Array.from(document.getElementsByClassName('noteCheckBox')).forEach(x =>{
        let father = x.parentElement;
        father.classList.remove('hideMyAss');
    })
    setCounter();
}

function clearFinnishedNotes(){
    Array.from(document.getElementsByClassName('noteCheckBox')).forEach(x =>{
    if(x.checked == true){
        deleteNote(x.parentElement);
    }})
    setCounter();
}

function setCounter(){
    let count = 0;
    let checkedCount = 0;
    let totalNotes = 0;
    Array.from(document.getElementsByClassName('noteCheckBox')).forEach(x => {
        if(x.checked == false){
            count++;
            totalNotes++;
        }else{
            checkedCount++;
            totalNotes++;
        }
    })
    document.getElementById('counter').textContent = count;
    document.getElementById('itemItems').textContent = count == 1 ? 'item':'items';
    if(checkedCount > 0){
        document.getElementById('bClearCompleted').classList.remove('hideMyViss');
    }
    else{
        document.getElementById('bClearCompleted').classList.add('hideMyViss');
    }
    if(totalNotes> 0){
        document.querySelector('footer').classList.remove('hideFooter');
    }else{
        document.querySelector('footer').classList.add('hideFooter');
    }
}

