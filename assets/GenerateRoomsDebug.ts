import { _decorator, Component, director, error, instantiate, Node, Prefab, resources, v2, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

class roomC
{
    Nd: Node;
    dirList: number[];
    dirRevercer: readonly number[] = [1, 0, 3, 2, 4];
    uses: number[];

    constructor(Nd:Node,dirList:number[]) {
        this.dirList = dirList;
        this.Nd = Nd;
        console.log(this.Nd);
        let i = 0;
        while (!i);
        
        console.log("Room created");
    }

    Place(sx: number, sy: number,direction:number): Vec2
    {
        let a: Vec2 = new Vec2(sx - this.dirList[2 * direction], sy - this.dirList[(2 * direction) + 1]);
        this.Nd.setPosition(a.x, a.y);
        this.Block(direction, false);
        console.log("room placed at " + this.Nd.position)
        return a
    }
    Block(direction, reversed) {
        if (reversed) direction = this.dirRevercer[direction];
        this.dirList[2 * direction] = NaN;
        this.dirList[(2 * direction) + 1] = NaN;
    }
    getDir(direction: number, reversed: boolean): number[] {
        console.log("dir:", direction);
        if (reversed) direction = this.dirRevercer[direction];
        console.log("dir1:", direction);
        return [this.Nd.position.x + this.dirList[2 * direction], this.Nd.position.y + this.dirList[2 * direction + 1]];
    }
}

@ccclass('GenerateRoomsDebug')
export class GenerateRoomsDebug extends Component {

    

    private rooms: string[] = ['rooms/room_test_start'/*,'rooms/room_test_papka',*/, 'rooms/room_test_shop', 'rooms/room_test_1'];
    private PlacedRooms: roomC[] = [];
    private roomList: roomC[] = [];
    
    onLoad() {
        console.log(this.rooms);
    }

    initRoom(err, prefab) {
        
    }

    createRoom(p: string) {
        let a: any;
        let b: any;
        let dirList: number[] = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN,0,0];
        resources.load(p, Prefab, (err, prefab) => {
            dirList = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN,0,0];
            const newNode = instantiate(prefab);
            director.getScene().getChildByName('Canvas').addChild(newNode);
            //newNode.setPosition(X, 0);
            a = newNode.getChildByName('Door_left');
            b = newNode.getChildByName('Door_right');
            //this.roomList.push(newNode);
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
            console.log(dirList);
            this.roomList.push(new roomC(newNode, dirList));
            //this.roomExits.push(dirList);
            //console.log(this.roomExits);
        })
        //console.log(dirList+" room " + p + " added at" + X);
        //return X + 100
    }

    

    start() {
        // this.rooms = this.rooms.sort(() => Math.random() - 0.5);
        while (this.rooms.length  > 0) {
            this.createRoom(this.rooms.pop());
        }
        director.getScene().getChildByName
        setTimeout(() => {
            this.PlacedRooms.push(this.roomList.pop());
            this.PlacedRooms[0].Place(0,0,4)
            this.roomList = this.roomList.sort(() => Math.random() - 0.5);
            let t: roomC;
            let r: number;
            let a;
            //let r1: number;
            while (this.roomList.length > 0) {
                r = Math.floor(Math.random() * 2);
                let count = 0;
                let count1 = 0;
                t = this.roomList.pop();
                a = this.PlacedRooms[Math.floor(Math.random() * (this.PlacedRooms.length + 1))].getDir(r, true);
                while (isNaN(a[0]))
                {
                    count++;
                    count1 = 0;
                    while (isNaN(t.getDir(r, true)[0]))
                    {
                        count1++;
                        r = Math.floor(Math.random() * 2);
                        console.log("r: "+r);
                        if (count1 > 10) {
                            console.log("error2")
                            break
                        }
                    }
                    a = this.PlacedRooms[Math.floor(Math.random() * (this.PlacedRooms.length+1))].getDir(r, true);
                    //console.log(a);
                    if (count > 10) {
                        console.log("error1")
                        break
                    }
                }
                count = 0;
                t.Place(a[0], a[1], r);
                this.PlacedRooms.push(t);
                t.Block(r, true);
            }
            
            
        }, 1000)
        
        
        
    }

    update(deltaTime: number) {
        
    }
}


