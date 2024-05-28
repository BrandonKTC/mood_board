import { useState, useEffect } from "react";
import { useGlobalContext } from "./context";
import Gallery from "./Gallery";
import SearchForm from "./SearchForm";
import WorkArea from "./WorkArea";
import ElementList from "./ElementList";
import axios from "axios";

const App = () => {
  const { searchTerm } = useGlobalContext();
  const [elements, setElements] = useState([{}]);

  const fetchAPI = async () => {
    const res = await axios.get("http://127.0.0.1:5000/elements");
    setElements(res.data.elements);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const newItem = JSON.parse(e.dataTransfer.getData("item"));

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/elements",
        newItem
      );

      setElements((prevElements) => [...prevElements, response.data]);
    } catch (error) {
      console.error("Erreur lors de la requête POST", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/elements/${id}`
      );

      if (response.status !== 204) {
        throw new Error("Failed to delete element");
      }

      setElements((prevElements) =>
        prevElements.filter((element) => element.id !== id)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ display: "flex" }}>
      <main>
        <SearchForm />
        <Gallery elements={elements} onDragStart={handleDragStart} />
      </main>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <ElementList
          elements={elements}
          onDragStart={handleDragStart}
          onDelete={handleDelete}
        />
        <WorkArea
          element={elements}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        />
      </div>
    </div>
  );
};

export default App;
