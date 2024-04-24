import { _decorator, Component, DistanceJoint2D, Node, RigidBody2D, Vec2, Vec3 } from 'cc';
import { PlayerGlobal } from '../../../scripts/PlayerGlobal';
const { ccclass, property } = _decorator;

@ccclass('boss1')
export class boss1 extends Component {
    @property(Node)
    leftHand: Node = null;
    @property(Node)
    leftHands: Node[] = []; 
    @property(Node)
    rightHand: Node = null;
    @property(Node)
    rightHands: Node[] = []; 
    @property()
    Distance: number = 50;
    @property()
    Speed: number = 5;
    
    private isReturn: boolean = false;
    private rightStart: Vec3;
    private rightTarget: Vec3;

    private leftStart: Vec3;
    private leftTarget: Vec3;

    private attackList: any[] = [this.rightPunch, this.leftPunch];
    start() {
        this.rightStart = new Vec3(this.rightHand.worldPosition);
        this.leftStart = new Vec3(this.leftHand.worldPosition);
        this.attack();
    }
    leftMove() {
        
        let tar: Vec3 = new Vec3(new Vec3(this.leftTarget).subtract(this.leftHand.worldPosition));
        let mult: number = this.Speed / tar.length();
        this.rightHands.forEach(this.changeLenght, new Vec2(tar.x * mult, tar.y * mult).length());
        this.leftHand.getComponent(RigidBody2D).applyForceToCenter(new Vec2(tar.x * mult, tar.y * mult), true);
    }
    leftPunch() {
        this.isReturn = false;
        console.log("BossLeft")
        this.leftTarget = PlayerGlobal.playerNode.worldPosition;
        setTimeout(this.leftReturnToNormal, 1);
    }
    attack() {
        this.rightHands.forEach(this.toNormalHand);
        this.leftHands.forEach(this.toNormalHand);
        console.log(Number(PlayerGlobal.playerNode.position.x < this.node.position.x))
        this.scheduleOnce(this.attackList[Number(PlayerGlobal.playerNode.position.x < this.node.position.x)], 10);
    }
    toNormalHand(a: Node) {
        a.getComponent(DistanceJoint2D).maxLength = 5;
    }
    changeLenght(a: Node, lenght: number) {
        if (this.isReturn) a.getComponent(DistanceJoint2D).maxLength -= lenght;
        else a.getComponent(DistanceJoint2D).maxLength -= lenght;
    }

    leftReturnToNormal() {
        this.isReturn = true;
        console.log("BossLeftStop")
        this.leftTarget = this.leftStart;
        setTimeout(this.attack, 1000);
    }

    rightMove() {
        let tar: Vec3 = new Vec3(new Vec3(this.rightTarget).subtract(this.rightHand.worldPosition));
        let mult: number = this.Speed / tar.length();
        this.rightHands.forEach(this.changeLenght, new Vec2(tar.x * mult, tar.y * mult).length());
        this.rightHand.getComponent(RigidBody2D).applyForceToCenter(new Vec2(tar.x * mult, tar.y * mult), true);
    }

    rightPunch() {
        this.isReturn = false;
        console.log("BossRight")
        this.rightTarget = PlayerGlobal.playerNode.worldPosition;
        setTimeout(this.rightReturnToNormal, 1000)
    }

    rightReturnToNormal() {
        this.isReturn = true;
        this.rightTarget = this.rightStart;
        setTimeout(this.attack, 1000);
    }

    update(deltaTime: number) {
        if (this.rightHand) this.rightMove();
        if (this.leftHand) this.leftMove();
    }
        
}


