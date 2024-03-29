import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, RigidBody2D, Vec2, Vec3 } from 'cc';
import { PlayerGlobal } from '../../../PlayerGlobal';
import { Player } from '../../../Player/Player';
const { ccclass, property } = _decorator;

@ccclass('BulletGeneric')
export class BulletGeneric extends Component {
    private target: Vec2;
    setTarget(target: Vec3) {
        let tar: Vec3 = new Vec3(new Vec3(target.subtract(this.node.getWorldPosition())));
        let mult: number = 1 / tar.length();
        this.target = new Vec2(10 / tar.x,10/ tar.y);
        console.log(target.x +""+ target.y);
        this.node.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.Hit, this);
        //this.node.angle = target.angle;
    }

    Hit(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log(otherCollider.name)
        if (otherCollider.group == PlayerGlobal.playerNode.getComponent(Collider2D).group) otherCollider.node.getComponent(Player).decreaseHealth(10);
        this.wallHit();
    }

    wallHit() {
        this.node.destroy();
    }

    update(deltaTime: number) {
        if (!this.target) return
        this.node.getComponent(RigidBody2D).applyForceToCenter(this.target, true);
    }
}


