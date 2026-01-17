import { Scene } from "phaser";
import { gameHeight, gameWidth } from "../constants";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    const progressBarWidth = 400;
    const progressBarHeight = 30;
    const progressBarBorder = 2;

    const progressBarBackground = this.add
      .rectangle(
        (gameWidth - progressBarWidth) / 2,
        (gameHeight - progressBarHeight) / 2,
        progressBarWidth,
        progressBarHeight,
        0xfffffff,
      )
      .setOrigin(0);

    const progressBar = this.add
      .rectangle(
        progressBarBackground.x + progressBarBorder,
        progressBarBackground.y + progressBarBorder,
        0,
        progressBarHeight - progressBarBorder * 2,
        0x160c1e,
      )
      .setOrigin(0);

    this.load.on("progress", (value: number) => {
      progressBar.width = 396 * value;
    });
  }

  preload() {
    this.load.setPath("assets");

    this.load.image("logo", "logo.png");
  }

  create() {
    this.scene.start("MainMenu");
  }
}
