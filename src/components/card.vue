<template>
  <div>
    <p>hello, {{ title }} {{token}}</p>
    <p>current card {{ current_card_id }}</p>
    token <input type="text" v-model="token" class="text-input">
    <button @click="start()" class="button-input">Connect</button>
    <br/>
    <input type="text" v-model="hard" class="text-input">
    <button @click="sendHard()" class="button-input">Connect</button>
  </div>
</template>

<script>
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import axios from 'axios';

  @Component({
    name: "Card",
  })

  export default class Card extends Vue {
    @Prop() widget;
    static $el = 'card_element';

    get CONTACT_API_URL() {
      return `https://${this.widget.system().domain}/api/v2/contacts`
    }

    get LEAD_API_URL() { 
      return `https://${this.widget.system().domain}/api/v4/leads`
    }
  
    title = 'Card';
    token = null;
    current_card_id = null;

    async fetchContactByLeadId(leadId) {
      const url = `${this.LEAD_API_URL}/${leadId}`;
      console.log('lead url', url);
      const response =  (await axios.get(url, {params: {with: 'contacts'}})).data;
      console.log('fetch lead', response);
      return response && response._embedded.contacts ? response._embedded.contacts[0] : null;
    }

    async fetchContactById(contactId) {
      const response = (await axios.get(this.CONTACT_API_URL, {params: {id: contactId}})).data;
      console.log('response contact', response);      
      return response ? response.custom_fields_values : undefined;
    }

    async start () {
      this.current_card_id = AMOCRM.data.current_card.id;
      console.log('amocrm', AMOCRM.data.current_card);
      console.log('self', this.widget);
      console.log('lead api url', this.LEAD_API_URL);
      
      const contactMetadata = await this.fetchContactByLeadId(AMOCRM.data.current_card.id);
      console.log('lead', contactMetadata);

      const contact = await this.fetchContactById(contactMetadata.id);
      console.log('contact', contact);
    }

    async sendHard() {
      const text = this.hard;
      console.log('text', text);
      const elements = $('.linked-form__field__value');
      console.log('elements', elements);

      $('div[data-pei-code="phone"]').each((index, element) => {
        const localtimeElement = $(`<div class=".mbln_localtime"></div>`)
          .appendTo(element.closest('.linked-form__field__value'));
      });
      return;
    }

  }
</script>

<style>

.mobilon-localtime-good {
    border-color: #87d887;
}

.mobilon-localtime-bad {
    border-color: #ef9b9b;
}
</style>