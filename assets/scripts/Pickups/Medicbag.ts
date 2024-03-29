import { _decorator, Component, Node, BoxCollider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Medicbag')
export class Medicbag extends Component {
    otherCollider: any;
    start() {

    }

    update(deltaTime: number) {
        
    }
    Heal(otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
    if(otherCollider.node.name === 'Player') {
        this.otherCollider.increaseHealth(80);
        this.destroy();
    }
}
}

