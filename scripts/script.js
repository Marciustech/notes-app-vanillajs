const notesBox = document.querySelector("div.notesBox")

Window.prototype.noteObject = function(
  noteSubject = "",
  noteText = "",
  noteDate = "",
  uuid = ""
) {
      /*
  const editBtn = document.createElement("button")
  editBtn.classList.add("fas", "fa-edit", "px-1", "transition", "duration-200", "ease-out", "hover:text-indigo-400")
  editBtn.onclick = editableToggle*/
  const deleteBtn = document.createElement("button")
  deleteBtn.classList.add("fas", "fa-trash-alt", "px-1", "transition", "duration-200", "ease-out", "hover:text-indigo-400")
  deleteBtn.onclick = deleteFromLocalStorage

  const toolsDiv = document.createElement("div")
  toolsDiv.classList.add("tools", "flex", "justify-end", "py-2", "border-gray-500", "border-b-2")
  //toolsDiv.appendChild(editBtn)
  toolsDiv.appendChild(deleteBtn)

  const subjectDiv = document.createElement("div")
  subjectDiv.classList.add("w-full")
  subjectDiv.innerText = noteSubject

  const bodyDiv = document.createElement("div")
  bodyDiv.classList.add("w-full", "h-24")
  bodyDiv.innerText = noteText

  const dateDiv = document.createElement("div")
  dateDiv.classList.add("justify-self-end", "text-sm", "pt-4", "text-gray-500")
  dateDiv.innerText =
    noteDate.split("T")[0] + " - " + noteDate.split("T")[1].split(".")[0]

  const noteDiv = document.createElement("div")
  noteDiv.classList.add("note", "w-1/4", "shadow", "shadow-black", "px-1", "flex", "flex-col")
  noteDiv.appendChild(toolsDiv)
  noteDiv.appendChild(subjectDiv)
  noteDiv.appendChild(bodyDiv)
  //noteDiv.appendChild(saveButton)
  noteDiv.appendChild(dateDiv)
  noteDiv.id = uuid

  return noteDiv
}

Window.prototype.addNewNotes = function (noteSubject = "", noteText = "") {
  updateLocalStorage(noteSubject, noteText)
  updateUI()
}

Window.prototype.deleteFromLocalStorage = function(e) {
  let id = e.target.parentNode.parentNode.id
  let localStorageList = JSON.parse(localStorage.getItem("notes_app_storage"))

  for (let [i, values] of localStorageList.entries()) {
    if (values.id == id) {
      const [id, ...newLocalStorageList] = localStorageList
      localStorage.setItem("notes_app_storage", JSON.stringify(newLocalStorageList))
      break
    }
  }
  updateUI()
}

Window.prototype.submit = function(e) {
  let subject = e.target.parentNode.childNodes[3].childNodes[3].value
  let body = e.target.parentNode.childNodes[5].childNodes[3].value

  if (subject == "") return window.alert("Please fill the subject of the note")

  if (body == "") return window.alert("Please fill the the body of the note")

  addNewNotes(subject, body)
}

Window.prototype.updateUI = () => {
  const notes = JSON.parse(localStorage.getItem("notes_app_storage"))
  const notesDiv = document.getElementById("notes")
  notesDiv.innerHTML = ""
  if (notes) {
    notes.forEach((note) => {
      if (note) {
        notesDiv.appendChild(
          noteObject(note.subject, note.body, note.last_modified, note.id)
        )
      }
    })
  }
}

Window.prototype.updateLocalStorage = function(noteSubject, noteText) {
  let notesList = []

  let json = {
    id: crypto.randomUUID(),
    subject: noteSubject,
    body: noteText,
    last_modified: new Date().toISOString(),
  }

  if (localStorage.getItem("notes_app_storage")) {
    notesList = JSON.parse(localStorage.getItem("notes_app_storage"))
    notesList.push(json)
  } else {
    notesList.push(json)
  }

  localStorage.setItem("notes_app_storage", JSON.stringify(notesList))
}
/*
Window.prototype.editNote = function(e){
  e.target.childNodes[2].contentEditable = e.target.childNodes[2].contentEditable == true ? false : true
  let localStorageList = JSON.parse(localStorage.getItem("notes_app_storage"))

  for (let [i, values] of localStorageList.entries()) {
    if (values.id == id) {
      const [id, ...newLocalStorageList] = localStorageList
      localStorage.setItem("notes_app_storage", JSON.stringify(newLocalStorageList))
      break
    }
  }
  updateUI()
}

Window.prototype.editableToggle = function(e){
  let noteDiv = e.target.parentNode.parentNode
  noteDiv.childNodes[1].contentEditable = noteDiv.childNodes[1].contentEditable == true ? false : true
  noteDiv.childNodes[2].contentEditable = noteDiv.childNodes[2].contentEditable == true ? false : true
}
*/
document.getElementById("saveBtn").addEventListener("click", submit)

updateUI()
