import Phaser, { GameObjects, Scene } from "phaser";

export class Lives extends GameObjects.Container {
  constructor(scene: Scene) {
    super(scene, 30, scene.scale.height - 20 - 11);

    this.scene.add.existing(this);

    this.setDepth(3);

    this.updateLives();

    this.scene.registry.events.on("changedata", this.updateLives, this);
    this.once(
      Phaser.GameObjects.Events.DESTROY,
      () => {
        this.scene.registry.events.off("changedata", this.updateLives, this);
      },
      this,
    );
  }

  updateLives() {
    const lives = this.scene.registry.get("lives");

    this.removeAll(true);

    for (let i = 0; i < lives; i++) {
      const lastHeart = this.list.at(-1);
      const x = lastHeart ? lastHeart.x + 13 + 10 : 0;

      this.add(this.scene.add.sprite(x, 0, "ui"));
    }
  }
}
