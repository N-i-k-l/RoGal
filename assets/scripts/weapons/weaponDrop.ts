import { _decorator, Component, instantiate, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('weaponDrop')
export class weaponDrop extends Component {


    public static drop(sprite: SpriteFrame, playerNode: Node, weapon: Component) {
        //instantiate weapon
        
        //weapon.destroy
    }

}



