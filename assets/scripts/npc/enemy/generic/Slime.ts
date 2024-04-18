import { _decorator, Collider2D, Component, Contact2DType, Node, RigidBody, RigidBody2D, Vec2, Vec3 } from 'cc';
import { PlayerGlobal } from '../../../PlayerGlobal';
const { ccclass, property } = _decorator;

@ccclass('Slime')
export class Slime extends Component {

    @property(Number)
    ChargeTime: number = 24;
    private direction: number = 1;
    private startScale: Vec3;
    private cTimer = this.ChargeTime;
    @property(Number)
    launchForce: number = 1000000;

    start() {
        this.startScale = this.node.scale;
    }

    launch(playerPos: number) {
        console.log(this.direction);
        this.node.getComponent(RigidBody2D).applyForceToCenter(new Vec2(this.launchForce * this.direction * this.node.scale.x, 0), true);
        this.cTimer = this.ChargeTime;
    }

    update(deltaTime: number) {
        let player: Node = PlayerGlobal.playerNode;
        if (!player) return
        if (player.position.x - this.node.position.x > 0) this.direction = 1;
        else this.direction = -1;
        console.log("!");
        if (this.node.getComponent(RigidBody2D).linearVelocity.x > 10) return
        this.node.setScale(this.startScale.x * this.direction, this.startScale.y);
        if (this.cTimer <= 0) this.launch(player.worldPosition.x);
        this.cTimer -= 1;
    }
}


