import React, { useState, useEffect } from "react";
import Titulo from "./Titulo";

function Cadastro() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");


  const [erro, setErro] = useState("");

 
  const [usuarios, setUsuarios] = useState(() => {

    const dadosSalvos = localStorage.getItem("usuarios_react");
    if (dadosSalvos) {
   
      return JSON.parse(dadosSalvos);
    }

    return [];
  });


  useEffect(() => {
  
    localStorage.setItem("usuarios_react", JSON.stringify(usuarios));
  }, [usuarios]);


  const salvarUsuario = (event) => {
   
    event.preventDefault();


    if (!nome || !email) {
      setErro("Por favor, preencha todos os campos.");
      return; 
    }


    if (!email.includes("@")) {
      setErro("Por favor, insira um email válido.");
      return;
    }

  
    const novoUsuario = {
      id: Date.now(), 
      nome: nome,
      email: email,
    };

    setUsuarios([...usuarios, novoUsuario]);

 
    setNome("");
    setEmail("");
    setErro("");
  };


  const removeUser = (id) => {
    if (confirm("Deseja realmente deletar o usuário")) {
  
      const novosUsuarios = usuarios.filter((usuario) => usuario.id !== id);

      setUsuarios(novosUsuarios);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <div className="card shadow-sm">
        <div className="card-body">

          {erro && (
            <div className="alert alert-danger" role="alert">
              {erro}
            </div>
          )}

          <form onSubmit={salvarUsuario}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">
                Nome:
              </label>
              <input
                type="text"
                className="form-control"
                id="nome"
                placeholder="Digite seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg">
                Cadastrar
              </button>
            </div>
          </form>


          <hr className="my-5" />

 
          <div>
            
            {usuarios.length === 0 ? (
              <p className="text-muted">Nenhum usuário cadastrado ainda.</p>
            ) : (
                <>
              <h2 className="h4 mb-3">Usuários Cadastrados:</h2>
              <ul className="list-group">
                {usuarios.map((usuario) => (
                  <li
                    key={usuario.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{usuario.nome}</strong>
                      <br />
                      <small className="text-muted">{usuario.email}</small>
                    </div>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeUser(usuario.id)}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
