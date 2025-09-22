import "./App.css";
import { useEffect } from "react";
import { Scenario } from "./components/scenario/Scenario";
import { keepTheme } from "./utilities/themes";
import { ThemeToggle } from "./components/theme-toggle/ThemeToggle";

export default function App() {

  useEffect(() => { keepTheme(); });

  return (
    <>
      <ThemeToggle></ThemeToggle>
      <Scenario></Scenario>
    </>
  );
}