import { Row, Button, Col, Stack, Badge } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useNote } from "./NoteLayout"
import ReactMarkdown from "react-markdown"
type NoteProps={
  onDeleteNote:(id:string)=>void
}
const Note = ({onDeleteNote}:NoteProps) => {
   const note=useNote()
   const navigate=useNavigate()
  return (
   <>
    <Row className="justify-content-center mb-4">
     <Col>
     <h1>
        {note.title}
     </h1>

     {note.tags.length >0 && <Stack
     gap={3} 
     direction="horizontal"
     className="flex-wrap"
     >
        {note.tags.map((tag=><Badge key={tag.id} className="text-truncate">{tag.label}</Badge>))}
        </Stack>}
     </Col>
     <Col xs="auto">
            <Stack direction="horizontal" gap={4}>
                <Link to={`/${note.id}/edit`}>
             <Button type="button" variant="primary">
              Edit
             </Button>
                </Link>
              <Button variant="outline-danger" onClick={()=>{onDeleteNote(note.id);navigate("/")}}>
                Delete
                </Button>
                <Link to={".."}>
                    <Button variant="outline-secondary">
                     Back
                    </Button>
                </Link>  
            </Stack>
        </Col>
    </Row>
    <ReactMarkdown>
      {note.markdown}
    </ReactMarkdown>
   </>
  )
}

export default Note