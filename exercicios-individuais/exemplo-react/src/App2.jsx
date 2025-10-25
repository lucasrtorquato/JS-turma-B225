import Titulo from "./Titulo.jsx";
import Tabela from "./Tabela.jsx";
import Contador from "./Contador.jsx";
import CalculadoraIMC from "./CalculadoraIMC.jsx";
import FormularioLogin from "./FormularioLogin.jsx";
import ListaDeCompras from "./ListaDeCompras.jsx";
import CEP from "./CEP.jsx";
import Cadastro from "./Cadastro.jsx";

function AppExemplos() {
  return (
    <div className="App">
      <Titulo titulo="Exemplo de Tabela"/>
      <Tabela />
      <Titulo titulo="Exemplo de Contador"/>
      <Contador />
      <Titulo titulo="Exemplo de IMC"/>
      <CalculadoraIMC />
      <Titulo titulo="Exemplo de Formulário de Login"/>
      <FormularioLogin />
      <Titulo titulo="Exemplo de Lista de Compras/Tarefas"/>
      <ListaDeCompras />
      <Titulo titulo="Exemplo de CEP"/>
      <CEP />
      <Titulo titulo="Exemplo de Cadastro"/>
      <Cadastro />
    </div>
  );
}

export default AppExemplos;
