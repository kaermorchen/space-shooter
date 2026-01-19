import { GameObjects, Scene } from "phaser";
import { Position } from "../types";

type Size = "s" | "m" | "l";

const bodies: Record<Size, number> = {
  s: 16,
  m: 26,
  l: 38,
};

export class Asteroid extends GameObjects.Container {
  #sprite: GameObjects.Sprite;
  #speed: number = 1.3;
  scoreBonus: number = 10;

  constructor(
    scene: Scene,
    color: "red" | "gray",
    size: Size,
    position: Position,
  ) {
    super(scene, position.x, position.y);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    if (this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.setSize(bodies[size], bodies[size]);
      this.body.setOffset(-(bodies[size] / 2), -(bodies[size] / 2));
    }

    this.#sprite = scene.add
      .sprite(0, 0, "asteroids")
      .setFrame(`${color}_${size}`);

    this.add(this.#sprite);

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.once(
      Phaser.GameObjects.Events.DESTROY,
      () => {
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
      },
      this,
    );
  }

  update() {
    this.y += this.#speed;

    if (this.scene && this.y > this.scene.scale.height) {
      this.destroy();
    }
  }
}
