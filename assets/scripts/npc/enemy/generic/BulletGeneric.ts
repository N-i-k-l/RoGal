import { _decorator, Collider2D, Component, Contact2DType, find, IPhysics2DContact, Node, RigidBody2D, UITransform, Vec2, Vec3 } from 'cc';
import { PlayerGlobal } from '../../../PlayerGlobal';
import { Player } from '../../../Player/Player';
const { ccclass, property } = _decorator;

@ccclass('BulletGeneric')
export class BulletGeneric extends Component {
    private target: Vec2;
    private isDestroyed = false;
    @property(Number)
    lifeTime: number = 2500;
    @property(Number)
    speed: number = 1;
    setTarget(target: Vec3) {
        let ML: Vec3 = this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(target.x, target.y));
        let mult: number = this.speed / ML.length();
        this.target = new Vec2(ML.x * mult, ML.y * mult);
        console.log(this.target);
        this.node.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.Hit, this);
        setTimeout(() => {
            this.isDestroyed = true;
        }, this.lifeTime);
        //this.node.angle = target.angle;
    }

    lateUpdate() {
        if (this.isDestroyed) this.node.destroy();
    }

    Hit(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log(otherCollider.name)
        if (otherCollider.node === PlayerGlobal.playerNode) otherCollider.node.getComponent(Player).decreaseHealth(10);
        this.wallHit();
    }

    wallHit() {
        this.isDestroyed = true;
    }

    update(deltaTime: number) {
        if (!this.target) return
        this.node.getComponent(RigidBody2D).applyForceToCenter(this.target, true);
    }
}


