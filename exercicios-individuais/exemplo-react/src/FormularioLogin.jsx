import { useState } from 'react';

export default function FormularioLogin() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState(''); 


  const enviaLogin = (e) => {

    e.preventDefault();

    if (email === 'aluno@email.com' && senha === 'react123') {
      setMensagem('Login bem-sucedido! Bem-vindo!');
    } else {
      setMensagem('E-mail ou senha incorretos. Tente novamente.');
    }
  };


  return (
    <div className="container mt-5">
      <div className="card text-center shadow p-4 mx-auto" style={{ maxWidth: '400px' }}>

        <form onSubmit={enviaLogin}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="nome@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">E-mail</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="senha"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <label htmlFor="senha">Senha</label>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg">Entrar</button>
          </div>
        </form>

        {mensagem && (
          <div 
            className={`alert mt-4 ${mensagem.includes('bem-sucedido') ? 'alert-success' : 'alert-danger'}`}
          >
            {mensagem}
          </div>
        )}
      </div>
    </div>
  );
}