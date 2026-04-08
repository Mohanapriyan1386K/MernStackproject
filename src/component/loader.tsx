import { useSelector } from "react-redux";
import { FourSquare } from "react-loading-indicators";

function Loader() {
  const isLoading = useSelector((state: any) => state.loader.isLoading);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255,255,255,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <FourSquare color="#008080" size="medium" />
    </div>
  );
}

export default Loader;