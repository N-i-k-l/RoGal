import { _decorator, Component, Node, systemEvent, SystemEventType, EventKeyboard, macro, Vec2, RigidBody2D, Collider2D, BoxCollider2D, Contact2DType, IPhysics2DContact, Label, Prefab, director, instantiate, DistanceJoint2D, error, RigidBodyComponent, ERigidBody2DType, EventMouse, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

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
    private rigidbody: any;
    private direction: number = 0;
    private walk_force: number = 100;
    private jump_force: number = 6000;
    private _startJump: boolean = false;

    private rope: Node[] = [];
    private hook: Node;
    private hContact: boolean = false;
    private hLaunch: boolean = false;
    

    onLoad() {
        this.HPLabel = this.node.getComponentInChildren(Label);
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
        director.getScene().getChildByName("Canvas").getChildByName("WallOutside").on(Node.EventType.MOUSE_DOWN, (event: EventMouse) => {
            if (event.getButton() == 2) {
                this.hookLaunch(event.getLocation());
            } //console.log();
        }, this);
    }
    hookJump() {

    }
    hookLaunch(mouseLoc: Vec2) {
        if (this.hContact) this.hookDespawn();
        if (this.hLaunch) return;
        this.hLaunch = true;
        console.log(mouseLoc);
        console.log(this.node.position);
        let prevSegment = this.node;
        let sc = director.getScene().getChildByName("Canvas");
        
        for (let i = 0; i < this.ropeLength; i++) {
            let segment = instantiate(this.segmentPrefab);
            
            sc.addChild(segment);
            segment.setPosition(prevSegment.position.x, prevSegment.position.y);

            let distanceJoint = segment.getComponent(DistanceJoint2D);

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
        this.hook.setPosition(prevSegment.position.x, prevSegment.position.y);

        this.hook.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.hookHit, this);

        let distanceJoint = this.hook.getComponent(DistanceJoint2D);
        distanceJoint.connectedBody = this.rope[this.ropeLength - 1].getComponent(RigidBody2D);
        distanceJoint.enabled = false; //Удаление этой строки ломает всю физику
        distanceJoint.enabled = true; //Удаление этой строки ломает всю физику
        //let x = 0;
        //if (mouseLoc.x - this.node.worldPosition.x < 0)
        //console.log(x)
        let a = new Vec2;
        let b = new Vec2(this.node.worldPosition.x, this.node.worldPosition.y);
        a = mouseLoc.subtract(b);
        console.log(a);
        let modul: number = (Math.abs(this.node.worldPosition.x) * Math.abs(this.node.worldPosition.y)) / (Math.abs(a.x) * Math.abs(a.y));
        //a.set(a.x * modul, a.y * modul);
        console.log(a);
        //console.log(mouseLoc.signAngle(a));
        //(/*(new Vec2(this.node.position.x, this.node.position.y)).angle(mouseLoc)*/);
        this.hook.getComponent(RigidBody2D).linearVelocity = a;
        //mouseLoc.x - this.node.worldPosition.x, mouseLoc.y - this.node.worldPosition.y); //applyForceToCenter(new Vec2(mouseLoc.x - this.node.worldPosition.x, mouseLoc.y - this.node.worldPosition.y), true);
        //setTimeout(this.hookDespawn, 10000);
    }

    hookHit(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.name != "ropeSegment1<BoxCollider2D>" && !this.hContact && otherCollider.node != this.node) {
            this.hContact = true;
            console.log(otherCollider.node);
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


    update(deltaTime: number) {
        this.rigidbody.applyForceToCenter(new Vec2(this.direction * this.walk_force, 0), true);
        if (this.hook && !this.hContact) {

        }
    }


    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case 65: // A
            case 37: // LEFT
                this.direction = -1;
                break;
            case 68: // D
            case 39: // RIGHT
                this.direction = 1;
                //this.node.setScale(new Vec3(this.node.scale.x * -1, this.node.scale.y));
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
        if ((otherCollider.node.worldPosition.y < this.node.worldPosition.y) && (otherCollider.node.getComponent(BoxCollider2D).sensor == false)) {
            //console.log(otherCollider.name);
            this._startJump = false;
        }
    }

    decreaseHealth(amount: number) {
        this.HP -= amount;
        if (this.HP < 0) {
            this.HP = 0;
        }
        console.log(amount);
        this.updateHealthLabel();
    }

    increaseHealth(amount: number) {
        this.HP += amount;
        if (this.HP > 100) {
            this.HP = 100;
        }
        this.updateHealthLabel();
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


