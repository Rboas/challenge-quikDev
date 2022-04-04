import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import Sidbar from '../../components/Sidbar';
import { ContentPost, MCommentContent, MContainer, MNewComment, MPost, MRow } from '../../style/style';

// import { Container } from './styles';

function Post() {
  const { id } = useParams();
  const [dataPost, setDataPost] = useState([]);
  const [content, setContent] = useState('');
  const [dataComments, setDataComments] = useState([])

  const handlerPost = async () => {
    const resultPost = await window.FakerApi.get('/posts/view', { post_id: Number(id) }).catch((response) => response)
    if(resultPost.success === false) {
      alert(resultPost.message)
    }else{
      setDataPost(resultPost.data)
    } 
  }

  const handlerNewComment = async (content) => {
    const resultNewComment = await window.FakerApi.post('/comments/create', { post_id: Number(id), comment: { content } }).catch((response) => response)
    setContent('')
    alert(resultNewComment.message)
    handlerComment()
  }

  const handlerComment = async () => {
    const resultComment = await window.FakerApi.get('/comments', { post_id: Number(id) }).catch((response) => response)
    if(resultComment.success == true){
      setDataComments(resultComment.data)
    }else{
      alert(resultComment.message)
    }
  }

  useEffect(() => {
    handlerPost()
    handlerComment()
  },[])

  return (
    <div>
      <Container as={MContainer}>
        <Row className="justify-content-md-center" as={MRow}>
          <Col md={3}>
            <Sidbar />
          </Col>
          <Col md={6} as={ContentPost}>
            <MPost>
              <h1>{dataPost?.title}</h1>
              <p>{dataPost?.content}</p>
            </MPost>

            <MNewComment>
              <Form>
                <Form.Group
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Novo comentario</Form.Label>
                  <Form.Control as="textarea" rows={4} />
                </Form.Group>
              </Form>
              <Button variant="primary" onClick={() => handlerNewComment(content)}>
                Salvar
              </Button>
            </MNewComment>

            <div>
                <h4>Comentarios</h4>
                { dataComments?.map((item, key) => (
                  <MCommentContent key={key}>
                    <p>{item.content}</p>
                  </MCommentContent>
                )) }
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Post;