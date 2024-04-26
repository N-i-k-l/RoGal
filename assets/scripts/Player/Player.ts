import { _decorator, Component, Node, systemEvent, SystemEventType, EventKeyboard, macro, Vec2, RigidBody2D, Collider2D, BoxCollider2D, Contact2DType, IPhysics2DContact, Label, Prefab, director, instantiate, DistanceJoint2D, error, RigidBodyComponent, ERigidBody2DType, EventMouse, Vec3, RigidBody, Input, find, UITransform, math, ECollider2DType, ERigidBodyType } from 'cc';
const { ccclass, property } = _decorator;
import { PlayerGlobal } from "../PlayerGlobal";
@ccclass('Player')
export class Player extends Component {

    @property(Label)
    HPLabel: Label = null;
    public HP: number = 100;
    public maxHP: number = 100;
    public maxHPm: number = 1;
    public maxHPp: number = 0;

    @property(Prefab)
    segmentPrefab: Prefab = null;

    @property(Prefab)
    hookPrefab: Prefab = null;
    

    @property
    ropeLength: number = 10;
    private isSwitching = false;

    private collider: any;
    private rigidbody: RigidBody2D;
    private direction: number = 0;
    @property(Number)
    private walk_force: number = 250;
    public walk_force_m: number = 1
    public walk_force_p: number = 0;
    @property(Number)
    private jump_force: number = 2500;
    public jump_force_m: number = 1;
    public jump_force_p: number = 0;

    private _startJump: boolean = false;

    private rope: Node[] = [];
    private hook: Node;
    private hContact: boolean = false;
    private contactObject: RigidBody2D;
    private hLaunch: boolean = false;
    private cutTheRope: number = 0;
    private isSmall: boolean = false;

    //private weapons;
    //private currentWeapon: number = 0;

    private costil: boolean = true;

    private weaponSlot: any = null;

    private hookDestroyed = false;


    pickupWeapon(weapon: any) {
        console.log(weapon)
        if (!this.weaponSlot) {
            this.weaponSlot = this.node.addComponent(weapon);
        } else {
            console.log("nope!");
            this.weaponSlot.destroy();
            this.node.removeComponent(this.weaponSlot);
            this.weaponSlot = this.node.addComponent(weapon);
        }
    }
    

    onLoad() {
        PlayerGlobal.playerNode = this.node;
        this.HPLabel = this.node.getComponentInChildren(Label);

        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
        
        
        
    }
    onDestroy() {
        //
    }

    hookJump() {
        let a = this.hook.getWorldPosition().subtract(this.node.getWorldPosition());
        PlayerGlobal.playerNode.getComponent(RigidBody2D).applyForceToCenter(new Vec2(a.x*this.jump_force/35, a.y*this.jump_force/35), true);
        this.hookDespawn();
    }

    hookGrab() {
        let a = this.node.getWorldPosition().subtract(this.hook.getWorldPosition());
        this.contactObject.applyForceToCenter(new Vec2(a.x * this.jump_force/35, a.y * this.jump_force/35), true)
        this.hookDespawn();
    }

    hookLaunch(mouseLoc: Vec2) {
        this.hookDestroyed = false;
        

        if (this.hContact) {
            if (this.isSmall) {
                this.hookGrab();
            }
            else {
                this.hookJump();
            }
            
            return
        }
        if (this.hLaunch) return;
        let ML: Vec3 = find("Canvas").getComponent(UITransform).convertToNodeSpaceAR(new Vec3(mouseLoc.x, mouseLoc.y));
        let mult: number = 10 / ML.length();
        const target = new Vec2(ML.x * mult, ML.y * mult);
        this.cutTheRope = 0;
        this.hLaunch = true;
        //console.log(mouseLoc);
        //console.log(this.node.position);
        let prevSegment = this.node;
        let sc = director.getScene().getChildByName("Canvas");
        
        for (let i = 0; i < this.ropeLength; i++) {
            let segment = instantiate(this.segmentPrefab);
            sc.addChild(segment);
            segment.setWorldPosition(this.node.worldPosition)
            let distanceJoint = segment.getComponent(DistanceJoint2D);
            this.cutTheRope += distanceJoint.maxLength;
            
            //setTimeout(function () { segment.getComponent(BoxCollider2D).enabled = true }, 10000);
            if (distanceJoint) {
                distanceJoint.connectedBody = prevSegment.getComponent(RigidBody2D);
                distanceJoint.enabled = false; //Удаление этой строки ломает всю физику
                distanceJoint.enabled = true;
            } else {
                error("DistanceJoint component not found on segment prefab.");
            }
            //console.log(this.rope);
            this.rope.push(segment);
            prevSegment = segment;
        }
        
        this.hook = instantiate(this.hookPrefab);
        sc.addChild(this.hook);
        this.hook.setWorldPosition(this.node.worldPosition);
        
        this.hook.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.hookHit, this);
        this.hook.angle =90 - math.toDegree(Math.atan2(ML.x, ML.y));
        let distanceJoint = this.hook.getComponent(DistanceJoint2D);
        distanceJoint.connectedBody = this.rope[this.ropeLength - 1].getComponent(RigidBody2D);
        distanceJoint.enabled = false; //Удаление этой строки ломает всю физику
        distanceJoint.enabled = true; //Удаление этой строки ломает всю физику
        //let x = 0;
        //if (mouseLoc.x - this.node.worldPosition.x < 0)
        //console.log(x)
        this.hook.getComponent(RigidBody2D).linearVelocity = target;
        console.log(this.node.getWorldPosition());
        //mouseLoc.x - this.node.worldPosition.x, mouseLoc.y - this.node.worldPosition.y); //applyForceToCenter(new Vec2(mouseLoc.x - this.node.worldPosition.x, mouseLoc.y - this.node.worldPosition.y), true);
        //setTimeout(this.hookDespawn, 10000);
    }

    hookHit(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        
        if (otherCollider.name != "ropeSegment1<BoxCollider2D>" && !this.hContact && otherCollider.node != this.node) {
            this.hook.getComponent(Collider2D).off(Contact2DType.BEGIN_CONTACT);
            if (otherCollider.node.getComponent(RigidBody2D).type == ERigidBody2DType.Dynamic) {
                this.isSmall = true;
                otherCollider.node.addChild(this.hook);
                
            }
            else {
                this.isSmall = false;
            }
            this.contactObject = otherCollider.node.getComponent(RigidBody2D);
            this.hContact = true;
            console.log(otherCollider.name);
            this.hook.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
            for (let i in this.rope) {
                //console.log(i);
                
            }
        }
    }

    hookDespawn() {
        
        this.hookDestroyed = true;
        
        this.hContact = false;
        this.hLaunch = false;
    }

    lateUpdate() {
        if (this.hookDestroyed) {
            this.hookDestroyed = false;
            this.hook.destroy();
            this.hook = null;
            let c: Node;
            for (let i = 0; i < this.ropeLength; i++) {
                c = this.rope.pop();
                console.log(i);
                c.destroy();
            }
        }
    }

    start() {

        this.rigidbody = this.node.getComponent(RigidBody2D);
        this.collider = this.node.getComponent(BoxCollider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        
    }

    getDistance(dot1: Vec3, dot2: Vec3) {
        return dot1.subtract(dot2).length();
    }

    update(deltaTime: number) {
        this.rigidbody.applyForceToCenter(new Vec2(this.direction * this.walk_force, 0), true);
        try {
            if (this.hook && !this.hContact) {
                if (this.cutTheRope != 0 && this.cutTheRope < this.getDistance(this.hook.getWorldPosition(), this.node.getWorldPosition())) {
                    this.hookDespawn();
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        
    }


    onKeyDown(event: EventKeyboard) {
        if (this.costil) {
            PlayerGlobal.touchArea.on(Node.EventType.MOUSE_DOWN, (event: EventMouse) => {
                if (event.getButton() == 2) {
                    this.hookLaunch(event.getUILocation());
                } //console.log();
            }, this);
            this.costil = false;
        }
        switch (event.keyCode) {
            case 65: // A
            case 37: // LEFT
                this.direction = -1;
                break;
            case 68: // D
            case 39: // RIGHT
                this.direction = 1;
               
                break;
            case 32: // SPACE
            case 38: // UP
                console.log("trytojump");
                if (this._startJump) {
                    console.log("alreadyjump");
                    return;
                }

                if (!this._startJump) {
                    console.log("isonground");
                    this._startJump = true;
                    this.rigidbody.applyForceToCenter(new Vec2(0, this.jump_force), true);
                } else {
                    console.log("intheair");
                }
                break;
            default:
                break;
        }
    }


    onBeginContact(selfCollider: Collider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.name === 'Enemy') {
            console.log('ouch');
            this.decreaseHealth(20)
            console.log(`Player HP: ${this.HP}`);
            if (this.HPLabel) {
                this.HPLabel.string = `HP: ${this.HP}`;
            }
        }
        if (otherCollider.node.name === 'Speedboost') {
            console.log('Speed boosted!');
            this.walk_force *= 3;
            console.log(`Current speed rate - ${this.walk_force}`);
            otherCollider.node.removeFromParent();
            otherCollider.node.destroy();
        }
        if (otherCollider.node.name === 'Jumpboost') {
            console.log('Jump boosted!');
            this.jump_force *= 3;
            console.log(`Current jump rate - ${this.jump_force}`);
            otherCollider.node.removeFromParent();
            otherCollider.node.destroy();
        }
        if ((otherCollider.node.worldPosition.y < this.node.worldPosition.y) && (otherCollider.node.getComponent(BoxCollider2D).sensor == false)) {
            //console.log(otherCollider.name);
            this._startJump = false;
        }
    }

    decreaseHealth(amount: number) {
        this.HP -= amount;
        if (this.HP < 0) {
            this.HP = 0;
            this.death()
        }
        this.updateHealthLabel();
    }

    increaseHealth(amount: number) {
        this.HP += amount;
        if (this.HP > 100) {
            this.HP = 100;
        }
        this.updateHealthLabel();
    }
    death() {
        console.log("you're dead!")
        PlayerGlobal.playerNode.active = false;
        director.loadScene("GameOver"); 
        PlayerGlobal.playerNode.destroy();
        
    }

    updateHealthLabel() {
        if (this.HPLabel) {
            this.HPLabel.string = `HP: ${this.HP}`;
        }
    }

    onEndContact(contact, selfCollider, otherCollider) {
            this._startJump = false;
    }

    onKeyUp(event: EventKeyboard) {

        switch (event.keyCode) {
            case 65: // A
            case 37: // LEFT:
                this.direction = 0;
                break;
            case 68: // D
            case 39: // RIGHT
                this.direction = 0;
                break;
            default:
                break;
        }
    }

}


