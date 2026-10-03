import React from "react";
import { createRoot } from "react-dom/client";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "../css/style.css";
import "../css/landing.css";
import App from "./App.jsx";

window.maplibregl = maplibregl;

createRoot(document.getElementById("root")).render(<App />);
