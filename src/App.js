import { useEffect, useState } from "react";

function App() {
  const [apiData, setApiData] = useState([]);
  const [dataS, setDataS] = useState(10);
  const [mainPage, setMainPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts");
    const json = await data.json();
    console.log(json);
    setApiData(json);
  };

  const pageSizeHandler = (e) => {
    setDataS(parseInt(e.target.value, 10));
    setMainPage(1);
  };

  const nextHandler = () => {
    setMainPage((prev) => prev + 1);
  };

  const prevHandler = () => {
    setMainPage((prev) => prev - 1);
  };
  const sIndex = (mainPage - 1) * dataS;
  const eIndex = sIndex + dataS;
  const newData = apiData.slice(sIndex, eIndex);

  return (
    <div className="App">
      <select
        value={dataS}
        onChange={pageSizeHandler}
        style={{ padding: "10px 20px", backgroundColor: "blue" }}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={apiData.length}>All</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {newData.map((exp) => (
            <div>
              <tr>
                <td>{exp.id}</td>
                <td>{exp.title}</td>
                <td>{exp.body}</td>
              </tr>
            </div>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px"
        }}
      >
        <button
          onClick={prevHandler}
          style={{ padding: "10px 20px" }}
          disabled={mainPage === 1}
        >
          Prev
        </button>
        <button onClick={nextHandler} style={{ padding: "10px 20px" }}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
