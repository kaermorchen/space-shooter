import Phaser, { GameObjects, Scene } from "phaser";

export class Player extends GameObjects.Container {
  #shipSprite: GameObjects.Sprite;
  #wasd: Phaser.Types.Input.Keyboard.CursorKeys;
  bullets: Phaser.Physics.Arcade.Group;
  lastFired: number = 0;
  fireRate: number = 300;

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

    this.bullets = this.scene.physics.add.group({
      enable: false,
      collideWorldBounds: true,
    });

    this.bullets.createMultiple({
      key: "bullets",
      quantity: 10,
      active: false,
      visible: false,
      frame: "drupal_small_blue",
    });

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.scene.physics.world.on("worldbounds", this.worldbounds, this);
    this.once(
      Phaser.GameObjects.Events.DESTROY,
      () => {
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
        this.scene.physics.world.off("worldbounds", this.worldbounds, this);
      },
      this,
    );
  }

  update(time: DOMHighResTimeStamp, dt: number) {
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

    if (this.#wasd.space.isDown && time > this.lastFired) {
      this.shoot();
      this.lastFired = time + this.fireRate;
    }
  }

  shoot() {
    const x = this.x;
    const y = this.y - 22;
    const bullet = this.bullets.getFirstDead(
      true,
      x,
      y,
      "bullets",
      "drupal_small_blue",
    );
    bullet.enableBody(true, x, y, true, true);
    bullet.body.velocity.y -= 300;
    bullet.body.onWorldBounds = true;
  }

  worldbounds(body) {
    const gameObject = body.gameObject;

    if (this.bullets.contains(gameObject)) {
      this.killBullet(gameObject);
    }
  }

  killBullet(bullet) {
    bullet.disableBody(true, true);
  }
}
