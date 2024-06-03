import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import List from './components/List';
import Detail from './components/Detail';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/react-star-wars' element={<List />} />
      <Route path='/react-star-wars/detail' element={<Detail />} />
    </Routes>
    </>
  );
}

export default App;
