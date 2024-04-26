import { _decorator, Collider2D, Component, Contact2DType, find, IPhysics2DContact, Node, RigidBody2D, UITransform, Vec2, Vec3 } from 'cc';
import { damageAura } from '../npc/enemy/generic/damageAura';
const { ccclass, property } = _decorator;

@ccclass('Bang')
export class Bang extends Component {

    private speed: number = 0.5;
    private target: Vec2 = new Vec2();

    setTarget(target: Vec3) {
        //let tar: Vec3 = new Vec3(new Vec3(target.subtract(this.node.getWorldPosition())));

        const spreadAngle: number = 360; // Угол разброса дробовика в градусах

        //this.target = new Vec2(tar.x * mult, tar.y * mult);
        let ML: Vec3 = find("Canvas").getComponent(UITransform).convertToNodeSpaceAR(new Vec3(target.x, target.y));
        let mult: number = this.speed / ML.length();
        this.target = new Vec2(ML.x * mult + (Math.random() - 0.5) * spreadAngle, ML.y * mult + (Math.random() - 0.5) * spreadAngle);
        console.log('target: ', this.target, ' speed: ', this.speed);
        this.node.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.Hit, this);
        //this.node.angle = target.angle;
    }

    Hit(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.group == 16) otherCollider.node.getComponent(damageAura).getDmg(5);
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