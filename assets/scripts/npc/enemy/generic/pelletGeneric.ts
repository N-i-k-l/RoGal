import { _decorator, Collider2D, Component, Contact2DType, find, IPhysics2DContact, Node, RigidBody2D, UITransform, Vec2, Vec3 } from 'cc';
import { damageAura } from './damageAura';
const { ccclass, property } = _decorator;

@ccclass('pelletGeneric')
export class pelletGeneric extends Component {
    private target: Vec2;
    private speed: number = 2.5;

    private isDestroyed = false;

    lateUpdate() {
        if (this.isDestroyed) this.node.destroy();
    }

    setTarget(target: Vec3) {
        let ML: Vec3 = find("Canvas").getComponent(UITransform).convertToNodeSpaceAR(new Vec3(target.x, target.y));
        let mult: number = this.speed / ML.length();
        this.target = new Vec2(ML.x * mult, ML.y * mult);
        console.log(this.target);
        this.node.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.Hit, this);
        setTimeout(this.wallHit, 500)
        //this.node.angle = target.angle;
    }

    Hit(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log(otherCollider.name)
        try {
            if (otherCollider.group == 16 && !otherCollider.sensor) otherCollider.node.getComponent(damageAura).getDmg(20);
        }
        catch (E) {
            console.log("E", E);
        }
        this.wallHit();
    }

    wallHit() {
        console.log('OK');
        this.isDestroyed = true;
    }

    update(deltaTime: number) {
        if (!this.target) return
        this.node.getComponent(RigidBody2D).applyForceToCenter(this.target, true);
    }
}

