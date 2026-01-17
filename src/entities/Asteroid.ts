import { GameObjects, Scene } from "phaser";

export class Asteroid extends GameObjects.Container {
  #sprite: GameObjects.Sprite;

  constructor(scene: Scene, color: "red" | "gray", size: "s" | "m" | "l") {
    super(scene, scene.scale.width / 2, scene.scale.height * 0.7);

    this.scene.add.existing(this);

    this.#sprite = scene.add
      .sprite(0, 0, "asteroids")
      .setFrame(`${color}_${size}`);

    this.add(this.#sprite);
  }
}
