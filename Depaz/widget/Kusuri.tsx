import { Gtk, Gdk } from "ags/gtk4"
import Gio from "gi://Gio"
import { createState } from "ags"
import Pill from "./Pill"
import GLib from "gi://GLib"

function playAudio() {
  GLib.spawn_command_line_async("paplay assets/piporo.wav")
}

export default function Kusuri() {
  const [animating, setAnimating] = createState(false)

  const kusuriClass = animating((a) => `container ${a ? "animate" : ""}`)
  const pillClass = animating((a) => `${a ? "animate" : ""}`)

  const overlay = (<Gtk.Overlay />) as Gtk.Overlay

  const mainContent = (
    <Gtk.Box
      class={kusuriClass}
      heightRequest={180}
      widthRequest={118}
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
    >
      <Gtk.Picture
        contentFit={Gtk.ContentFit.CONTAIN}
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.CENTER}
        canShrink={true}
        keepAspectRatio={true}
        file={Gio.File.new_for_path("assets/icon_window_daypass_none.png")}
      />
    </Gtk.Box>
  ) as Gtk.Box

  const [visibleR1C1, setVisibleR1C1] = createState(true)
  const [visibleR1C2, setVisibleR1C2] = createState(true)
  const [visibleR2C1, setVisibleR2C1] = createState(true)
  const [visibleR2C2, setVisibleR2C2] = createState(true)
  const [visibleR3C1, setVisibleR3C1] = createState(true)
  const [visibleR3C2, setVisibleR3C2] = createState(true)

  const pillR1C1 = (
    <Pill visible={visibleR1C1} classes={pillClass} x={32} y={52} />
  ) as Gtk.Box
  const pillR1C2 = (
    <Pill visible={visibleR1C2} classes={pillClass} x={92} y={52} />
  ) as Gtk.Box
  const pillR2C1 = (
    <Pill visible={visibleR2C1} classes={pillClass} x={32} y={102} />
  ) as Gtk.Box
  const pillR2C2 = (
    <Pill visible={visibleR2C2} classes={pillClass} x={92} y={102} />
  ) as Gtk.Box
  const pillR3C1 = (
    <Pill visible={visibleR3C1} classes={pillClass} x={32} y={152} />
  ) as Gtk.Box
  const pillR3C2 = (
    <Pill visible={visibleR3C2} classes={pillClass} x={92} y={152} />
  ) as Gtk.Box

  overlay.set_child(mainContent)

  overlay.add_overlay(pillR1C1)
  overlay.add_overlay(pillR1C2)
  overlay.add_overlay(pillR2C1)
  overlay.add_overlay(pillR2C2)
  overlay.add_overlay(pillR3C1)
  overlay.add_overlay(pillR3C2)

  let count = 0

  const onClick = () => {
    playAudio()

    setAnimating(true)

    if (count === 0) {
      setVisibleR1C1(false)
    } else if (count === 1) {
      setVisibleR1C2(false)
    } else if (count === 2) {
      setVisibleR2C1(false)
    } else if (count === 3) {
      setVisibleR2C2(false)
    } else if (count === 4) {
      setVisibleR3C1(false)
    } else if (count === 5) {
      setVisibleR3C2(false)
    } else if (count === 6) {
      setVisibleR1C1(true)
      setVisibleR1C2(true)
      setVisibleR2C1(true)
      setVisibleR2C2(true)
      setVisibleR3C1(true)
      setVisibleR3C2(true)
    }


    count = (count + 1) % 7

    setTimeout(() => setAnimating(false), 300)
  }

  return (
    <Gtk.Button
      onClicked={onClick}
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
    >
      {overlay}
    </Gtk.Button>
  )
}
