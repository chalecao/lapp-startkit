import { app } from "lapp"
import { BoxView } from "./module/main/main"

console.time("render virtual DOM with FP")
app(document.querySelector("#app"), BoxView)
console.timeEnd("render virtual DOM with FP")
