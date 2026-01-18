import Phaser, { GameObjects, Scene } from "phaser";

export class Player extends GameObjects.Container {
  #shipSprite: GameObjects.Sprite;
  #wasd: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Scene) {
    super(scene, scene.scale.width / 2, scene.scale.height * 0.7);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    if (this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.setSize(24, 24);
      this.body.setOffset(-12, -8);
      this.body.setCollideWorldBounds(true);
      this.body.setMaxVelocity(200);
      this.body.setDamping(true);
      this.body.setDrag(0.01);
    }

    this.setDepth(2);

    this.#shipSprite = scene.add.sprite(0, 0, "player_spaceships");

    this.add(this.#shipSprite);

    if (scene.input.keyboard) {
      this.#wasd = scene.input.keyboard.createCursorKeys();
    }

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.once(
      Phaser.GameObjects.Events.DESTROY,
      () => {
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
      },
      this,
    );
  }

  update(ts: DOMHighResTimeStamp, dt: number) {
    if (!(this.body instanceof Phaser.Physics.Arcade.Body)) {
      return;
    }

    const acceleration = 20;

    if (this.#wasd.left.isDown) {
      this.body.velocity.x -= acceleration;
    } else if (this.#wasd.right.isDown) {
      this.body.velocity.x += acceleration;
    }

    if (this.#wasd.up.isDown) {
      this.body.velocity.y -= acceleration;
    } else if (this.#wasd.down.isDown) {
      this.body.velocity.y += acceleration;
    }
  }
}
