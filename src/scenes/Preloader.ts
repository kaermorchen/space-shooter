import { Scene } from "phaser";

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
        (this.scale.width - progressBarWidth) / 2,
        (this.scale.height - progressBarHeight) / 2,
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
      progressBar.width = (progressBarWidth - progressBarBorder * 2) * value;
    });
  }

  preload() {
    this.load.setPath("assets/images/Shoot`em Up/");

    this.load.image({
      key: "player",
      url: "SpaceShips_Player-0001.png",
    });
  }

  create() {
    this.scene.start("MainMenu");
  }
}
