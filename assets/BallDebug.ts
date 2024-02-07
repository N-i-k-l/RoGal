    import { _decorator, Component, EventKeyboard, macro, Node, RigidBody, System, SystemEvent, SystemEventType, RigidBody2D, Vec2, systemEvent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GenerateRoom')
export class GenerateRoom extends Component {
    private direction: number = 0;
    private directionY: number = 0;
    private rigidbody: any;



    onLoad() {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
    }


    start() {
        this.rigidbody = this.node.getComponent(RigidBody2D);

    }
    

    update(deltaTime: number) {
        this.rigidbody.applyForceToCentre(new Vec2(this.direction * 1500, this.directionY * 1500), true)
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.left: {
                this.direction = -1;
                break;
            }
            case macro.KEY.right: {
                this.direction = 1;
                break;
            }
            case macro.KEY.down: {
                this.directionY = -1;
                break;
            }
            case macro.KEY.up: {
                this.directionY = 1;
                break;
            }
            default: {
                break;
            }
        }

    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.left: {
                this.direction = 0;
                break;
            }
            case macro.KEY.right: {
                this.direction = 0;
                break;
            }
            case macro.KEY.down: {
                this.directionY = 0;
                break;
            }
            case macro.KEY.up: {
                this.directionY = 0;
                break;
            }
            default: {
                break;
            }
        }

    }
}

