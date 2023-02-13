import type { Component } from "solid-js";

import { Login } from "./components/client/Login";

import { revolt as client } from "./lib/revolt";
import * as ReChat from "./lib/ReChat";
import { Shell } from "./components/client/Shell";
import Home from "./components/client/Home";
import { MessageBox } from "./components/client/Messages/MessageBox";
import { MessageContainer } from "./components/client/Messages/MessageContainer";
import { Picker } from "./components/experiments/EmojiPicker";

function App() {
  return (
    <main>
      <Login
        client={client}
        userSetter={ReChat.setUser}
        logged={ReChat.loggedIn}
        logSetter={ReChat.setLoggedIn}
      />
      {ReChat.loggedIn() && (
        <>
          <Shell>
            {ReChat.servers.isHome && (
              <>
                <Home />
              </>
            )}
            <div>
              {ReChat.servers.current_channel && (
                <>
                  <MessageContainer />
                  <Picker setMessage={ReChat.setMessages} message={ReChat.messages} type="emoji"/>
                  <MessageBox />
                </>
              )}
            </div>
          </Shell>
        </>
      )}
    </main>
  );
}

export default App;
