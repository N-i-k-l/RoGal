import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, director, IPhysics2DContact, Node, Sprite } from 'cc';
import { PlayerGlobal } from './PlayerGlobal';
const { ccclass, property } = _decorator;

@ccclass('door')
export class door extends Component {
    @property(Node)
    closeHitbox: Node;
    start() {
        if (this.closeHitbox) this.closeHitbox.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.doorShut, this);
    }
    doorShut(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log('a');
        if (otherCollider.group == PlayerGlobal.playerNode.getComponent(Collider2D).group) {
            console.log('b');
            this.node.getComponent(Sprite).enabled = false;
            this.node.getComponent(Sprite).enabled = true;
            this.node.getComponent(BoxCollider2D).enabled = false;
            this.node.getComponent(BoxCollider2D).enabled = true;
        }
    }

    update(deltaTime: number) {
        
    }
}


