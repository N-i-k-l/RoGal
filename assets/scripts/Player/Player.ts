    import { _decorator, Component, Node, systemEvent, SystemEventType, EventKeyboard, macro, Vec2, RigidBody2D, Collider2D, BoxCollider2D, Contact2DType, IPhysics2DContact, Label, ProgressBar, RaycastResult2D, PhysicsRayResult, Director, Input, KeyCode, XrKeyboardEventType} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property({ type: Label })
    private HPLabel: Label | null = null;
    private HP: number = 100;

    private collider: any;
    private rigidbody: any;
    private direction: number = 0;
    private walk_force: number = 70;
    private jump_force: number = 40;
    private _startJump: boolean = false;


    onLoad() {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyRightLeft, this);
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
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

    }


    onKeyRightLeft(event: EventKeyboard) {
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

                if (this.isPlayerOnGround()) {
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


    isPlayerOnGround(): boolean {
        return this.collider && this.collider.contacts && this.collider.contacts.some(contact => contact.collider === this.collider);
    }

    

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // Check the collider type or any other necessary conditions
        if (otherCollider instanceof BoxCollider2D && otherCollider.node?.name === "Enemy") {
            this.HP--;
            this.HPLabel.string = "HP: " + this.HP;
        }
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


