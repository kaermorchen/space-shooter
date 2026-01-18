import Phaser, { Scene } from "phaser";
import { Player } from "../entities/Player";
import { Asteroid } from "../entities/Asteroid";

export class Game extends Scene {
  enemySpawnTimer: Phaser.Time.TimerEvent;
  asteroids: Phaser.Physics.Arcade.Group;

  constructor() {
    super("Game");
  }

  create() {
    const player = new Player(this);

    this.asteroids = this.physics.add.group();
    this.physics.add.collider(
      player,
      this.asteroids,
      this.hitAsteroid,
      undefined,
      this,
    );

    this.enemySpawnTimer = this.time.addEvent({
      delay: 300,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    });
  }

  spawnEnemy() {
    const color = Phaser.Utils.Array.GetRandom<"gray" | "red">(["gray", "red"]);
    const size = Phaser.Utils.Array.GetRandom<"s" | "m" | "l">(["s", "m", "l"]);
    const position = {
      x: Phaser.Math.Between(0, this.scale.width),
      y: -38,
    };

    this.asteroids.add(new Asteroid(this, color, size, position));
  }

  hitAsteroid() {
    this.scene.restart();
  }
}
