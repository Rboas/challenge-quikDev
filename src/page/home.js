import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import { Container } from './styles';

function Home() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameLogin, setUsernameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const navigate = useNavigate();

  const register = async () => {
    const res = await window.FakerApi.post('/register', { name, username, password }).catch((response) => response)
    if(res.success === false) {
      alert(res.message);
    }
    setName('')
    setUsername('')
    setPassword('')
  }

  const login = async () => {
    const resLogin = await window.FakerApi.post('/login', { username: usernameLogin, password: passwordLogin }).catch((response) => response)
    if(resLogin.success === false) {
      alert(resLogin.message);
    }else{
      navigate("/posts", { replace: true });
    }
  }

  return (
    <div className="container">
      <main className="main">
        <div className="content">
          <div className="form">
            <h3>Registre-se</h3>
            <input className="input" type="text" placeholder='Nome' value={name} onChange={e => setName(e.target.value)}/>
            <input className="input" type="text" placeholder='Usuario' value={username} onChange={e => setUsername(e.target.value)}/>
            <input className="input" type="text" placeholder='Senha' value={password} onChange={e => setPassword(e.target.value)}/>
            <button type='button' className="button" onClick={() => register()}>
              Criar conta
            </button>
          </div>
          <hr size="1"/>
          <div className="form">
            <h3>Iniciar sessão</h3>
            <input className="input" type="text" placeholder='Usuario' value={usernameLogin} onChange={e => setUsernameLogin(e.target.value)}/>
            <input className="input" type="text" placeholder='Senha' value={passwordLogin} onChange={e => setPasswordLogin(e.target.value)}/>
            <button type='button' className="button" onClick={() => login()}>
              Entrar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;