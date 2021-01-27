<template>
    <div>
        <p>hello, {{ title }}</p>
    </div>
</template>

<script>
    import { Component, Vue } from 'vue-property-decorator';
    // import { mapActions } from 'vuex';

    @Component({
        name: "Card",
        computed: {
        }
    })

    export default class Card extends Vue {
        static $el = 'card_element';

        data() {
          return {
              title: 'Card'
          };
        }
    }
</script>
