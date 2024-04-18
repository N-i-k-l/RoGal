import { _decorator, Component, Node, BoxCollider2D, IPhysics2DContact, Collider2D, Contact2DType } from 'cc';
import { PlayerGlobal } from '../PlayerGlobal';
import { Player } from '../Player/Player';
const { ccclass, property } = _decorator;

@ccclass('firstAidKit')
export class firstAidKit extends Component {
    otherCollider: any;
    start() {
        this.node.getComponent(BoxCollider2D).on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
    }

    update(deltaTime: number) {

    }

    onBeginContact(selfCollider: Collider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node === PlayerGlobal.playerNode) {
            console.log('using a first Aid Kit!');
            PlayerGlobal.playerNode.getComponent(Player).increaseHealth(80);
            this.node.destroy();
        }
    }
}
