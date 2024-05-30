import NoteForm from "./NoteForm"
import { NoteData,Tag } from "../App"
import { Stack } from "react-bootstrap"
import { useNote } from "./NoteLayout"
type EditFormProps={
    onSubmit:(id:string,data:NoteData)=>void
    onAddTag:(tag:Tag)=>void
    availableTags:Tag[]
}
const EditNote = ({onSubmit,onAddTag,availableTags}:EditFormProps) => {
    const note=useNote()
    return (
    <Stack gap={4}>
        <h1>
            New Note
        </h1>
        <NoteForm onSubmit={data=>onSubmit(note.id,data)} onAddTag={onAddTag} availableTags={availableTags} title={note.title} tags={note.tags} markdown={note.markdown}/>
    </Stack>
  )
}

export default EditNote