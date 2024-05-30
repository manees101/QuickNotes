import NoteForm from "./NoteForm"
import { NoteData,Tag } from "../App"
import { Stack } from "react-bootstrap"
type NoteFormProps={
    onSubmit:(data:NoteData)=>void
    onAddTag:(tag:Tag)=>void
    availableTags:Tag[]
}
const NewNote = ({onSubmit,onAddTag,availableTags}:NoteFormProps) => {
  
    return (
    <Stack gap={4}>
        <h1>
            New Note
        </h1>
        <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
    </Stack>
  )
}

export default NewNote