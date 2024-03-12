import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('PlayerGlobal')
export class PlayerGlobal extends Component {
    public static playerNode: Node = null;
    public static touchArea: Node = null;
}

