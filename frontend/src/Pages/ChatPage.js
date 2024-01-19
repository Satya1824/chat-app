import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import MyChats from "../components/MyChats.js";
import ChatBox from "../components/ChatBox";
import Sidebar from "../components/miscellaneous/Sidebar";
import { Box } from "@chakra-ui/react";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <Sidebar />}

      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;

// import { useState } from "react";
// import MyChats from "../components/MyChats.js";
// import ChatBox from "../components/ChatBox";
// import Sidebar from "../components/miscellaneous/Sidebar";
// import { ChatState } from "../context/ChatProvider";

// const Chatpage = () => {
//   const [fetchAgain, setFetchAgain] = useState(false);
//   const { user } = ChatState();

//   return (
//     <div style={{ width: "100%" }}>
//       {user && <Sidebar />}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         w="100%"
//         h="91.5vh"
//         p="10px"
//       >
//         {user && <MyChats fetchAgain={fetchAgain} />}
//         {user && (
//           <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
//         )}
//       </Box>
//     </div>
//   );
// };

// export default Chatpage;
