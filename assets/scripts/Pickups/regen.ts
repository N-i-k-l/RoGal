import { _decorator, Component } from 'cc';
import { PlayerGlobal } from '../PlayerGlobal';
import { Player } from '../Player/Player';

const { ccclass } = _decorator;

@ccclass('regen')
export class regen extends Component {
    private timer: number = 0;
    private interval: number = 1; // Интервал в секундах для регенерации

    start() {
        this.timer = 0;
    }

    update(deltaTime: number) {
        this.timer += deltaTime;
        if (this.timer >= this.interval) {
            this.increaseHealth(1);
            this.timer = 0; 
        }
    }

    increaseHealth(amount: number) {
        console.log('healed')
            PlayerGlobal.playerNode.getComponent(Player).increaseHealth(amount); 
        
    }
}
