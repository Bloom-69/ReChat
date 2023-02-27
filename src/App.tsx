import { Ref, Show } from "solid-js";

import { Login } from "./components/client/Login";

import { revolt as client } from "./lib/revolt";
import * as ReChat from "./lib/ReChat";
import { Shell } from "./components/client/Shell";
import Home from "./components/client/Home";
import { MessageBox } from "./components/client/Messages/MessageBox";
import { MessageContainer } from "./components/client/Messages/MessageContainer";
import { Picker } from "./components/experiments/EmojiPicker";
import { Container, createTheme, ThemeProvider } from "@suid/material";
import MemberSidebar from "./components/client/Shell/Members";
import { GifBoxPicker } from "./components/experiments/GifBoxPicker";

const theme = createTheme({
  palette: {
    primary: {
      main: `${ReChat.settings.appearance.primary_color}`,
    },
  },
});

const themeCanary = createTheme({
  palette: {
    primary: {
      main: "#fbc02d",
    },
  },
});

const themeDev = createTheme({
  palette: {
    primary: {
      main: "#81c784",
    },
  },
});

function App() {
  let bottomRef: Ref<any>;
  return (
    <>
      <Show when={window.location.hostname.includes("client")}>
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
                        <MemberSidebar />
                        <MessageContainer />
                        <Picker
                          setMessage={ReChat.setMessages}
                          message={ReChat.messages}
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
      <Show when={window.location.hostname.includes("localhost")}>
        <ThemeProvider theme={themeDev}>
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
                        <MemberSidebar />
                        <MessageContainer />
                        <Picker
                          setMessage={ReChat.setMessages}
                          message={ReChat.messages}
                        />
                        <GifBoxPicker
                          setMessage={ReChat.setMessages}
                          message={ReChat.messages}
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
      <Show when={window.location.hostname.includes("canary")}>
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
                        <MemberSidebar />
                        <MessageContainer />
                        <Picker
                          setMessage={ReChat.setMessages}
                          message={ReChat.messages}
                        />
                        <GifBoxPicker
                          setMessage={ReChat.setMessages}
                          message={ReChat.messages}
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
