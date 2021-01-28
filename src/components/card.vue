<template>
  <div>
    <p>hello, {{ title }} {{token}}</p>
    <p>current card {{ current_card_id }}</p>
    token <input type="text" v-model="token" class="text-input">
    <button @click="start()" class="button-input">Connect</button>
  </div>
</template>

<script>
  import { Component, Vue } from 'vue-property-decorator';
  // import axios from 'axios';

  @Component({
    name: "Card",
  })

  export default class Card extends Vue {
    static $el = 'card_element';

    data() {
      return {
        title: 'Card',
        token: null,
        current_card_id: null,
      };
    }

    async start () {      
      this.current_card_id = AMOCRM.data.current_card.id;
      console.log('amocrm', AMOCRM.data.current_card);
    }
  }
</script>
