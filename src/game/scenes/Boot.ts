import { Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.image("background", "assets/images/piiixl/bg.gif");
  }

  create() {
    this.scene.start("Preloader");
  }
}
