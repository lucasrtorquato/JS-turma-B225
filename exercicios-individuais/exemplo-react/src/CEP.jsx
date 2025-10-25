import  { useState, useEffect } from 'react';

function CEP() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState('');

  async function buscarEndereco() {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        setEndereco(null);
        setErro('CEP não encontrado.');
      } else {
        setEndereco(data);
        setErro(null);
      }
    } catch (error) {
      setEndereco(null);
      setErro('Erro ao buscar o CEP. Tente novamente.');
      console.error("Erro na busca do CEP:", error);
    }
  }

  function handleCepChange(event) {
    const novoCep = event.target.value.replace(/\D/g, ''); 
            setCep(novoCep);
  }

  return (
    <div className="container mt-5 text-center">
      <div className="card p-4">
        <input
          type="text"
          value={cep}
          onInput={handleCepChange}
          placeholder="Digite o CEP (apenas números)"
          maxLength="8"
          className="form-control mb-3"
        />
        <button
          onClick={buscarEndereco}
          className="btn btn-primary"
        >
          Buscar
        </button>
        {erro && <p>{erro}</p>}
        {endereco && (
          <div className="mt-3">
            <p className="mb-1"><strong>Logradouro:</strong> {endereco.logradouro}</p>
            <p className="mb-1"><strong>Bairro:</strong> {endereco.bairro}</p>
            <p className="mb-1"><strong>Cidade:</strong> {endereco.localidade}</p>
            <p className="mb-1"><strong>UF:</strong> {endereco.uf}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CEP;