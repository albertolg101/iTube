import type * as youtube from "@/hooks/youtube";
import { List } from "@/components/Theme";
import { PlaylistsListItem } from "@/components/PlaylistsList/PlaylistsListItem.tsx";

export type PlaylistsListSize = "md" | "sm";

export interface PlaylistsListProps {
  playlists: youtube.PlaylistsList;
  size?: PlaylistsListSize;
}

export function PlaylistsList({ playlists, size = "md" }: PlaylistsListProps) {
  return (
    <List $fontSize={size === "md" ? "1rem" : "0.8rem"} $margin="0 10px">
      {Object.values(playlists).map((playlist) => (
        <PlaylistsListItem key={playlist.id} playlist={playlist} size={size} />
      ))}
    </List>
  );
}
