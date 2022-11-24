import Vue from 'vue/dist/vue.js';

import Settings from './components/settings.vue';
import AdvancedSettings from './components/advancedSettings.vue';
// import Card from './components/card.vue';
import store from './stores/index';

import CurrentTime from './stores/currentTime';

Vue.config.devtools = true;
Vue.config.silent = true;

import { TableComponent, TableColumn } from 'vue-table-component';

Vue.component('table-component', TableComponent);
Vue.component('table-column', TableColumn);

const Widget = {
  render(self) {
    /*
    self.render_template({
        render: '<div id="{{ el }}"></div>',
      }, {el: Card.$el});
      
    const vm = new Vue({
      render: h => h(Card, {
        props: {
          widget: self,
        },
      }),
    }).$mount('#' + Card.$el);
    */
    return true;
  },
  init(self, moment) {
    const curTime = new CurrentTime({widget: self});
    curTime.bind(moment);
    return true;
  },
  bind_actions() {
    return true;
  },
  settings() {
    const vm = new Vue({
      store: store,
      render: h => h(Settings),
    }).$mount(Settings.$el);
  },
  advancedSettings() {
    $('#list_page_holder').html('<div id="advSettings1212"></div>');
    window.vueAdvancedSettings = new Vue({
      store: store,
      render: h => h(AdvancedSettings),
    }).$mount(AdvancedSettings.$el);
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