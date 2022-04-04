import React, { useEffect, useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// import { Container } from './styles';

function Sidbar({ children }) {
  const navigate = useNavigate();
  const [dataMe, setDataMe] = useState()
  const [contPost, setContPost] = useState(0)

  const handleLogout = async () => {
    const resLogout = await window.FakerApi.post('/logout', {}).catch((response) => response)
    if(resLogout.success === true) {
      alert(resLogout.message)
      navigate("/", { replace: true });
    }
  }

  const handleMe = async () => {
    const resMe = await window.FakerApi.get('/me', {}).catch((response) => response)
    if(resMe.success === true) {
      setDataMe(resMe.data)
      handleContPost(resMe.data.id)
    }
  }

  const handleContPost = async (idUser) => {
    const resultListaPosts = await window.FakerApi.get('/posts', {}).catch((response) => response)
    const countRes = resultListaPosts.data.filter((post) => {
      if(post.user_id === idUser) {
        return true
      }
    })
    setContPost(countRes.length)
  }

  useEffect(() => {
    handleMe()
  },[])

  return (
    <>
      <Stack gap={3}>
        <h3>{dataMe?.name}</h3>
        <p>{contPost} post criados</p>
        {children && children}
        <Button onClick={() => handleLogout()}>Sair</Button>
      </Stack>
      
    </>
  )
}

export default Sidbar;