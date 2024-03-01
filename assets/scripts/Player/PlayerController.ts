import { _decorator, Component, Node, systemEvent, SystemEventType, EventKeyboard, Input, input, macro, Vec3, Vec2, RigidBody2D, Collider2D, BoxCollider2D, Contact2DType, IPhysics2DContact, Label, ProgressBar } from 'cc';
const { ccclass, property } = _decorator;

export const BLOCK_SIZE = 2;

@ccclass('PlayerController')
export class PlayerController extends Component {

    @property({ type: Label })
    private HPLabel: Label | null = null;
    private HP: number = 100;

    private collider: any;
    private rigidbody: any;
    private direction: number = 0;
    private walk_force: number = 7;
    private jump_force: number = 7;

    //used to judge if the player is jumping.
    private _startJump: boolean = false;

    //the number of steps will the player jump, should be 1 or 2. determined by which mouse button is clicked.
    private _jumpStep: number = 0;

    //the time it takes for the player to jump once.
    private _jumpTime: number = 0.1;

    //the time that the player's current jump action has taken, should be set to 0 each time the player jumps, when it reaches the value of `_jumpTime`, the jump action is completed.
    private _curJumpTime: number = 0;

    // The player's current vertical speed, used to calculate the Y value of position when jumping.
    private _curJumpSpeed: number = 0;

    // The current position of the player, used as the original position in the physics formula.
    private _curPos: Vec3 = new Vec3();

    //movement calculated by deltaTime.
    private _deltaPos: Vec3 = new Vec3(0, 0, 0);

    // store the final position of the player, when the player's jumping action ends, it will be used directly to avoid cumulative errors.
    private _targetPos: Vec3 = new Vec3();




    start() {
        input.on(Input.EventType.KEY_UP, this.onKeyRightLeft, this);
        this.rigidbody.applyForceToCenter(new Vec2(this.direction * this.walk_force, 0), true);
    }
    onKeyRightLeft(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.a:
            case macro.KEY.left: {
                this.direction = 1;
                break;
            }
            case macro.KEY.d:
            case macro.KEY.right: {
                this.direction = -1;
                break;
            }
            case macro.KEY.space:
            case macro.KEY.up: {
            this.rigidbody.applyForceToCenter(new Vec2(0, this.jump_force), true);
                break;
            }
            default:
                break;
        }
    }






    update(deltaTime: number) {
        this.rigidbody.applyForceToCenter(new Vec2(this.direction * this.walk_force, 0), true);
    }




}


