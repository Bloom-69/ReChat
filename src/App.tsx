import { Ref, Show } from "solid-js";

import { Login } from "./components/client/Login";

import { revolt as client } from "./lib/revolt";
import * as ReChat from "./lib/ReChat";
import { Shell } from "./components/client/Shell";
import Home from "./components/client/Home";
import { MessageBox } from "./components/client/Messages/MessageBox";
import { MessageContainer } from "./components/client/Messages/MessageContainer";
import { Picker } from "./components/experiments/EmojiPicker";
import { createTheme, ThemeProvider } from "@suid/material";

const theme = createTheme({
  palette: {
    primary: {
      main: `${ReChat.settings.appearance.primary_color}`,
    },
    secondary: {
      main: `${ReChat.settings.appearance.secondary_color}`,
    },
  },
});

const themeCanary = createTheme({
  palette: {
    primary: {
      main: "#fbc02d",
    },
    secondary: {
      main: `${ReChat.settings.appearance.secondary_color}`,
    },
  },
});

function App() {
  let bottomRef: Ref<any>;
  return (
    <>
      <Show when={window.location.hostname.includes('rechat-plum.vercel.app')}>
        <ThemeProvider theme={theme}>
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
                        <div ref={bottomRef} />
                        <MessageContainer />
                        <Picker
                          setMessage={ReChat.setMessages}
                          message={ReChat.messages}
                          type="emoji"
                        />
                        <MessageBox />
                      </>
                    )}
                  </div>
                </Shell>
              </>
            )}
          </main>
        </ThemeProvider>
      </Show>
      <Show when={window.location.hostname.includes('localhost')}>
        <ThemeProvider theme={themeCanary}>
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
                        <div ref={bottomRef} />
                        <MessageContainer />
                        <Picker
                          setMessage={ReChat.setMessages}
                          message={ReChat.messages}
                          type="emoji"
                        />
                        <MessageBox />
                      </>
                    )}
                  </div>
                </Shell>
              </>
            )}
          </main>
        </ThemeProvider>
      </Show>
    </>
  );
}

export default App;
