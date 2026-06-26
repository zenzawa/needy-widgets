import { Gtk } from "ags/gtk4"
import Gio from "gi://Gio"
import { Accessor } from "gnim";

interface Props {
  x: number;
  y: number;
  classes: Accessor<string>;
  visible: Accessor<boolean>;
}

export default function Pill({x, y, classes, visible}: Props) {
  return (
    <box widthRequest={20} heightRequest={20} visible={visible} class={classes}>
      <Gtk.Picture
        contentFit={Gtk.ContentFit.CONTAIN}
        halign={Gtk.Align.START}
        valign={Gtk.Align.START}
        marginStart={x}
        marginTop={y}
        canShrink={true}
        keepAspectRatio={true}
        file={Gio.File.new_for_path("assets/icon_window_daypass_tablet.png")}
      />
    </box>
  )
}
