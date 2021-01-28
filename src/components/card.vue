<template>
  <div>
    <p>hello, {{ title }}</p>
    <p>current card {{ current_card }}</p>
    token <input type="text" v-model="token" class="text-input">
    <button @click="start()">Connect</button>
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
      };
    }

    async start () {
      this.current_card = AMOCRM.data.current_card;      
    }
  }
</script>
