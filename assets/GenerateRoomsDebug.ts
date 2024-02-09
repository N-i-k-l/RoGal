import { _decorator, Component, director, instantiate, Node, Prefab, resources, v2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GenerateRoomsDebug')
export class GenerateRoomsDebug extends Component {
    
    private rooms: string[] = ['rooms/room_test_papka', 'rooms/room_test_shop', 'rooms/room_test_1',];
    
    onLoad() {
        console.log(this.rooms);
    }
    createRoom(p: string, X: number){
        resources.load(p, Prefab, (err, prefab) => {
            const newNode = instantiate(prefab);
            director.getScene().getChildByName('Canvas').addChild(newNode);
            newNode.setPosition(X, 0)
        })
        console.log("room " + p + " added at"+ X);
    }
    start() {
        
        this.rooms = this.rooms.sort(() => Math.random() - 0.5);
        let pos: number = 0;
        while (this.rooms.length  > 0) {
            this.createRoom(this.rooms.pop(), pos);
            pos += 100;
        }
        
       /*
        resources.load('rooms/room_test_papka', Prefab, (err, prefab) => {
            const newNode = instantiate(prefab);
            director.getScene().getChildByName('Canvas').addChild(newNode);
        });*/
    }

    update(deltaTime: number) {
        
    }
}


