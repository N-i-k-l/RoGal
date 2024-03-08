import { _decorator, BoxCollider2D, Component, EventKeyboard, macro, RigidBody, RigidBody2D, systemEvent, SystemEvent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Platform')
export class Platform extends Component {

    private initState: number;

    onLoad() {
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.keyUp, this);
    }

    start() {
        this.initState = this.getComponent(RigidBody2D).group
        // Инициализация
    }

    keyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.s:
                console.log('Key s pressed');
                this.getComponent(RigidBody2D).group = 2;
                this.getComponent(BoxCollider2D).group = 2;
                break;
        }
    }

    keyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.s:
                console.log('Key s released');
                this.getComponent(RigidBody2D).group = this.initState;
                this.getComponent(BoxCollider2D).group = this.initState;
                break;
        }
    }

    private assignPhysicalState() {
        console.log('Platform switched to PHYSICAL state');
        // Ваша логика для перехода в физическое состояние
    }

    private assignDefaultState() {
        console.log('Platform returned to DEFAULT state');
        // Ваша логика для возврата в состояние по умолчанию
    }

    update(deltaTime: number) {
        // Обновление компонента
    }
}

