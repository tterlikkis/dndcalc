import "./App.css";
import { useEffect } from "react";
import { Round } from "./components/round/Round";
import { keepTheme } from "./utilities/themes";

export default function App() {

  useEffect(() => { keepTheme(); });

  return <Round></Round>;

}