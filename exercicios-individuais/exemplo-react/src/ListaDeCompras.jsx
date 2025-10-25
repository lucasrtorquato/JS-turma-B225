import { useState } from 'react';

export default function ListaDeCompras() {

  const [item, setItem] = useState('');
  const [itens, setItens] = useState([]); 

 
  const AddItem = (e) => {
    e.preventDefault(); 

  
    if (!item.trim()) {
      return; 
    }

    setItens([...itens, item]);

    setItem('');
  };

  const RemoveItem = (indexParaRemover) => {

    const novaLista = itens.filter((_, index) => index !== indexParaRemover);
    setItens(novaLista);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '500px' }}>

        <form onSubmit={AddItem} className="d-flex mb-4">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Digite um item..."
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button type="submit" className="btn btn-success">Adicionar</button>
        </form>

        <h2 className="h5">Itens:</h2>
        
   
        <ul className="list-group">
          {itens.length === 0 && (
            <li className="list-group-item text-muted">Sua lista está vazia.</li>
          )}


          {itens.map((itemDaLista, index) => (
  
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {itemDaLista}
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => RemoveItem(index)} 
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}