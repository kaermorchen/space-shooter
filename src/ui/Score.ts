import Phaser, { GameObjects, Scene } from "phaser";

export class Score extends GameObjects.Container {
  scoreText: GameObjects.Text;

  constructor(scene: Scene) {
    super(scene, 15, 15);

    this.scoreText = this.scene.add.text(16, 16, "", {
      fontSize: "24px",
      color: "#ffffff",
      fontFamily: "Arial",
    });

    this.add(this.scoreText);

    this.scene.add.existing(this);

    this.setDepth(3);

    this.update();

    this.scene.registry.events.on("changedata", this.update, this);
    this.once(
      Phaser.GameObjects.Events.DESTROY,
      () => {
        this.scene.registry.events.off("changedata", this.update, this);
      },
      this,
    );
  }

  update() {
    const value = this.scene.registry.get("score");

    this.scoreText.text = value;
  }
}
