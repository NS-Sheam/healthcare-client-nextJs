import Link from "next/link";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { DrawerItem } from "@/types";

type ISidebarItemProps = {
  item: DrawerItem;
  index: number;
};

const SidebarItem = ({ index, item }: ISidebarItemProps) => {
  return (
    <Link href="/">
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItem;
