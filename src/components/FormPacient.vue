<template>
 <div class="text-center">
    <v-card>
    <v-card-title  >
      
    </v-card-title>
     
    <v-container>
        <v-row>
            <v-col>
                <v-form>
                <v-text-field label="Nombre" type="text" :value="currentPaciente.data.name" @input="updateName" single-line/>
                <v-text-field label="Email" type="text" :value="currentPaciente.data.email" @input="updateEmail" single-line/>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed class="mb-5 mr-3" color="cyan lighten-1 white--text" @click="submitForm"> {{ !!currentPaciente.id ? 'Actualizar':'Ingresar Paciente' }} </v-btn>

    </v-card-actions>
    </v-card>

  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
computed:{
  ...mapState(['currentPaciente'])
},
methods: {
  ...mapActions(['updateName', 'updateEmail', 'postPaciente','updatePaciente']),
  submitForm(){
    if(this.currentPaciente.id){
      this.updatePaciente(this.currentPaciente.id)
    }else{
      this.postPaciente()
    }
  }
},
}
</script>

<style>

</style>