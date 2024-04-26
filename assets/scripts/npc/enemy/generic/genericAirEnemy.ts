import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, director, IPhysics2DContact, Node, Quat, RigidBody2D, Scene, Sprite, Vec2, Vec3 } from 'cc';
import { Player } from '../../../Player/Player';
import { PlayerGlobal } from "../../../PlayerGlobal";
const { ccclass, property } = _decorator;

@ccclass('genericAirEnemy')
export class genericAirEnemy extends Component {
    @property(Number)
    Speed: number = 0;
    @property(Number)
    DMG: number = 0;

    private direction: number = 0;

    start() {
    }

    update(deltaTime: number) {
        let tar: Vec3 = new Vec3(new Vec3(PlayerGlobal.playerNode.worldPosition).subtract(this.node.worldPosition));
        let mult: number = this.Speed/ tar.length();
        this.node.getComponent(RigidBody2D).applyForceToCenter(new Vec2(tar.x * mult, tar.y * mult), true);
        if (tar.x > 0) {
            this.node.setScale(new Vec3(Math.abs(this.node.scale.x)*-1, this.node.scale.y));
        }
        else this.node.setScale(new Vec3(Math.abs(this.node.scale.x), this.node.scale.y))
    }


}

    
