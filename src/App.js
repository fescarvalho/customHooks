import React from 'react';
import useFetch from './hooks/useFetch';
import useLocalStorage from './hooks/useLocalStorage';

const App = () => {
  const [produto, setProduto] = useLocalStorage('produto', '');
  const { request, data, loading, error } = useFetch();

  React.useEffect(() => {
    async function fetchData() {
      const { response, json } = await request(
        'https://ranekapi.origamid.dev/json/api/produto/',
      );
      console.log(response, json);
    }
    fetchData();
  }, [request]);

  function handleClick({ target }) {
    setProduto(target.innerText);
  }

  if (error) return <p>Error</p>;
  if (loading) return <p>Carregando...</p>;
  if (data)
    return (
      <div>
        <p>Produto prefeiros : {produto}</p>
        <button onClick={handleClick}> Smartphone</button>
        <button onClick={handleClick}> Notebook</button>

        {data.map((produto) => (
          <div key={produto.id}>
            <h1>{produto.nome}</h1>
          </div>
        ))}
      </div>
    );
  else return null;
};

export default App;
