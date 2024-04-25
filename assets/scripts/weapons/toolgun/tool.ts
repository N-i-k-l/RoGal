import { _decorator, Collider2D, Component, Contact2DType, find, IPhysics2DContact, math, Node, RigidBody2D, size, Sprite, UITransform, Vec2, Vec3 } from 'cc';
import { damageAura } from '../../npc/enemy/generic/damageAura';
const { ccclass, property } = _decorator;

@ccclass('tool')
export class tool extends Component {
    private target: Vec2;
    private speed: number = 2.5;
    setTarget(target: Vec3) {
        //let tar: Vec3 = new Vec3(new Vec3(target.subtract(this.node.getWorldPosition())));


        //this.target = new Vec2(tar.x * mult, tar.y * mult);
        let ML: Vec3 = find("Canvas").getComponent(UITransform).convertToNodeSpaceAR(new Vec3(target.x, target.y));
        let mult: number = this.speed / ML.length();
        this.target = new Vec2(ML.x * mult, ML.y * mult);
        console.log(this.target);
        let laser = new math.Size(ML.x, ML.y)
        this.node.getComponent(UITransform).setContentSize(laser)
        //this.node.angle = target.angle;
    }



}

