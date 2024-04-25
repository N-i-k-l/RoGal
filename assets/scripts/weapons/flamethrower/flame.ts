import { _decorator, Collider2D, Component, Contact2DType, director, EventMouse, find, instantiate, IPhysics2DContact, math, Node, Prefab, resources, RigidBody2D, UITransform, Vec2, Vec3 } from 'cc';
import { damageAura } from '../../npc/enemy/generic/damageAura';
import { PlayerGlobal } from '../../PlayerGlobal';
const { ccclass, property } = _decorator;

@ccclass('flame')
export class flame extends Component {

    private speed: number = 0.2;
    private target: Vec2 = new Vec2();

    setTarget(target: Vec3) {
        let ML: Vec3 = find("Canvas").getComponent(UITransform).convertToNodeSpaceAR(new Vec3(target.x, target.y));
        let mult: number = this.speed / ML.length();
        this.target = new Vec2(ML.x * mult, ML.y * mult);
        console.log(this.target);
        this.node.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.Hit, this);
    }

    Hit(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.group == 16) otherCollider.node.getComponent(damageAura).getDmg(20);
        this.wallHit();
    }

    wallHit() {
        console.log('wallHit')
        this.node.destroy();
    }

    update(deltaTime: number) {
        if (!this.target) return
        this.node.getComponent(RigidBody2D).applyForceToCenter(this.target, true);
    }
} 