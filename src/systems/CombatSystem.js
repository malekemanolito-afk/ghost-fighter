export class CombatSystem {
  constructor() {
    this.activeHitboxes = [];
    this.lastHitEnemies = new Set();
  }

  createAttackHitbox(attacker, attackData) {
    const range = attackData.range;
    const hitbox = {
      x: attacker.x + (attacker.facing > 0 ? attacker.width : -range),
      y: attacker.y,
      width: range,
      height: attacker.height,
      damage: attackData.damage,
      knockback: attackData.knockback,
      type: attackData.type,
      owner: attacker,
    };

    this.activeHitboxes.push(hitbox);
    this.lastHitEnemies.clear();
    return hitbox;
  }

  checkCollisions(targets) {
    const hitResults = [];

    for (const hitbox of this.activeHitboxes) {
      for (const target of targets) {
        if (target === hitbox.owner || this.lastHitEnemies.has(target)) continue;

        const hit = this.rectangleCollision(
          hitbox,
          { x: target.x, y: target.y, width: target.width, height: target.height }
        );

        if (hit) {
          this.lastHitEnemies.add(target);
          hitResults.push({
            target,
            damage: hitbox.damage,
            knockback: hitbox.knockback,
            type: hitbox.type,
          });
        }
      }
    }

    return hitResults;
  }

  rectangleCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  clear() {
    this.activeHitboxes = [];
  }
}
