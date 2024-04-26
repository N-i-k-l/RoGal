import { _decorator, Component, Node, BoxCollider2D, IPhysics2DContact, Collider2D, Contact2DType } from 'cc';
import { PlayerGlobal } from '../PlayerGlobal';
import { sneakyBastard } from './sneakyBastard';
const { ccclass, property } = _decorator;

@ccclass('dallaspayday2')
export class dallaspayday2 extends Component {
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
            console.log('No One Cared Who I Was...');
            PlayerGlobal.playerNode.addComponent(sneakyBastard)
            console.log('Until I put on the mask.')
            this.isDestroyed = true;
        }

    }

}

