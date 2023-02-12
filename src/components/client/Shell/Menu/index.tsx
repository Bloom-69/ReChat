import { Component } from "solid-js";

import * as ReChat from "../../../../lib/ReChat";

import { revolt } from "../../../../lib/revolt";

import {Menu as MenuMUI, MenuItem} from "@suid/material"

function logoutFromRevolt() {
  ReChat.setLoggedIn(false);
  ReChat.setSettings("session", undefined);
  ReChat.setUser("user_id", undefined);
  ReChat.setUser("username", undefined);
  ReChat.setUser("session_type", undefined);
  ReChat.setServers("current_channel", undefined);
  ReChat.setServers("current_server", undefined);
  ReChat.setServers("isHome", false);
  ReChat.setSettings("show", false);
  if (revolt.session) revolt.destroy();
}

const Menu: Component = () => {
  return <MenuMUI open={ReChat.showMenu()} onClose={() => ReChat.setShowMenu(false)}>
    <MenuItem>
        {revolt.user.username}
    </MenuItem>
    <MenuItem onClick={logoutFromRevolt}>
        Logout
    </MenuItem>
  </MenuMUI>;
};

export { Menu };
