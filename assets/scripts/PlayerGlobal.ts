import { _decorator, Component, Node, Vec2 } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('PlayerGlobal')
export class PlayerGlobal extends Component {
    public static playerNode: Node = null;
    public static touchArea: Node = null;
    public static weapon: Node = null;
    public static ML: Vec2 = new Vec2(0,0);

}


