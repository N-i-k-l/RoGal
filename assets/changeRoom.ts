import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('changeRoom')
export class changeRoom extends Component {
    @property()
    sceneName: string = "scenePrototype"; 
    start() {
        
    }

    newScene() {
        director.loadScene(this.sceneName);
    }

    update(deltaTime: number) {
        
    }
}

