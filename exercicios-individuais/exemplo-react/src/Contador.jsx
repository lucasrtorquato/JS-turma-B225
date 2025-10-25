import { useState } from 'react'; 

export default function Contador() {
  const [count, setCount] = useState(0);

  const incrementar = () => {
    setCount(count + 1);
  };

  const decrementar = () => {
    setCount(count - 1);
  };

  return (
    
    <div className="container mt-5">
      <div
        className="card text-center shadow p-4 mx-auto"
        style={{ maxWidth: '400px' }}
      >
        <h2 className="display-4 mb-4">{count}</h2>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-danger btn-lg" onClick={decrementar}>
            Diminuir
          </button>
          <button className="btn btn-success btn-lg" onClick={incrementar}>
            Aumentar
          </button>
        </div>
      </div>
    </div>
  );
}