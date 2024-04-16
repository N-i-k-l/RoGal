import { _decorator, Component, Node, systemEvent, SystemEventType, EventKeyboard, macro, Vec2, RigidBody2D, Collider2D, BoxCollider2D, Contact2DType, IPhysics2DContact, Label, Prefab, director, instantiate, DistanceJoint2D, error, RigidBodyComponent, ERigidBody2DType, EventMouse, Vec3, RigidBody } from 'cc';
const { ccclass, property } = _decorator;
import { PlayerGlobal } from "../PlayerGlobal";
@ccclass('Player')
export class Player extends Component {

    @property(Label)
    HPLabel: Label = null;
    public HP: number = 100;

    @property(Prefab)
    segmentPrefab: Prefab = null;

    @property(Prefab)
    hookPrefab: Prefab = null;
    

    @property
    ropeLength: number = 10;

    private collider: any;
    private rigidbody: RigidBody2D;
    private direction: number = 0;
    @property(Number)
    private walk_force: number = 250;
    @property(Number)
    private jump_force: number = 500;

    private _startJump: boolean = false;

    private rope: Node[] = [];
    private hook: Node;
    private hContact: boolean = false;
    private contactObject: RigidBody2D;
    private hLaunch: boolean = false;
    private cutTheRope: number = 0;
    private isSmall: boolean = false;
    private smallList: string[] = ["Medicbag<BoxCollider2D>", "fly<BoxCollider2D>", "FirstAidKit<BoxCollider2D>" ];

    //private weapons;
    //private currentWeapon: number = 0;

    private costil: boolean = true;

    private weaponSlot1: any = null;
    private weaponSlot2: any = null;


    switchWeapon() {
        if (this.weaponSlot1 && this.weaponSlot2) {
            this.weaponSlot1.hide();
            this.weaponSlot2.show();
            [this.weaponSlot1, this.weaponSlot2] = [this.weaponSlot2, this.weaponSlot1];
            console.log(this.weaponSlot1, ", ", this.weaponSlot2)
        }
    }

    pickupWeapon(weapon: any) {
        console.log(weapon)
        if (!this.weaponSlot1) {
            this.weaponSlot1 = this.node.addComponent(weapon);
        } else if (!this.weaponSlot2) {            
            this.weaponSlot2 = this.node.addComponent(weapon);
            this.weaponSlot2.hide();
        } else {
            console.log("nope!");
            this.weaponSlot1.destroy();
            this.weaponSlot1 = this.node.addComponent(weapon);
            console.log("Ќет свободных слотов дл€ оружи€!");
        }
    }
    

    onLoad() {
        PlayerGlobal.playerNode = this.node;
        this.HPLabel = this.node.getComponentInChildren(Label);
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
        
        
        
    }

    hookJump() {
        let a = this.hook.getWorldPosition().subtract(this.node.getWorldPosition());
        this.rigidbody.applyForceToCenter(new Vec2(a.x*10000, a.y*10000), true);
        this.hookDespawn();
    }

    hookGrab() {
        let a = this.node.getWorldPosition().subtract(this.hook.getWorldPosition());
        this.contactObject.applyForceToCenter(new Vec2(a.x * 1000, a.y * 1000), true)
        this.hookDespawn();
    }

    hookLaunch(mouseLoc: Vec2) {
        
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
                distanceJoint.enabled = false; //”даление этой строки ломает всю физику
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

        let distanceJoint = this.hook.getComponent(DistanceJoint2D);
        distanceJoint.connectedBody = this.rope[this.ropeLength - 1].getComponent(RigidBody2D);
        distanceJoint.enabled = false; //”даление этой строки ломает всю физику
        distanceJoint.enabled = true; //”даление этой строки ломает всю физику
        //let x = 0;
        //if (mouseLoc.x - this.node.worldPosition.x < 0)
        //console.log(x)
        let tar: Vec2 = mouseLoc.subtract(new Vec2(this.node.worldPosition.x,this.node.worldPosition.y));
        let mult: number = 10 / tar.length();
        tar.set(tar.x * mult, tar.y * mult);
        this.hook.getComponent(RigidBody2D).linearVelocity = tar;
        console.log(this.node.getWorldPosition());
        //mouseLoc.x - this.node.worldPosition.x, mouseLoc.y - this.node.worldPosition.y); //applyForceToCenter(new Vec2(mouseLoc.x - this.node.worldPosition.x, mouseLoc.y - this.node.worldPosition.y), true);
        //setTimeout(this.hookDespawn, 10000);
    }

    hookHit(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        
        if (otherCollider.name != "ropeSegment1<BoxCollider2D>" && !this.hContact && otherCollider.node != this.node) {
            if (this.smallList.indexOf(otherCollider.name) !== 1) {
                this.isSmall = true;
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
        
        this.hook.removeFromParent();
        this.hook.destroy();
        let c: Node;
        for (let i = 0; i < this.ropeLength; i++) {
            c = this.rope.pop();
            console.log(i);
            c.removeFromParent();
            c.destroy();
        }
        this.hContact = false;
        this.hLaunch = false;
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
        if (this.hook && !this.hContact) {
            if (this.cutTheRope != 0 && this.cutTheRope < this.getDistance(this.hook.getWorldPosition(), this.node.getWorldPosition())) {
                this.hookDespawn();
            }
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
        case 70: // F
            this.switchWeapon()
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
        if (otherCollider.node.name === 'Medicbag') {
            this.increaseHealth(80);
            otherCollider.node.removeFromParent();
            otherCollider.node.destroy();
            console.log('Ouagh thanks a lot my friend');
            if (this.HPLabel) {
                this.HPLabel.string = `HP: ${this.HP}`;
            }
        }
        if (otherCollider.node.name === 'FirstAidKit') {
            this.increaseHealth(20);
            otherCollider.node.removeFromParent();
            otherCollider.node.destroy();
            console.log('Using a first aid!');
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
        this.node.destroy()

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


