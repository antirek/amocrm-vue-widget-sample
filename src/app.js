import Vue from 'vue/dist/vue.js';
import Settings from './components/settings.vue';
import Card from './components/card.vue';
import store from './stores/index';

Vue.config.devtools = true;
Vue.config.silent = true;

const Widget = {
    render(self) {
        console.log('render');
        self.render_template({
            render: '<div id="{{ el }}"> {{el}}</div>',
          }, {el: Card.$el});

        const vm = new Vue({
          render: h => h(Card),
        }).$mount(Card.$el);

        console.log(vm);
        return true;
    },
    init() {
        console.log('oneDocs init');
        return true;
    },
    bind_actions() {
        console.log('oneDocs bind_actions');
        return true;
    },
    settings() {
        window.vue = new Vue({
            store: store,
            render: h => h(Settings),
        }).$mount(Settings.$el);
        console.log('oneDocs settings');
    },
    onSave() {

    },
    destroy() {

    },
    contacts_selected() {

    },
    leads_selected() {

    },
    tasks_selected() {

    }
};



export default Widget;