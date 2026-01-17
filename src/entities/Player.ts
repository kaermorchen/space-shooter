import { GameObjects, Scene } from "phaser";

export class Player extends GameObjects.Container {
  #shipSprite: GameObjects.Sprite;

  constructor(scene: Scene) {
    super(scene, scene.scale.width / 2, scene.scale.height * 0.7);

    this.scene.add.existing(this);

    this.#shipSprite = scene.add.sprite(0, 0, "player_spaceships");

    this.add(this.#shipSprite);
  }
}
