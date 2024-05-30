import { Row, Stack, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Form } from "react-bootstrap"
import { useMemo, useState } from "react"
import ReactSelect from "react-select"
import { Tag,simplifiedNote } from "../App"
import NoteCard from "./NoteCard"
import EditTagsModal from "./EditTagsModal"
type NoteListProps={
    availableTags:Tag[],
    notes:simplifiedNote[],
    onDeleteTag:(id:string)=>void,
    onUpdateTag:(id:string,label:string)=>void
}
const NoteList = ({availableTags,notes,onDeleteTag,onUpdateTag}:NoteListProps) => {
    const [title, setTitle] = useState("")
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const filteredNotes=useMemo(()=>{
        return notes.filter(note=>{
            return (
                (title===""||note.title.toLowerCase().includes(title.toLowerCase()))&&
                (selectedTags.length===0 || selectedTags.every(tag=>note.tags.some(t=>t.id===tag.id)))
            )
        })
    },[title,selectedTags,notes])
  return (
    <>
    <Row>
        <Col>
        <h1>    
        Quick Notes
        </h1>
        </Col>
        <Col xs="auto">
            <Stack direction="horizontal" gap={4}>
                <Link to={"/new"}>
             <Button type="button" variant="primary">
              Create
             </Button>
                </Link>
              <Button variant="outline-secondary" onClick={()=>setIsModalOpen(true)}>
                Edit Tags
                </Button>  
            </Stack>
        </Col>
    </Row>
    <Form className="my-4">
        <Row>
            <Col>
            <Form.Group controlId="title">
             <Form.Label>
                Title
             </Form.Label>
             <Form.Control onChange={(e)=>setTitle(e.target.value)} value={title}/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="tags">
            <Form.Label>Tags</Form.Label>
            <ReactSelect isMulti
            options={availableTags.map((tag)=>({
                label:tag.label,value:tag.id
            }))}
            value={selectedTags.map((tag)=>({
                label:tag.label, value:tag.id
            }))}
            onChange={tags=>setSelectedTags(tags.map((tag)=>({
                label:tag.label,id:tag.value
            })))}
            />
            </Form.Group>
            </Col>
        </Row>
    </Form>
    <Row xs={1} sm={2} lg={3} xl={4} className="gap-3">
    {filteredNotes.map((note=>
        <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags}/>
        </Col>
    ))}
    </Row>
    <EditTagsModal availableTags={availableTags} onDeleteTag={onDeleteTag} onUpdateTag={onUpdateTag} show={isModalOpen} handleClose={()=>setIsModalOpen(false)}/>
    </>
  )
}

export default NoteList