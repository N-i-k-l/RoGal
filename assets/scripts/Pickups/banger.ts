import { _decorator, Component, director, EventMouse, instantiate, Node, Prefab, resources } from 'cc';
import { PlayerGlobal } from '../PlayerGlobal';
import { Bang } from './Bang';
const { ccclass, property } = _decorator;

@ccclass('banger')
export class banger extends Component {
    private Bang: Prefab;
    start() {
        
    }



    update(deltaTime: number) {
        
    }
}


