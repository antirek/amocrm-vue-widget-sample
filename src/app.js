import Vue from 'vue/dist/vue.js';
import Settings from './components/settings.vue';
import AdvancedSettings from './components/advancedSettings.vue';
import Card from './components/card.vue';
import store from './stores/index';

Vue.config.devtools = true;
Vue.config.silent = true;

const Widget = {
  render(self) {
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

    console.log('app render');
    return true;
  },
  init() {
    console.log('app init');
    return true;
  },
  bind_actions() {
    console.log('app bind_actions');
    return true;
  },
  settings() {
    const vm = new Vue({
      store: store,
      render: h => h(Settings),
    }).$mount(Settings.$el);
    console.log('app settings');
  },
  advancedSettings() {
    $('#list_page_holder').html('<div id="advSettings1212"></div>');
    window.vueAdvancedSettings = new Vue({
      store: store,
      render: h => h(AdvancedSettings),
    }).$mount(AdvancedSettings.$el);
    
    console.log('app advanced settings');
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