import SignInSide from './Component/Login';
import Next from './Component/Next';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInSide />}></Route>
          <Route path="/next" element={<Next />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
