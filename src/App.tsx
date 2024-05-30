import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NewNote from "./components/NewNote";
import NoteList from "./components/NoteList";
import useLocalStorage from "./utils/useLocalStorage";
import { useMemo } from "react";
import {v4 as uuidV4} from "uuid"
import NoteLayout from "./components/NoteLayout";
import Note from "./components/Note";
import EditNote from "./components/EditNotes";

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type simplifiedNote={
  tags:Tag[],
  id:string,
  title:string
}

export type Tag = {
  id: string;
  label: string;
};

export type Note = {
  id: string;
} & NoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type RawNote = {
  id: string;
} & RawNoteData;

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const notesWithTags = useMemo(() => {
    return notes.map((notes) => ({
      ...notes,
      tags: tags.filter((tag) => notes.tagIds.includes(tag.id)),
    }));
  }, [notes, tags]);

  const onCreateNote=({tags,...data}:NoteData)=>{

    return setNotes((prevNotes)=>([...prevNotes,{...data,id:uuidV4(),tagIds:tags.map(tag=>tag.id)}]))
  }
  const onUpdateNote=(id:string,{tags,...data}:NoteData)=>{
    return setNotes(prevNotes=>{
      return prevNotes.map(note=>{
        if(note.id===id)
          {
            return {...note,...data,id:uuidV4(),tagIds:tags.map(tag=>(tag.id))}
          }
          else
          {
            return note
          }
      })
    })
  }
  const onDeleteNote=(id:string)=>{
    return setNotes(prevNotes=>prevNotes.filter((note)=>note.id!==id))
  }
  const addTag=(tag:Tag)=>{
    setTags((prev)=>([...prev,tag]))
  }
  const updateTag=(id:string,label:string)=>{
       setTags(prevTags=>prevTags.map((tag)=>{
        if(tag.id===id)
          {
            return {...tag,label:label}
          }
          else
          {
            return tag
          }
       }))
  }
  const deleteTag=(id:string)=>{
    setTags(prevTags=>prevTags.filter((tag)=>tag.id!==id))
  }
  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<NoteList availableTags={tags} onDeleteTag={deleteTag} onUpdateTag={updateTag} notes={notesWithTags}/>} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags}/>}>
          <Route index element={<Note onDeleteNote={onDeleteNote}/>} />
          <Route path="edit" element={<EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags} />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Container>
  );
}

export default App;
