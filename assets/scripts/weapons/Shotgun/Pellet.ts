import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, RigidBody2D, Vec2, Vec3 } from 'cc';
import { damageAura } from '../../npc/enemy/generic/damageAura';
const { ccclass, property } = _decorator;

@ccclass('Pellet')
export class Pellet extends Component {

    private speed: number = 1; 
    private target: Vec2 = new Vec2();

    setTarget(target: Vec3) {
        let ML: Vec3 = find("Canvas").getComponent(UITransform).convertToNodeSpaceAR(new Vec3(target.x, target.y));
        this.target = new Vec2(ML.x / this.speed, ML.y / this.speed);
        const rigidBody = this.node.getComponent(RigidBody2D);
        if (rigidBody) {
            rigidBody.linearVelocity = this.target.multiplyScalar(this.speed);
            this.node.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.Hit, this);
        }
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