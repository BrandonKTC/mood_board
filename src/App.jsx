import { useState } from "react";
import { useGlobalContext } from "./context";
import Gallery from "./Gallery";
import SearchForm from "./SearchForm";
import WorkArea from "./WorkArea";
import ElementList from "./ElementList";

const App = () => {
  const { searchTerm } = useGlobalContext();
  const [elements, setElements] = useState([
    {
      id: 1,
      name: "cat",
      src:
        "https://images.unsplash.com/photo-1573865526739-10659fec78a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzUyMDV8MHwxfHNlYXJjaHwyfHxjYXR8ZW58MHx8fHwxNzE2NzI5MTgyfDA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: 2,
      name: "dog",
      src:
        "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzUyMDV8MHwxfHNlYXJjaHw5fHxkb2d8ZW58MHx8fHwxNzE2NzMzOTc3fDA&ixlib=rb-4.0.3&q=80&w=1080",
    },
  ]);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const newItem = JSON.parse(e.dataTransfer.getData("item"));
    setElements((prevElements) => [
      ...prevElements,
      { ...newItem, id: prevElements.length + 1 },
    ]);
  };

  const handleDelete = (id) => {
    setElements((prevElements) =>
      prevElements.filter((element) => element.id !== id)
    );
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
