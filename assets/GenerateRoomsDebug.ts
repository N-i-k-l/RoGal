import { _decorator, Component, director, instantiate, Node, Prefab, resources, v2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GenerateRoomsDebug')
export class GenerateRoomsDebug extends Component {
    
    private rooms: string[] = ['rooms/room_test_papka', 'rooms/room_test_shop', 'rooms/room_test_1'];
    private roomExits: number[][] = [];
    private roomList: Node[] = [];
    
    onLoad() {
        console.log(this.rooms);
    }

    initRoom(err, prefab) {
        
    }

    createRoom(p: string) {
        let a: any;
        let b: any;
        let dirList: number[] = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN]
        resources.load(p, Prefab, (err, prefab) => {
            const newNode = instantiate(prefab);
            director.getScene().getChildByName('Canvas').addChild(newNode);
            //newNode.setPosition(X, 0);
            a = newNode.getChildByName('Door_left');
            b = newNode.getChildByName('Door_right');
            this.roomList.push(newNode);
            if (a) {
                dirList[0] = (a.position.x + a.width / 2);
                dirList[1] = (a.position.y + a.height / 2);
                //console.log(dirList)
            }
            if (b) {
                dirList[2] = (b.position.x + b.width / 2);
                dirList[3] = (b.position.y + b.height / 2);
                //console.log(dirList)
            }
            this.roomExits.push(dirList);
            //console.log(this.roomExits);
        })
        //console.log(dirList+" room " + p + " added at" + X);
        //return X + 100
    }

    

    start() {
        this.rooms = this.rooms.sort(() => Math.random() - 0.5);
        let pos: number = 0;
        while (this.rooms.length  > 0) {
            this.createRoom(this.rooms.pop());
            //pos += 100;
        }
        director.getScene().getChildByName
        setTimeout(() => {
            this.roomList = this.roomList.sort(() => Math.random() - 0.5);

            for (let i in this.roomList) {
                //this.roomList[i].position = ;
            }
            console.log(this.roomExits)
            
        }, 1000)
        
        
        
    }

    update(deltaTime: number) {
        
    }
}


