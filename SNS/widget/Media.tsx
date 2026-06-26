import { interval } from "ags/time"
import { Accessor, createState } from "gnim"
import { Gtk, Gdk } from "ags/gtk4"
import Gio from "gi://Gio"
import GLib from "gi://GLib"

const TOTAL_TWEETS = 127

const getTweet = (id: number | Accessor<number>) => `assets/Tweets/${id}.png`

function playAudio() {
  GLib.spawn_command_line_async("paplay assets/piporo.wav")
}


export default function Media() {
  const [currentTweet, setCurrentTweet] = createState(
    Math.floor(Math.random() * 127),
  )

  const container = (<box></box>) as Gtk.Box
  let picture: Gtk.Picture | null = null

  const addChild = (path: string) => {
    picture = (
      <Gtk.Picture
        contentFit={Gtk.ContentFit.COVER}
        file={Gio.File.new_for_path(path)}
        halign={Gtk.Align.FILL}
        valign={Gtk.Align.FILL}
        hexpand={true}
        vexpand={true}
        canShrink={true}
      />
    ) as Gtk.Picture

    container.append(picture)
  }

  const removeChild = () => {
    if (picture) {
      container.remove(picture)
      picture = null
    }
  }

  let timer = interval(1000 * 120, () => {
    removeChild()
    const c = (currentTweet() + 1) % TOTAL_TWEETS
    setCurrentTweet(c)
    addChild(getTweet(c))
  })

  container.connect("destroy", () => {
    timer.cancel()
    console.log("Timer stopped!")
  })

  const changePicture = () => {
    playAudio()
    timer.cancel()

    timer = interval(1000 * 120, () => {
      removeChild()
      const c = (currentTweet() + 1) % TOTAL_TWEETS
      setCurrentTweet(c)
      addChild(getTweet(c))
    })
  }

  return (
    <Gtk.Button
      onClicked={changePicture}
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
      halign={Gtk.Align.FILL}
      valign={Gtk.Align.FILL}
    >
      {container}
    </Gtk.Button>
  )
}
