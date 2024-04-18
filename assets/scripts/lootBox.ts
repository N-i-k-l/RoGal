import { _decorator, Component, Node, BoxCollider2D, IPhysics2DContact, Collider2D, Contact2DType, SpriteFrame, random, resources, Prefab, instantiate, find, Canvas } from 'cc';
import { glock } from './weapons/glock/glock';
import { shotgun } from './weapons/Shotgun/shotgun';
import { pickupWeapon } from './weapons/pickupWeapon';
const { ccclass, property } = _decorator;

@ccclass('lootBox')
export class lootBox extends Component {

    private weaponsList = [glock, shotgun];
    @property(SpriteFrame)
    weaponspritesList = []
    weaponDrop: Prefab;

    start() {

    }

    onLoad() {
        resources.load('weapons/PickupWeapon', Prefab, (err, prefab) => {
            this.weaponDrop = prefab;
        });
    }

    update(deltaTime: number) {
        
    }

    onDestroy() {
        let u = Math.floor(random() * this.weaponsList.length);
        let a = instantiate(this.weaponDrop);
        a.getComponent(pickupWeapon).setWeapon(this.weaponspritesList[u], this.weaponsList[u]);
        find('Canvas').addChild(a);
        a.setWorldPosition(this.node.getWorldPosition());
    }
}


