import { _decorator, Component, Node, BoxCollider2D, IPhysics2DContact, Collider2D, Contact2DType } from 'cc';
import { PlayerGlobal } from '../PlayerGlobal';
import { Player } from '../Player/Player';
const { ccclass, property } = _decorator;

@ccclass('jumpboost')
export class jumpboost extends Component {
    otherCollider: any;
    start() {
        this.node.getComponent(BoxCollider2D).on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
    }

    update(deltaTime: number) {

    }

    onBeginContact(selfCollider: Collider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node === PlayerGlobal.playerNode) {
            console.log('Speed boosted!');
            PlayerGlobal.playerNode.getComponent(Player).walk_force *= 3;
            console.log(`Current speed rate - ${this.walk_force}`);
            this.node.destroy();
        }
    }
}
