import { _decorator, Component, Node, BoxCollider2D, Collider2D, Contact2DType, director, IPhysics2DContact,  RigidBody2D } from 'cc';
import { genericGroundEnemy } from '../npc/enemy/generic/genericGroundEnemy';
import { genericAirEnemy } from '../npc/enemy/generic/genericAirEnemy';

const { ccclass, property } = _decorator;


@ccclass('Sword')
export class Sword extends Component {

    @property(Number)
    DMG: number = 0; 
    start() {

    }
    dealDmg(selfCollider: Collider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        console.log(otherCollider.node.name + " " + );
        if (otherCollider.group == 1) {
            this.genericGroundEnemy.getComponent(genericGroundEnemy).decreaseHealth(this.DMG);
        }
    }
    update(deltaTime: number) {
        
    }
}


