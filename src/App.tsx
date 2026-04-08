import { Toaster } from "react-hot-toast";
import GlobalModal from "./component/GlobalModal";
import AppRouter from "./router";
import Loader from "./component/loader";

function App() {
  return (
    <div>
      <Loader />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <GlobalModal />
      <AppRouter />
    </div>
  );
}

export default App;
