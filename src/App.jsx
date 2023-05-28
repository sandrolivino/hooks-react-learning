import React, { useState, useEffect } from "react";

function App() {
  // Inicializando o estado com o valor inicial de 0
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [resourceType, setResourceType] = useState("posts");

  // Função para incrementar o contador
  const increment = () => {
    setCount((prevState) => prevState + 1);
  };

  // Função para decrementar o contador
  const decrement = () => {
    setCount((prevState) => prevState - 1);
  };

  // Efeito executado após cada renderização do componente
  // useEffect(() => {
  //   // Atualiza o título da página com o valor atual do contador
  //   document.title = `Contagem: ${count}`;

  //   // Função de limpeza do efeito
  //   return () => {
  //     document.title = "React App"; // Restaura o título original da página
  //   };
  // });

  // Esse useEffect recebe parâmetros. Nesse caso, a renderização da página só
  // vai ocorrer quando o parâmetro for alterado.
  // useEffect não pode ser assincrono (ver como usuar isso no ex abaixo)
  // useEffect(() => {
  //   fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
  //     .then(response => response.json())
  //     .then(json => console.log(json))
  // }, [resourceType]);

  // Para usar async await no useEffect é preciso criar uma constante, que
  // receberá uma função seta async. Dentro da função, criar outra constante, que
  // receberá o await fetch. O resultado disso será jogado em outra constante (responseJSON), que
  // receberá o await response.json()
  useEffect(() => {
    const fetchFromResourceType = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${resourceType}`
      );

      const responseJSON = await response.json();

      // Isso aqui pode ser jogado em uma useState
      console.log(responseJSON);

      // Agora o resultado será armazenado no useState items, que pode ser map no render.
      setItems(responseJSON);
    };

     fetchFromResourceType();
  }, [resourceType]);

  const changeResourceType = (resourceType) => {
    setResourceType(resourceType);
  };

  // É possível simular o lifeCycles methods componentDidMount e componentWillUnmount
  // Para simular o componentDidMount, basta criar um useEffect com array de dependências vazio
  // Ele será executado somente no carregamento.
  // useEffect(() => {
  //   console.log('simulando componentDidMount...')
  // }, [])
  // Para simular o componentWillUnmount, basta adicionar uma função de retorno
  useEffect(() => {
    return () => {
      console.log("simulando componentWillUnmount...");
    };
  }, []);

  return (
    <>
      {/* <div style={{ display: "flex", alignItems: "center" }}>
        <p>Contador: {count}</p>
        <button onClick={increment}>Incrementar</button>
        <button onClick={decrement}>Decrementar</button>
        <p>ResourceType selecionado: {resourceType}</p>
      </div> */}

      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={() => {
            changeResourceType("posts");
          }}
        >
          Posts
        </button>
        <button
          onClick={() => {
            changeResourceType("comments");
          }}
        >
          Comments
        </button>
        <button
          onClick={() => {
            changeResourceType("todos");
          }}
        >
          ToDos
        </button>
      </div>
      <div>
        {items.map((item) => (
          <p key={item.id}>{item.id}</p>
        ))}
      </div>
    </>
  );
}

export default App;
