import { _decorator, Component, Node, BoxCollider2D, IPhysics2DContact, Collider2D, Contact2DType } from 'cc';
import { PlayerGlobal } from '../PlayerGlobal';
import { Player } from '../Player/Player';
const { ccclass, property } = _decorator;

@ccclass('cocos')
export class cocos extends Component {
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
            console.log('haleluyah');
            PlayerGlobal.playerNode.getComponent(Player).walk_force_m = 1.5;
            PlayerGlobal.playerNode.getComponent(Player).jump_force_m = 1.5;
            PlayerGlobal.playerNode.getComponent(Player).maxHPm = 1.5;
            this.isDestroyed = true;
        }

    }
}