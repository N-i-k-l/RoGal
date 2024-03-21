import { _decorator, Component, director, instantiate, Node, Prefab, random } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('spawner')
export class spawner extends Component {

    @property(Prefab)
    pref: Prefab = null;

    @property()
    freq: number = 1;

    private a: number = 0;
    private b: number = 10000;

    start() {
        
            
    }

    update(deltaTime: number) {
        this.a += Math.floor(Math.random() * this.freq);
        console.log(this.b);
        if (this.b > this.a) return
        
        let l: Node = instantiate(this.pref);
        director.getScene().getChildByName('Canvas').addChild(l);
        l.setPosition(this.node.getPosition());
        setTimeout(() => l.destroy(), 100000);
        this.a = 0;
    }
}

