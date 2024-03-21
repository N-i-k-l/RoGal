import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, director, IPhysics2DContact, Node, Quat, RigidBody2D, Scene, Sprite, Vec2, Vec3 } from 'cc';
import { Player } from '../../../Player/Player';
import { PlayerGlobal } from '../../../PlayerGlobal';
const { ccclass, property } = _decorator;

@ccclass('fakeAir')
export class fakeAir extends Component {
    
    @property(Node)
    player: Node = PlayerGlobal.playerNode;
    @property(Number)
    XSpeed: number = 0; 

    private direction: number = 0;
    private startScale: number;

    start() {
        this.XSpeed -= Math.random() * 100
        this.player = PlayerGlobal.playerNode;
        this.startScale = this.node.scale.x;
        if (this.node.worldPosition.x > this.player.worldPosition.x && this.direction != -1) {
            this.direction = -1;
            this.node.setScale(new Vec3(this.startScale * 1, this.node.scale.y));
        }
        if (this.node.worldPosition.x < this.player.worldPosition.x && this.direction != 1) {
            this.direction = 1;
            this.node.setScale(new Vec3(this.startScale * -1, this.node.scale.y));
        }
    }

    update(deltaTime: number) {
        this.node.getComponent(RigidBody2D).applyForceToCenter(new Vec2(this.XSpeed * this.direction, 0), true);
        
    }

    
}


