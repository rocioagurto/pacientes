<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
        width="100"
      />
    </v-app-bar>
    <v-main>
      <FormPacient/>
       <ListPacients/>
       <v-overlay :value="overlay">
         <v-progress-circular indeterminate size="64"/>
       </v-overlay>
    </v-main>

  </v-app>
</template>

<script>
import ListPacients from './components/ListPacients';
import FormPacient from './components/FormPacient';
import { mapState } from 'vuex';

export default {
  components: {
    ListPacients,
    FormPacient 
  },
  computed: {
    ...mapState(['overlay'])
  }


};
</script>
