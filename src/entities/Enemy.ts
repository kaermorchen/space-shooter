import Phaser, { GameObjects, Scene } from "phaser";
import { Position } from "../types";

export class Enemy extends GameObjects.Container {
  #shipSprite: GameObjects.Sprite;

  constructor(scene: Scene, size: "xs" | "s" | "m" | "l", position: Position) {
    super(scene, position.x, position.y);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    if (this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.setSize(32, 32);
      this.body.setOffset(-16, -16);
    }

    this.scene.add.existing(this);

    this.#shipSprite = scene.add
      .sprite(0, 0, "enemy_spaceships")
      .setFrame(`enemy_${size}`);

    this.add(this.#shipSprite);

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.once(
      Phaser.GameObjects.Events.DESTROY,
      () => {
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
      },
      this,
    );
  }

  update(time: DOMHighResTimeStamp) {
    if (this.body) {
      this.body.velocity.x = Math.sin(time / 200) * 200;
      this.body.velocity.y = 200;
    }

    if (this.scene && this.y > this.scene.scale.height) {
      this.destroy();
    }
  }
}
