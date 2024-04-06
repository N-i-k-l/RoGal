import { _decorator, Component, Node } from 'cc';
import { PlayerGlobal } from './PlayerGlobal';
const { ccclass, property } = _decorator;

@ccclass('fakePlayer')
export class fakePlayer extends Component {
    start() {
        PlayerGlobal.playerNode = this.node;
        console.log(PlayerGlobal.playerNode);
    }

    update(deltaTime: number) {
        
    }
}

