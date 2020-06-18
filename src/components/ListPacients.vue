<template>
  <div>
    <h1>Listado de pacientes </h1>
    <ul>
      <li  v-for="paciente in pacientes" :key="paciente.id"> {{paciente.data.name}} || {{paciente.data.email}}
        <v-btn text @click="editPaciente(paciente.id)"><v-icon>mdi-pencil</v-icon> </v-btn>  
         <v-btn text @click="removePaciente(paciente.id)"><v-icon>mdi-delete</v-icon> </v-btn>
      </li>
    </ul>
  </div>
</template>


<script>
import {mapActions, mapState} from 'vuex'

export default {
   methods: {
    ...mapActions(['setPacientes', 'deletePaciente', 'setCurrentPaciente', 'updatePaciente']),
    removePaciente(id){
            let confirmation = confirm('¿Estás seguro que deseas eliminar este paciente?')
            if (confirmation) {
                this.deletePaciente(id)
            }
        },
        editPaciente(id){
        this.setCurrentPaciente(id)
        }
  },
   computed: {
    //traemos la propiedad que esta en el "state" del store.index
    ...mapState(['pacientes'])
  },
  created(){
    this.setPacientes()
  }



}
</script>

<style>

</style>