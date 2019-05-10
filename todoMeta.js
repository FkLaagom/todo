
// TEXT NOTE SUBMIT
document.querySelector('form').addEventListener('submit',function(event){
    event.preventDefault();
    var noteText = document.getElementById('noteInput').value;
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

        let note = document.createElement('P');
            note.innerHTML = noteText;
            note.classList.add('noteText');
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
})

function editNote(e){
    let element = e;
    let parrent = e.parentElement;
    let firstChild = parrent.firstChild;
    let lastChild = parrent.lastChild;
    
    firstChild.hidden = true;
    e.remove();
    lastChild.remove();
    let form = document.createElement('form');
    let input = document.createElement('input');
    input.id = 'noteInput';
    input.type = "text";
    input.style.color = '#4D4D4D';
    input.value = e.textContent;

    form.onfocusout = function(){resetNote(firstChild, p, lastChild, parrent)};
    form.onsubmit = function(){resetNote(firstChild, p, lastChild, parrent)};
    
    form.appendChild(input);
    parrent.appendChild(form);
    input.focus();
}

function resetNote(child1, child2, child3, parrent){
    var xxx = document.createElement('H1');
    xxx.innerHTML = 'asdasd';
    document.querySelector('body').appendChild()
    firstChild.hidden = false;
    console.log('asdddd');
}

function deleteNote(note){
    note.remove();
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
        //if only show visable notes
        if(1 == 2 ){
           checkbox.parentElement.style.display = 'none';
        }
    }
    else{
        checkbox.nextSibling.classList.remove('noteTextDone');
        //if only show visable notes    
        if(1 == 2 ){
           checkbox.parentElement.style.display = 'flex';
        }
    }   
}

// CHECK ALL NOTES
function checkAllNotes(){
    boxes = Array.from(document.getElementsByClassName('noteCheckBox'));
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
}

