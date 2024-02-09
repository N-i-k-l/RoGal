import { _decorator, Component, Node, systemEvent, SystemEventType, EventKeyboard, macro, Vec2, RigidBody2D, Collider2D, BoxCollider2D, Contact2DType, IPhysics2DContact, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {


    private collider: any;

    private rigidbody: any;
    private direction: number = 0;
    private walk_force: number = 1;
    private jump_force: number = 2;


    onLoad() {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
    }

    start() {
        this.rigidbody = this.node.getComponent(RigidBody2D);

        this.collider = this.node.getComponent(BoxCollider2D);

    }

    update(deltaTime: number) {
        this.rigidbody.applyForceToCenter(new Vec2(this.direction * this.walk_force, 0), true);
    }


    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.a:
            case macro.KEY.left: {
                this.direction = -1;
                break;
            }
            case macro.KEY.d:
            case macro.KEY.right: {
                this.direction = 1;
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

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.a:
            case macro.KEY.left: {
                this.direction = 0;
                break;
            }
            case macro.KEY.d:
            case macro.KEY.right: {
                this.direction = 0;
                break;
            }
            default:
                break;
        }
    }
}

