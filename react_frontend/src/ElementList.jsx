const ElementList = ({ elements, onDragStart, onDelete }) => {
  return (
    <div>
      {elements.map((element, i) => (
        <div
          key={i}
          draggable
          onDragStart={(e) => onDragStart(e, element)}
          style={{ margin: "10px", border: "1px solid black", padding: "10px" }}
        >
          <img src={element.src} alt={element.name} width="100" />
          <p>{element.name}</p>
          <button onClick={() => onDelete(element.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ElementList;
