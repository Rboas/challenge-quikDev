import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row, Modal, Button, Stack } from 'react-bootstrap';
import Sidbar from '../../components/Sidbar';
import { ContentPost, MCard, MContainer, MRow } from '../../style/style'

function ListPosts() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [listPost, setListPost] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)
  
  const handlerListPosts = async () => {
    const resultListaPosts = await window.FakerApi.get('/posts', {}).catch((response) => response)
    if(resultListaPosts.success === false) {
      alert(resultListaPosts.message);
    }else{
      setListPost(resultListaPosts.data)
    }
  }

  useEffect(() => {
    handlerListPosts();
  },[])

  const creatPost = async () => {
    const res = await window.FakerApi.post('/posts/create', { title, content }).catch((response) => response)
    if(res.success === false) {
      alert(res.message);
    }
    setShow(false)
    setTitle('')
    setContent('')
    handlerListPosts()
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Conteudo do post</Form.Label>
              <Form.Control as="textarea" rows={4} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => creatPost()}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
      <Container as={MContainer}>
        <Row className="justify-content-md-center" as={MRow}>
          <Col md={3}>
            <Sidbar children={
              <Button variant="primary" onClick={handleShow}>
                Novo post
              </Button>
            } />
          </Col>
          <Col md={6} as={ContentPost}>
          { listPost?.map((post, key) => (
              <Card key={key} as={MCard}>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  
                  <Card.Text>
                    {post.content}
                  </Card.Text>

                  <Card.Link href={`/posts/${post.id}`}>
                    Ler
                  </Card.Link>
                </Card.Body>
              </Card>
            ))
          }
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ListPosts;