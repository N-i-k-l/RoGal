import { _decorator, Component, Node, Prefab, instantiate, find } from 'cc';
import { cocos } from './Pickups/cocos';
const { ccclass, property } = _decorator;

@ccclass('papka')
export class papka extends Component {

    @property(Prefab)
    artifacts: Prefab[] = [];

    onDestroy() {
        let index = Math.floor(Math.random() * this.artifacts.length);
        let artifact = instantiate(this.artifacts[index]);
        find('Canvas').addChild(artifact);
        artifact.setWorldPosition(this.node.getWorldPosition());
    }
}
