import { _decorator, Component, director, EventMouse, instantiate, Node, Prefab, resources, Vec2, Vec3 } from 'cc';
import { bullet } from './Bullet';
import { PlayerGlobal } from '../../PlayerGlobal';
const { ccclass, property } = _decorator;
@ccclass('glock')
export class glock extends Component {
    private gun: Node;
    private Bullet: Prefab;
    private C: Node;
    private hidden: Boolean = false;

    onLoad() {
        
    }
    hide() {
        this.node.removeFromParent();
        this.hidden = true;
    }
    show() {
        this.node.setParent(this.C);
        this.hidden = false;
    }
    shoot(mouseLoc: Vec2) {
        if (this.hidden) return
        const Bullet = instantiate(this.Bullet);
        this.C.addChild(Bullet);
        Bullet.setPosition(this.gun.position);
        Bullet.getComponent(bullet).setTarget(new Vec3(mouseLoc.x, mouseLoc.y));
    }

    start() {
        this.C = PlayerGlobal.playerNode;
        resources.load("weapons/glock/glock", Prefab, (err, prefab) => {
            this.gun = instantiate(prefab);
            this.C.addChild(this.gun);
            this.gun.setPosition(0,0);
        })
        resources.load("weapons/glock/bullet", Prefab, (err, prefab) => {
            this.Bullet = prefab;
            PlayerGlobal.touchArea.on(Node.EventType.MOUSE_DOWN, (event: EventMouse) => {
                //console.log(event.getUILocation());
                //console.log(this.node.worldPosition);
                //console.log(this.node.position)
                if (event.getButton() == 0 && !this.hidden) {
                    this.shoot(event.getUILocation());
                } //console.log();
            }, this);
        })
    }

    

    update(deltaTime: number) { 
        if (!this.gun) return
        //this.gun.setWorldPosition(this.node.worldPosition);
    }
}


