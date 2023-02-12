import { RE_MENTIONS } from "revolt.js";

import { createComponent, CustomComponentProps } from "./remarkRegexComponent";
import { revolt } from "../../../lib/revolt";
import { Avatar, Chip } from "@suid/material";

export function RenderMention({ match }: CustomComponentProps) {
  const user = revolt.users.get(match)!;
  return (
    <Chip
      icon={
        <Avatar
          sx={{width: 24, height: 24}}
          src={user.generateAvatarURL()}
          alt={user.username}
          class="w-5 h-5 rounded-full"
        />
      }
      label={<>@{user.username}</>}
    />
  );
}

export const remarkMention = createComponent(
  "mention",
  RE_MENTIONS,
  (match: any) => revolt.users.has(match),
);
