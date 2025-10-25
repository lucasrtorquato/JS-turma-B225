function Titulo({ titulo = "Exemplo React" }) {
  return (
    <>
      <hr className="my-5"/>
      <div className="container">
        <h1 className="text-primary">{titulo}</h1>
      </div>
    </>
  );
}

export default Titulo;
