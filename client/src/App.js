import Routess from "./routes";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Routess></Routess>
    </div>
  );
}

export default App;
