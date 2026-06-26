import app from "ags/gtk4/app"
import { Gtk } from "ags/gtk4"
import Media from "./Media"

export default function Main() {
  return (
    <Gtk.Window
      visible
      title="Social Media"
      application={app}
      class="Main"
      defaultWidth={450}
      defaultHeight={550}
      iconName="gjs"
    >
      <Media />
    </Gtk.Window>
  )
}
