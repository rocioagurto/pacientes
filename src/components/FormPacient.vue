<template>
 <div class="text-center">
   <h1 class="mt-5">Formulario ingreso de Pacientes </h1>
    <v-container class="container" >
      <v-row>
        <v-col>
          <v-form >
            <v-text-field label="Nombre" type="text" :value="currentPaciente.data.name" @input="updateName" single-line/>
            <v-text-field label="Email" type="text" :value="currentPaciente.data.email" @input="updateEmail" single-line/>
             <v-card-actions> 
        <v-btn depressed class="mx-auto" color="cyan lighten-1 white--text" @click="submitForm"> {{ !!currentPaciente.id ? 'Actualizar':'Ingresar Paciente' }} </v-btn>
      </v-card-actions>
          </v-form>
        </v-col>
      </v-row>
     
    </v-container>
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