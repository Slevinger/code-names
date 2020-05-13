import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import axios from "./apis/codeNameApi";
import "./App.css";
import MainScreen from "./components/screens/MainRouter";

function App() {
  return <MainScreen />;
}

export default App;
