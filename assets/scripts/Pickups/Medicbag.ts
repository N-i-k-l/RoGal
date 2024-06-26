import { _decorator, Component, Node, BoxCollider2D, IPhysics2DContact, Collider2D, Contact2DType } from 'cc';
import { PlayerGlobal } from '../PlayerGlobal';
import { Player } from '../Player/Player';
const { ccclass, property } = _decorator;

@ccclass('Medicbag')
export class Medicbag extends Component {
    otherCollider: any;

    private isDestroyed = false;

    lateUpdate() {
        if (this.isDestroyed) this.node.destroy();
    }


    start() {
        this.node.getComponent(BoxCollider2D).on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
    }

    update(deltaTime: number) {
        
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node === PlayerGlobal.playerNode) {
            console.log('using a medickbag!');
            PlayerGlobal.playerNode.getComponent(Player).increaseHealth(80);
            console.log('Ouagh thanks a lot my friend');
            this.isDestroyed = true;
        }

}
}


