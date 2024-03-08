import { _decorator, Component, EventKeyboard, macro, systemEvent, SystemEvent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Platform')
export class Platform extends Component {

    onLoad() {
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.keyUp, this);
    }

    start() {
        // Инициализация
    }

    keyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.s:
                console.log('Key s pressed');
                this.assignPhysicalState();
                break;
        }
    }

    keyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.s:
                console.log('Key s released');
                this.assignDefaultState();
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

