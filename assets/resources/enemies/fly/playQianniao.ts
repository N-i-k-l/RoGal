cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        var anim = this.getComponent(cc.Animation);
        anim.play();
    },
});