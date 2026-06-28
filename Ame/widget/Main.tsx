import { interval, Timer, timeout } from "ags/time"
import { Gdk, Gtk } from "ags/gtk4"
import { createState } from "ags"
import Gio from "gi://Gio"
import GLib from "gi://GLib"

function playAudio(audio: string) {
  GLib.spawn_command_line_async(`paplay assets/audio/${audio}`)
}

const sleep = (ms: number) =>
  new Promise<void>((resolve) => timeout(ms, resolve))

interface Animation {
  path: string
  count: number
  name: string
}

const FPS = 3
const SWITCH_ANIMATION_DELAY = 15
const TRANSFORMATION_FPS = 14

const ame: any = {
  blank: {
    path: "assets/animations/ame/blank",
    count: 12,
    name: "blank",
  },
  comic: {
    path: "assets/animations/ame/comic",
    count: 1,
    name: "comic",
  },
  egosearching: {
    path: "assets/animations/ame/egosearching",
    count: 4,
    name: "egosearching",
  },
  game: {
    path: "assets/animations/ame/game",
    count: 3,
    name: "game",
  },
  handspinner: {
    path: "assets/animations/ame/handspinner",
    count: 10,
    name: "handspinner",
  },
  happy: {
    path: "assets/animations/ame/happy",
    count: 8,
    name: "happy",
  },
  headphone: {
    path: "assets/animations/ame/headphone",
    count: 2,
    name: "headphone",
  },
  nail: {
    path: "assets/animations/ame/nail",
    count: 4,
    name: "nail",
  },
  selfie: {
    path: "assets/animations/ame/selfie",
    count: 5,
    name: "selfie",
  },
  transformation: {
    path: "assets/animations/ame/transformation",
    count: 211,
    name: "transformation",
  },
  vomiting: {
    path: "assets/animations/ame/vomiting",
    count: 13,
    name: "vomiting",
  },
  yanda_charisma: {
    path: "assets/animations/ame/yanda_charisma",
    count: 12,
    name: "yanda_charisma",
  },
}

const ameAnimations = [
  "comic",
  "egosearching",
  "handspinner",
  "nail",
  "vomiting",
  "yanda_charisma",
  "game",
  "happy",
  "headphone",
  "selfie",
]

const kAngel: any = {
  "100ksilver": {
    path: "assets/animations/kAngel/100ksilver",
    count: 8,
    name: "100ksilver",
  },
  akaruku_superchat: {
    path: "assets/animations/kAngel/akaruku_superchat",
    count: 3,
    name: "akaruku_superchat",
  },
  angel: {
    path: "assets/animations/kAngel/angel",
    count: 1,
    name: "angel",
  },
  anguri: {
    path: "assets/animations/kAngel/anguri",
    count: 1,
    name: "anguri",
  },
  anken_business: {
    path: "assets/animations/kAngel/anken_business",
    count: 28,
    name: "anken_business",
  },
  anken_juice: {
    path: "assets/animations/kAngel/anken_juice",
    count: 20,
    name: "anken_juice",
  },
  balanceball_asmr: {
    path: "assets/animations/kAngel/balanceball_asmr",
    count: 9,
    name: "balanceball_asmr",
  },
  game: {
    path: "assets/animations/kAngel/game",
    count: 4,
    name: "game",
  },
  game_superchat: {
    path: "assets/animations/kAngel/game_superchat",
    count: 5,
    name: "game_superchat",
  },
  gaoo: {
    path: "assets/animations/kAngel/gaoo",
    count: 1,
    name: "gaoo",
  },
  h: {
    path: "assets/animations/kAngel/h",
    count: 5,
    name: "h",
  },
  h_superchat: {
    path: "assets/animations/kAngel/h_superchat",
    count: 4,
    name: "h_superchat",
  },
  ice: {
    path: "assets/animations/kAngel/ice",
    count: 5,
    name: "ice",
  },
  idle: {
    path: "assets/animations/kAngel/idle",
    count: 1,
    name: "idle",
  },
  kakkoyoku_superchat: {
    path: "assets/animations/kAngel/kakkoyoku_superchat",
    count: 7,
    name: "kakkoyoku_superchat",
  },
  kyouso: {
    path: "assets/animations/kAngel/kyouso",
    count: 8,
    name: "kyouso",
  },
  pray: {
    path: "assets/animations/kAngel/pray",
    count: 4,
    name: "pray",
  },
  sleepy: {
    path: "assets/animations/kAngel/sleepy",
    count: 9,
    name: "sleepy",
  },
  teach: {
    path: "assets/animations/kAngel/teach",
    count: 5,
    name: "teach",
  },
  vomiting: {
    path: "assets/animations/kAngel/vomiting",
    count: 14,
    name: "vomiting",
  },
}

const kAngelAnimations = [
  "100ksilver",
  "akaruku_superchat",
  "angel",
  "anguri",
  "anken_business",
  "anken_juice",
  "balanceball_asmr",
  "game",
  "game_superchat",
  "gaoo",
  "h",
  "h_superchat",
  "ice",
  "idle",
  "kakkoyoku_superchat",
  "kyouso",
  "pray",
  "sleepy",
  "teach",
  "vomiting",
]

export default function Main() {
  const [showKAngel, setShowKAngel] = createState(false)

  const overlay = (
    <Gtk.Overlay
      halign={Gtk.Align.FILL}
      valign={Gtk.Align.FILL}
      hexpand={true}
      vexpand={true}
    />
  ) as Gtk.Overlay

  const mainContent = (
    <Gtk.Picture
      contentFit={Gtk.ContentFit.COVER}
      halign={Gtk.Align.FILL}
      valign={Gtk.Align.FILL}
      hexpand={true}
      vexpand={true}
      canShrink={true}
      keepAspectRatio={true}
      file={Gio.File.new_for_path("assets/bg.png")}
    />
  ) as Gtk.Picture

  const createSprite = (path = "assets/animations/headphone/0.png") =>
    (
      <Gtk.Box>
        <Gtk.Picture
          contentFit={Gtk.ContentFit.CONTAIN}
          valign={Gtk.Align.END}
          hexpand={true}
          vexpand={true}
          canShrink={true}
          file={Gio.File.new_for_path(path)}
        />
      </Gtk.Box>
    ) as Gtk.Box

  let sprite = createSprite()

  overlay.set_child(mainContent)

  overlay.add_overlay(sprite)

  const changeSprite = (path: string) => {
    overlay.remove_overlay(sprite)
    console.log("current animation path: ", path)
    sprite = createSprite(path)

    overlay.add_overlay(sprite)
  }

  let curr = 0

  let timer: Timer

  let currentAnimation: Animation =
    ame[ameAnimations[Math.floor(Math.random() * ameAnimations.length)]]

  const playAnimation = () => {
    timer = interval(1000 / FPS, () => {
      curr = (curr + 1) % (currentAnimation.count + 1)
      const basePath = currentAnimation.path
      changeSprite(`${basePath}/${curr}.png`)
    })

    sprite.connect("destroy", () => {
      timer.cancel()
      console.log("Timer stopped!")
      playAnimation()
    })
  }

  const switchAnimation = () => {
    if (showKAngel()) {
      const currIndex = kAngelAnimations.indexOf(currentAnimation.name)
      const nextAnimation =
        kAngelAnimations[(currIndex + 1) % kAngelAnimations.length]

      currentAnimation = kAngel[nextAnimation]

      return
    }

    const currIndex = ameAnimations.indexOf(currentAnimation.name)
    const nextAnimation = ameAnimations[(currIndex + 1) % ameAnimations.length]

    currentAnimation = ame[nextAnimation]
  }

  let switchInterval = interval(1000 * SWITCH_ANIMATION_DELAY, () => {
    switchAnimation()
  })

  playAnimation()

  const startStreaming = async () => {
    if (showKAngel()) {
      playAudio("open.wav")
      timer.cancel()
      switchInterval.cancel()

      curr = 0
      const basePath = ame.blank.path
      changeSprite(`${basePath}/${curr}.png`)

      timer = interval(1000 / TRANSFORMATION_FPS, () => {
        if ((curr === ame.blank.count)) {
          curr = 0

          currentAnimation =
            ame[ameAnimations[Math.floor(Math.random() * ameAnimations.length)]]

          setShowKAngel(false)

          switchInterval = interval(1000 * SWITCH_ANIMATION_DELAY, () => {
            switchAnimation()
          })

          timer.cancel()
          playAnimation()
        }

        curr = (curr + 1) % (ame.blank.count + 1)
        changeSprite(`${basePath}/${curr}.png`)
      })

      return
    }

    playAudio("transition.wav")
    await sleep(800)
    timer.cancel()
    switchInterval.cancel()

    setShowKAngel(true)

    curr = 0
    const basePath = ame.transformation.path
    changeSprite(`${basePath}/${curr}.png`)

    timer = interval(1000 / TRANSFORMATION_FPS, () => {
      if (curr === ame.transformation.count) {
        curr = 0

        currentAnimation =
          kAngel[
            kAngelAnimations[
              Math.floor(Math.random() * kAngelAnimations.length)
            ]
          ]

        switchInterval = interval(1000 * SWITCH_ANIMATION_DELAY, () => {
          switchAnimation()
        })

        timer.cancel()
        playAnimation()
      }

      curr = (curr + 1) % (ame.transformation.count + 1)
      changeSprite(`${basePath}/${curr}.png`)
    })
  }

  return (
    <Gtk.Window
      visible
      defaultWidth={500}
      defaultHeight={375.09}
      title="Webcam"
      iconName="gjs"
      class="Main"
    >
      <Gtk.Button
        onClicked={startStreaming}
        cursor={Gdk.Cursor.new_from_name("pointer", null)}
      >
        {overlay}
      </Gtk.Button>
    </Gtk.Window>
  )
}
