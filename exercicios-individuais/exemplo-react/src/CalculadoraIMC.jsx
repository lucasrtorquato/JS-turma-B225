import { useState } from 'react';

export default function CalculadoraIMC() {
  const [peso, setPeso] = useState(''); 
  const [altura, setAltura] = useState(''); 
  const [imc, setImc] = useState(null); 
  const [mensagem, setMensagem] = useState(''); 

 
  const calcularIMC = (e) => {
 
    e.preventDefault();

    const alturaMetros = Number(altura);
    const pesoKg = Number(peso);

    if (!alturaMetros || !pesoKg || alturaMetros <= 0 || pesoKg <= 0) {
      alert('Por favor, preencha o peso e a altura com valores válidos.');
      return;
    }

    const imcCalculado = pesoKg / (alturaMetros * alturaMetros);
    setImc(imcCalculado.toFixed(2));

   
    if (imcCalculado < 18.5) {
      setMensagem('Abaixo do peso');
    } else if (imcCalculado < 24.9) {
      setMensagem('Peso normal');
    } else if (imcCalculado < 29.9) {
      setMensagem('Sobrepeso');
    } else if (imcCalculado < 34.9) {
      setMensagem('Obesidade Grau I');
    } else if (imcCalculado < 39.9) {
      setMensagem('Obesidade Grau II');
    } else {
      setMensagem('Obesidade Grau III');
    }
  };


  const limpar = () => {
    setPeso('');
    setAltura('');
    setImc(null);
    setMensagem('');
  };

  return (
    <div className="container mt-5">
      <div className="card text-center shadow p-4 mx-auto" style={{ maxWidth: '400px' }}>
        <form onSubmit={calcularIMC}>
          <div className="mb-3">
            <label htmlFor="peso" className="form-label">Peso (kg)</label>
            <input
              id="peso"
              type="number"
              className="form-control"
              value={peso} 
              onChange={(e) => setPeso(e.target.value)} 
              placeholder="Ex: 75"
              step="0.1"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="altura" className="form-label">Altura (m)</label>
            <input
              id="altura"
              type="number"
              className="form-control"
              value={altura} 
              onChange={(e) => setAltura(e.target.value)} 
              placeholder="Ex: 1.75"
              step="0.01"
              required
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">Calcular</button>
            <button type="button" className="btn btn-secondary" onClick={limpar}>Limpar</button>
          </div>
        </form>
        {imc && (
          <div className="alert alert-info mt-4">
            <h4>Seu IMC é: {imc}</h4>
            <p className="mb-0">Classificação: <strong>{mensagem}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}