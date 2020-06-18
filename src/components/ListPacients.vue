<template>
  <div class="container mb-10">
     <h1 class="text-center">Listado de pacientes </h1>
    <v-simple-table class="mt-10">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Nombre</th>
          <th class="text-left">Email</th>
          <th class="text-left">Editar</th>
          <th class="text-left">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="paciente in pacientes" :key="paciente.id">
          <td>{{ paciente.data.name }}</td>
          <td>{{ paciente.data.email }}</td>
          <td>
          <v-btn text @click="editPaciente(paciente.id)" color="pink lighten-4 white--text"><v-icon>mdi-pencil</v-icon> </v-btn> 
          </td> 
          <td>
         <v-btn text @click="removePaciente(paciente.id)" color="purple lighten-4 white--text"><v-icon>mdi-delete</v-icon> </v-btn>
         </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
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