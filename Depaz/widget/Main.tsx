import app from "ags/gtk4/app"
import { Gtk } from "ags/gtk4"
import Kusuri from "./Kusuri"

export default function Main() {
  return (
    <Gtk.Window
      visible
      class="bg"
      application={app}
      defaultWidth={185}
      defaultHeight={240}
      title="Depaz"
      iconName="needy-widget"
    >
      <Kusuri />
    </Gtk.Window>
  )
}
