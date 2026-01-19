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
      key: "player_spaceships",
      url: "SpaceShips_Player-0001.png",
    });

    this.load.image({
      key: "ui",
      url: "UI_sprites-0001.png",
    });

    this.load.image({
      key: "enemy_spaceships",
      url: "SpaceShips_Enemy-0001.png",
    });

    this.load.image({
      key: "asteroids",
      url: "Asteroids-0001.png",
    });

    this.load.image({
      key: "bullets",
      url: "Bullets-0001.png",
    });
  }

  create() {
    // Player
    const playerTexture = this.textures.get("player_spaceships");

    playerTexture.add("gray_spaceship", 0, 12, 22, 38, 40);

    // Bullets
    const bulletTexture = this.textures.get("bullets");

    bulletTexture.add("drupal_small_blue", 0, 180, 17, 7, 14);

    // UI
    const uiTexture = this.textures.get("ui");

    uiTexture.add("heart", 0, 3, 82, 13, 11);

    // Enemy
    const enemyTexture = this.textures.get("enemy_spaceships");

    enemyTexture.add("enemy_l", 0, 33, 11, 47, 53);
    enemyTexture.add("enemy_m", 0, 92, 17, 45, 36);
    enemyTexture.add("enemy_s", 0, 150, 25, 32, 20);
    enemyTexture.add("enemy_xs", 0, 198, 27, 21, 17);

    // Asteroids
    const asteroidsTexture = this.textures.get("asteroids");

    asteroidsTexture.add("red_s", 0, 32, 16, 16, 16);
    asteroidsTexture.add("red_m", 0, 19, 35, 26, 26);
    asteroidsTexture.add("red_l", 0, 6, 69, 39, 38);

    asteroidsTexture.add("gray_s", 0, 96, 16, 16, 16);
    asteroidsTexture.add("gray_m", 0, 83, 35, 26, 26);
    asteroidsTexture.add("gray_l", 0, 70, 69, 39, 38);

    this.scene.start("Game");
  }
}
