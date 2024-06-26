import { _decorator, Component, find, instantiate, Node, Prefab, resources, Vec2, Vec3 } from 'cc';
import { PlayerGlobal } from '../../../PlayerGlobal';
import { BulletGeneric } from './BulletGeneric';
import { pelletGeneric } from './pelletGeneric';
const { ccclass, property } = _decorator;

@ccclass('Shotguner')
export class Shotguner extends Component {
    private direction: number = 0;
    private startScale: number;
    private player: Node;
    @property()
    attackRange: number = 100;
    @property()
    shootingSpeed: number = 10;
    @property(Prefab)
    Pellet: Prefab;
    @property()
    bulletCount: number = 4; 
    private ticks: number = 10;
    private ticks_start = this.ticks;

    

    start() {

        this.startScale = this.node.scale.x;
        this.player = PlayerGlobal.playerNode;
        this.direction = 1;
    }

    shoot() {
        const spreadAngle: number = 180; 

        for (let i = 0; i < this.bulletCount; i++) {
            const flameInstance = instantiate(this.Pellet);
            this.node.parent.addChild(flameInstance);
            flameInstance.setPosition(this.node.position);
            flameInstance.getComponent(pelletGeneric).setTarget(PlayerGlobal.playerNode.worldPosition);
        }
    }

    

    update(deltaTime: number) {
        if (PlayerGlobal.playerNode.getWorldPosition().subtract(this.node.getWorldPosition()).length() > this.attackRange) {
            if (this.ticks <= 0) {
                this.ticks = this.ticks_start;
                this.shoot();
            }
            else {
                this.ticks -= 1;
            }
        }
        
        if (this.ticks == 0) {

            this.ticks = 10;
            this.shoot();
        }
        if (this.node.worldPosition.x > this.player.worldPosition.x && this.direction != -1) {
            this.direction = -1;
            this.node.setScale(new Vec3(this.startScale * 1, this.node.scale.y));
        }
        if (this.node.worldPosition.x < this.player.worldPosition.x && this.direction != 1) {
            this.direction = 1;
            this.node.setScale(new Vec3(this.startScale * -1, this.node.scale.y));
        }
    }
}



