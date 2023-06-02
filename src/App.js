import { Routes, Route } from 'react-router-dom'
import ChatView from './views/Chat';

function App() {
  return <Routes>
    <Route path='/' element={<ChatView />}/>
  </Routes>
}

export default App;
