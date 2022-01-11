import { formatDate } from "./utils.js";

const sectionListNotes = document.querySelector("#list-notes");
//carrega as notas do api
const API_HOST = "http://localhost:3333/notes";

export const loadNotesFromApi = async () =>{
  try{
    const response = await fetch(API_HOST);

    if(!response.ok){
        return console.log("Erro na consulta API");
    }	

    const ListNotes = await response.json();

    ListNotes.forEach(note => {
      note.date = new Date(note.date);
    addNoteToSection(note)
    });

  }catch(error){
    console.error(error);
    alert("Ops, houve um erro ao consultar o api");
  }

}
//cria uma nota do api
export const postNoteToApi = async (textNote) =>{

try {
 const response = await fetch(API_HOST,{ 
    method: "POST",
    headers:{
     "Content-Type": "application/json"
    },
    body:JSON.stringify({text: textNote})
  });
  if (!response.ok)
  return alert("Erro na consulta API");

  const createdNote = response.json();

  createdNote.date = new Date(createdNote.date);

  addNoteToSection(createdNote);

} catch (error) {
  console.log(error);
  alert("Erro na consulta API");
}

}
//deleta uma nova nota da api
const deleteNoteFromApi = async (event, idNote) => {

  try {

    const response = await fetch(API_HOST + `/${idNote}`, {
      method: "DELETE"
    })

    if (!response.ok)
      return alert("Ops, houve um erro ao apagar a nota");

    removeNoteFromSection(event);

  } catch (error) {
    console.log(error);
    alert("Ops, houve um erro ao deletar da api");
  }

}


const createNewNoteElement = ({id, date, text}) => { //desestruturação de objetos usando { }
    const newNoteElement = document.createElement("article");
  
    const pDateElement = document.createElement("p");
    pDateElement.textContent = formatDate(date)
    newNoteElement.appendChild(pDateElement);
  
    const pElement = document.createElement("p");
    pElement.textContent = text;
    newNoteElement.appendChild(pElement);
  
    const trashElement = document.createElement("span");
    trashElement.className = "material-icons";
    trashElement.textContent = "delete_forever";
  
    trashElement.addEventListener("click", (event) => deleteNoteFromApi(event, id));
  
    newNoteElement.appendChild(trashElement);
  
    return newNoteElement;
  }


  export const addNoteToSection = (newNote) => {
    const newNoteElement = createNewNoteElement(newNote);
  
    sectionListNotes.appendChild(newNoteElement);

  }


  const removeNoteFromSection = (event) => {
    const noteToRemove = event.target.parentNode;
    sectionListNotes.removeChild(noteToRemove);
  
  }