var Note = [];

const getData = () => {
  var taskName = document.getElementById("taskName").value;
  var taskDate = document.getElementById("taskDate").value;
  var taskTime = document.getElementById("taskTime").value;

  console.log(taskName, taskDate, taskTime);

  var newNote = new Object();
  newNote.name = taskName;
  newNote.date = taskDate;
  newNote.time = taskTime;

  Note.push(newNote);
  console.log(Note);

  document.getElementById("form").reset();
  makeNote();

  //שמירת המערך באיחסון
  localStorage.setItem("MyNotes", JSON.stringify(Note));
};

const makeNote = () => {
  var result = "";
  Note.map((item, index) => {
    result += `
  <div class="noteBody">
  <img src="img/notebg.png">

   <div data-bs-theme="red">
   <button type="button" class="btn-close btn-close-white" aria-label="Close" id="xButton" 
    onclick="deleteNote(${index})"></button>
 </div> 

  <div class="newTask">${item.name}</div>
  <div class="newDate">${item.date}</div>
  <div class="newTime">${item.time}</div>
</div>

  `;
  });

  document.getElementById("container").innerHTML = result;
};

const deleteNote = (index) => {
  Note.splice(index, 1);
  localStorage.setItem("MyNotes", JSON.stringify(Note));
  makeNote();
  console.log(Note);
};

const loadData = () => {
  Note = JSON.parse(localStorage.getItem("MyNotes"));
  if (!Note) {
    console.log(Note);
    Note = [];
  } else {
    makeNote();
  }
};
loadData();

console.log(Note);
