import "./UnderConstruction.css";

const UnderConstruction = () => {
  return (
    <div className="construction-container">
      <div className="construction-animation">
        <div className="cone"></div>
        <div className="hammer"></div>
      </div>
      <h1>🚧 Page Under Construction 🚧</h1>
      <p>We are working hard to bring you something amazing!</p>
    </div>
  );
};

export default UnderConstruction;