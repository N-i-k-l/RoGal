import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { PlayerGlobal } from "../PlayerGlobal";

@ccclass('touchArea')
export class touchArea extends Component {
    start() {
        PlayerGlobal.touchArea = this.node;
    }
}

