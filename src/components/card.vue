<template>
  <div>
    <p>hello, {{ title }} {{token}}</p>
    <p>current card {{ current_card_id }}</p>
    token <input type="text" v-model="message" class="text-input" id="token">
    <button @click="start()" class="button-input">Connect</button>
    <br/>
    <date-picker v-model="time1" valueType="format"></date-picker>
    <button class="button-input" @click="copy()">
      Copy to clipboard
    </button>
  </div>
</template>

<script>
  import { Component, Vue, Prop } from 'vue-property-decorator';

  import axios from 'axios';
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';

  @Component({
    name: "Card",
    components: { DatePicker, Clipboard, },
  })
  
  export default class Card extends Vue {
    @Prop() widget;
    @Prop() time1;

    static $el = 'card_element';

    get CONTACT_API_URL() {
      return `https://${this.widget.system().domain}/api/v2/contacts`
    }

    get LEAD_API_URL() { 
      return `https://${this.widget.system().domain}/api/v4/leads`
    }

    get message() {
      return `${this.token} ${this.time1}`;
    }
  
    title = 'Card';
    token = 'asasakldkaldl';
    current_card_id = null;

    async fetchContactByLeadId(leadId) {
      const url = `${this.LEAD_API_URL}/${leadId}`;

      const response =  (await axios.get(url, {params: {with: 'contacts'}})).data;
      return response && response._embedded.contacts ? response._embedded.contacts[0] : null;
    }

    async fetchContactById(contactId) {
      const response = (await axios.get(this.CONTACT_API_URL, {params: {id: contactId}})).data;
      return response ? response.custom_fields_values : undefined;
    }

    async start () {
      this.current_card_id = AMOCRM.data.current_card.id;      
      const contactMetadata = await this.fetchContactByLeadId(AMOCRM.data.current_card.id);

      const contact = await this.fetchContactById(contactMetadata.id);
    }

    async copy () {
      var copyText = document.getElementById("token");
      copyText.select();
      document.execCommand("copy");
    }
  }
</script>

