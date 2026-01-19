import { Boot } from "./scenes/Boot";
import { Game as MainGame } from "./scenes/Game";
import { AUTO, Game, Scale } from "phaser";
import { Preloader } from "./scenes/Preloader";
import { gameWidth, gameHeight } from "./constants";

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: gameWidth,
  height: gameHeight,
  parent: "game-container",
  backgroundColor: "#160c1e",
  scene: [Boot, Preloader, MainGame],
  roundPixels: true,
  pixelArt: true,
  autoCenter: Scale.CENTER_BOTH,
  mode: Scale.HEIGHT_CONTROLS_WIDTH,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: import.meta.env.DEV,
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  new Game(config);
});
