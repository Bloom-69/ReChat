import { Ref, Show } from "solid-js";

import { Login } from "./components/client/Login";

import { revolt as client } from "./lib/revolt";
import * as ReChat from "./lib/ReChat";
import { Shell } from "./components/client/Shell";
import Home from "./components/client/Home";
import { MessageBox } from "./components/client/Messages/MessageBox";
import { MessageContainer } from "./components/client/Messages/MessageContainer";
import { Picker } from "./components/experiments/EmojiPicker";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@suid/material";
import MemberSidebar from "./components/client/Shell/Members";
import { GifBoxPicker } from "./components/experiments/GifBoxPicker";

const main_theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: `${ReChat.settings.appearance.primary_color}`,
    },
  },

  spacing: 4
});

function App() {
  return (
    <>
        <ThemeProvider theme={main_theme}>
        <CssBaseline enableColorScheme/>
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
    </>
  );
}

export default App;
