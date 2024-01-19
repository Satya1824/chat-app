import { Routes, Route } from "react-router-dom";
import ChatPage from "./Pages/ChatPage";
import Home from "./Pages/Home";
import UserListItem from "./components/UserAvatar/UserListItem";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chats" element={<ChatPage />} />
      <Route path="/ab" element={<UserListItem />} />
    </Routes>
  );
}

export default App;
