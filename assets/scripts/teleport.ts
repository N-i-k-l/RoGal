import { _decorator, Collider2D, Component, Contact2DType, director, Node } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('teleport')

export class teleport extends Component {
    @property(String)
    target: string = "PlayerRoom";
    start() {
        this.node.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.teleport, this);
    }

    teleport() {
        director.loadScene(this.target);
    }

    update(deltaTime: number) {
        
    }
}

