import { _decorator, Component, macro, RigidBody2D, systemEvent, SystemEventType, Vec2 } from 'cc';
import { PlayerGlobal } from '../PlayerGlobal';

const { ccclass } = _decorator;

@ccclass('jetpack')
export class jetpack extends Component {
    private force: number = 125; 

    start() {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event: any) {
        if (event.keyCode === macro.KEY.space || event.keyCode === macro.KEY.up) {
            PlayerGlobal.playerNode.getComponent(RigidBody2D).applyForceToCenter(new Vec2(0, this.force), true);
            console.log('to infinity and beyond!')
        }
    }

    onKeyUp(event: any) {
        if (event.keyCode === macro.KEY.space || event.keyCode === macro.KEY.up) {
        }
    }
}
