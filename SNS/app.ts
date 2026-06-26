import app from "ags/gtk4/app"
import style from "./style.scss"
import Main from "./widget/Main"

app.start({
  css: style,
  instanceName: "SNS",
  main() {
    app.get_monitors().map(Main)
  },
})
