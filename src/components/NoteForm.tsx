import { Form,Stack,Row, Col, Button} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { FormEvent, useRef, useState } from "react"
import { NoteData,Tag } from "../App"
import {v4 as uuidV4} from "uuid"
type NoteFormProps={
    onSubmit:(data:NoteData)=>void,
    onAddTag:(tag:Tag)=>void,
    availableTags:Tag[]
}&Partial<NoteData>
const NoteForm = ({onSubmit,onAddTag,availableTags, title="",tags=[],markdown=""}:NoteFormProps) => {
    const navigate=useNavigate()
    const titleRef=useRef<HTMLInputElement>(null)
    const markdownRef=useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)

    const handleSubmit=(e:FormEvent)=>{
       e.preventDefault()
       onSubmit({
        title:titleRef.current!.value,
        markdown:markdownRef.current!.value,
        tags:selectedTags
       })
       navigate("..")
    }
  return (
    <Form onSubmit={handleSubmit}>
        <Stack gap={2}>
        <Row>
            <Col>
            <Form.Group controlId="title" >
            <Form.Label>Title</Form.Label>
            <Form.Control required ref={titleRef} defaultValue={title}/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="tags">
            <Form.Label>Tags</Form.Label>
            <CreatableReactSelect isMulti
            onCreateOption={label=>{
                const newTag={id:uuidV4(),label}
                onAddTag(newTag)
                setSelectedTags((prev)=>([...prev,newTag]))
            }}
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
        <Form.Group controlId="markdown">
         <Form.Label>
            Body
         </Form.Label>
         <Form.Control required as={"textarea"} rows={15} defaultValue={markdown}  ref={markdownRef}/>
        </Form.Group>
        <Stack direction="horizontal" className=" justify-content-end" gap={2}>
       <Button variant="primary" type="submit">
        Save
       </Button>
       <Link to={".."   }>
       <Button variant="outline-secondary" type="button">
        Cancel
       </Button>
       </Link>
        </Stack>
        </Stack>

    </Form>
  )
}

export default NoteForm