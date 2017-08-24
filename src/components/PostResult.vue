<template>
    <div class="post-result">
        <h2 style="margin: 0;text-align: center;">投稿結果</h2>
        <div>
            <h3 style="margin: 0;">獲得リア充度</h3>
            <div style="margin-bottom: 20px">
                <div>
                    獲得リア充度：{{ result.total_point }}ml
                </div>
                <div>
                    累計リア充度：{{ result.user_total_point }}ml
                </div>
            </div>
            <div>
                <section class="point-section">
                    <h3 class="point-title">投稿リア充度</h3>
                    <div class="point-info">
                        <table>
                            <tr>
                                <td>{{ result.todo.name }}</td><td>+{{ result.todo.base_point }}ml</td>
                            </tr>
                        </table>
                    </div>
                </section>
                <section class="point-section">
                    <h3 class="point-title">獲得リア充ボーナス</h3>
                    <div class="point-info">
                        <table v-for="bonus in result.getBonuses" v-if="result.getBonuses.length != 0">
                            <tr>
                                <td>{{ bonus.name }}</td>
                                <td>+{{ bonus.point }}ml</td>
                            </tr>
                        </table>
                        <div v-else="result.getBonuses.length != 0">
                            獲得したボーナスなし
                        </div>
                        <div class="point-total">
                            合計ボーナスリア充度： {{ totalBonusPoint }}ml
                        </div>
                    </div>
                </section>
                <section class="point-section">
                    <h3 class="point-title">獲得称号</h3>
                    <div class="point-info">
                        <table v-for="title in result.getTitle" v-if="result.getTitle.length != 0">
                            <tr>
                                <td>{{ title.name }}</td>
                                <td>+{{ title.point }}ml</td>
                            </tr>
                        </table>
                        <div v-else="result.getTitle.length != 0">
                            獲得した称号なし
                        </div>
                        <div class="point-total">
                            合計称号リア充度： {{ totalTitlePoint }}ml
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    name: 'post-result',
    props: ['result'],
    computed: {
        totalBonusPoint() {
            if(this.result.getBonuses.length == 0) return 0
            return this.result.getBonuses.reduce((p, c) => p + parseInt(c.point), 0)
        },
        totalTitlePoint() {
            if(this.result.getTitle.length == 0) return 0
            return this.result.getTitle.reduce((p, c) => p + parseInt(c.point), 0)
        },
    },
    mounted() {
        let items = this.result.total_point / 10 * 2

        for (var i=0; i<=items; i++) {
            var move = Math.ceil( Math.random()*50 );
            var pos = Math.ceil( Math.random()*50 );
            var scale = Math.ceil( Math.random()*10 );
            var stretch = Math.ceil( Math.random()*5 );
            var shake = Math.ceil( Math.random()*5 );
            $(this.$el).append('<div class="bubble move'+move+' pos'+pos+'"><div class="scale'+scale+'"><div class="shake'+shake+'"><span class="item stretch'+stretch+'"></span></div></div>')
        }
    }
}
</script>

<style lang="scss">
    .post-result {
        background: linear-gradient(to bottom, #d5ebfb 0%, #86c6e0 100%);
        overflow: hidden;
        position: relative;
        color: #1f1f21;
        text-align: left;
        padding: 20px;
    }
    .point-section {
        width: 100%;
        box-sizing: border-box;
        position: relative;
        text-align: center;
        margin-bottom: 10px;
        border: solid 1px;
        border-radius: 2px;
    }
    .point-title {
        margin: 0;
        padding: 0 10px;
        text-align: left;
        background-color: #86c6e0;
        font-size: 18px;
        color: #fff;
        font-weight: 100;
        z-index: 1;
        position: relative;
    }
    .point-info {
        background-color: #fff;
        z-index: 0;
        position: relative;
        font-size: 14px;
    }
    table,tr {
        width: 100%;
    }
    td {
        width: 50%;
    }

    .point-total {
        padding: 2px 10px;
        text-align: right;
        background-color: #ddd;
    }

    $b_white: rgba(255, 255, 255, 0.6);
    $b_blue: rgba(194, 227, 255, 1);
    $b_ease: cubic-bezier(0.470,0.000,0.745,0.715);


    //stretch setting
    @keyframes stretch {
        0% { transform: scaleX(1) scaleY(1); }
        33% { transform: scaleX(0.9) scaleY(1); }
        66% { transform: scaleX(1) scaleY(0.9); }
        100% { transform: scaleX(1) scaleY(1); }
    }
    @-webkit-keyframes stretch {
        0% { -webkit-transform: scaleX(1) scaleY(1); }
        33% { -webkit-transform: scaleX(0.9) scaleY(1); }
        66% { -webkit-transform: scaleX(1) scaleY(0.9); }
        100% { -webkit-transform: scaleX(1) scaleY(1); }
    }

    //shake setting
    @keyframes shake {
        0% { transform: translateX(10px); }
        50% { transform: translateX(-10px); }
        100% { transform: translateX(10px); }
    }
    @-webkit-keyframes shake {
        0% { -webkit-transform: translateX(10px); }
        50% { -webkit-transform: translateX(-10px); }
        100% { -webkit-transform: translateX(10px); }
    }

    //move setting
    @keyframes move {
        0% { transform: translateY(0px); }
        100% { transform: translateY(-1000px); opacity: 0; }
    }
    @-webkit-keyframes move {
        0% { -webkit-transform: translateY(0px); }
        100% { -webkit-transform: translateY(-1000px); opacity: 0; }
    }

    // ----------------------------------------------------------------------------------------
    //
    // bubble
    //
    // ----------------------------------------------------------------------------------------

    .field {
        background: -webkit-linear-gradient(top, #a5d4ea 0%,#86c6e0 100%);
        background: linear-gradient(to bottom, #a5d4ea 0%,#86c6e0 100%);
        overflow: hidden;
        position: relative;
        width: 100%;
    }

    // --------------------------------------------------------------------------------
    // item
    // --------------------------------------------------------------------------------
    .bubble {
        position: absolute;
        bottom: -20%;
        left: 50%;
        .item {
            display: block;
            width: 20px;
            height: 20px;
            border-radius: 100%;
            box-shadow: 0px 0px 15px 0px $b_white inset;
            -webkit-box-shadow: 0px 0px 15px 0px $b_white inset;
            position: relative;
            &:after {
                content: "";
                display: block;
                width: 20%;
                height: 20%;
                border-radius: 100%;
                background: rgba(255, 255, 255, 0.6);
                position: absolute;
                right: 15%;
                top: 15%;
                transform: rotateZ(45deg) scaleY(0.8);
                -webkit-transform:rotateZ(45deg) scaleY(0.8) ;
            }
        }
    }

    @for $i from 0 through 50 {
        $time: $i*0.2;
        $scale: $i*0.1;
        .stretch#{$i * 1} {
            animation: stretch ($time+2)+s ease 0s infinite normal;
            -webkit-animation: stretch ($time+2)+s ease 0s infinite normal;
        }
        .shake#{$i * 1} {
            animation: shake ($time+2)+s ease 0s infinite normal;
            -webkit-animation: shake ($time+2)+s ease 0s infinite normal;
        }
        .move#{$i * 1}  {
            animation: move ($time+5)+s $b_ease $time+s infinite normal;
            -webkit-animation: move ($time+5)+s $b_ease $time+s infinite normal;
        }
        .pos#{$i * 1}  {
            left: percentage($i*2/100);
        }
        .scale#{$i * 1}  {
            transform: scale($scale);
            -webkit-transform: scale($scale);
        }
    }
</style>
