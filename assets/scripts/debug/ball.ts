import { _decorator, Component, EventKeyboard, Node, SystemEvent, systemEvent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ball')
export class ball extends Component {
    private dirX = 0;
    private dirY = 0;
    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case 65: // A
            case 37: // LEFT
                this.dirX = -1;
                break;
            case 68: // D
            case 39: // RIGHT
                this.dirX = 1;
                break;
            case 32: // SPACE
            case 38: // UP
                this.dirY = 1;
                break
            case 40: // DOWN
                this.dirY = -1;
                break
            default:
                break
        }
    }

    onKeyUp(event: EventKeyboard) {
        
        switch (event.keyCode) {
            case 65: // A
            case 37: // LEFT
                this.dirX = 0;
                break;
            case 68: // D
            case 39: // RIGHT
                this.dirX = 0;
                break;
            case 32: // SPACE
            case 38: // UP
                this.dirY = 0;
                break
            case 40: // DOWN
                this.dirY = 0;
                break
            default:
                break
        }
    }
    start() {
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    update(deltaTime: number) {
        this.node.setPosition(this.node.position.x + this.dirX * 10, this.node.position.y + this.dirY * 10,);

    }
}


