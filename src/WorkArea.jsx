const WorkArea = ({ onDrop, onDragOver }) => {
  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={{
        marginTop: "20px",
        width: "100%",
        height: "200px",
        border: "2px dashed black",
      }}
    >
      Drop here to add new element
    </div>
  );
};

export default WorkArea;
