import { _decorator, Component, Node } from 'cc';
import { glock } from './weapons/glock/glock';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {

     weaponsList = [glock]
     weaponspritesList = []


}


