import { _decorator, BoxCollider, BoxCollider2D, Component, EventKeyboard, macro, RigidBody, RigidBody2D, systemEvent, SystemEvent } from 'cc';
import { PlayerGlobal } from '../../scripts/PlayerGlobal';
const { ccclass, property } = _decorator;

@ccclass('Platform')
export class Platform extends Component {

    private initState: number;

    onLoad() {
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.keyUp, this);
    }

    start() {
        this.initState = this.getComponent(RigidBody2D).group
    }

    keyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.s, macro.KEY.down:
                console.log('Key s pressed');
                this.getComponent(RigidBody2D).group = 2;
                this.getComponent(BoxCollider2D).group = 2;
                break;
        }
    }

    keyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.s, macro.KEY.down:
                console.log('Key s released');
                this.getComponent(RigidBody2D).group = this.initState;
                this.getComponent(BoxCollider2D).group = this.initState;
                break;
        }
    }

    update(deltaTime: number) {
        if (PlayerGlobal.playerNode.worldPosition.y < this.node.worldPosition.y) this.getComponent(BoxCollider2D).enabled = false;
        else this.getComponent(BoxCollider2D).enabled = true;
    }
}

