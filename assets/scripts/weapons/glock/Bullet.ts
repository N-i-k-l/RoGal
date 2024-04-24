import { _decorator, Collider2D, Component, Contact2DType, find, IPhysics2DContact, math, Node, RigidBody2D, UITransform, Vec2, Vec3 } from 'cc';
import { damageAura } from '../../npc/enemy/generic/damageAura';
const { ccclass, property } = _decorator;

@ccclass('bullet')
export class bullet extends Component {
    private target: Vec2;
    private speed: number = 2;
    setTarget(target: Vec3) {
        //let tar: Vec3 = new Vec3(new Vec3(target.subtract(this.node.getWorldPosition())));
        //let mult: number = 1 / tar.length();
        
        //this.target = new Vec2(tar.x * mult, tar.y * mult);
        let ML: Vec3 = find("Canvas").getComponent(UITransform).convertToNodeSpaceAR(new Vec3(target.x, target.y));
        this.target = new Vec2(ML.x/this.speed, ML.y/this.speed);
        console.log(this.target);
        this.node.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.Hit, this);
        //this.node.angle = target.angle;
    }

    Hit(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log(otherCollider.name)
        if (otherCollider.group == 16) otherCollider.node.getComponent(damageAura).getDmg(20);

        this.wallHit();
    }

    wallHit() {
        console.log('OK');
        this.node.destroy();
    }

    update(deltaTime: number) {
        if (!this.target) return
        this.node.getComponent(RigidBody2D).applyForceToCenter(this.target, true);
    }
}