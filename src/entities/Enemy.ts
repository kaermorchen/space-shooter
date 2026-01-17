import { GameObjects, Scene } from "phaser";

export class Enemy extends GameObjects.Container {
  #shipSprite: GameObjects.Sprite;

  constructor(scene: Scene, size: "xs" | "s" | "m" | "l") {
    super(scene, scene.scale.width / 2, scene.scale.height * 0.7);

    this.scene.add.existing(this);

    this.#shipSprite = scene.add
      .sprite(0, 0, "enemy_spaceships")
      .setFrame(`enemy_${size}`);

    this.add(this.#shipSprite);
  }
}
