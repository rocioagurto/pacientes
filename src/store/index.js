import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const baseURL = 'https://us-central1-pacientes-1a912.cloudfunctions.net/pacientes';
function emptyPaciente(){
  return { id: null, data: {name:'', email: ''}}
}

export default new Vuex.Store({
  state: {
    pacientes: [],
    currentPaciente: emptyPaciente(),
    overlay: false
  },
  mutations: {
    SET_EMPTY_PACIENTE (state) {
      state.currentPaciente.id = null
      const empty = emptyPaciente()
      Object.keys(empty.data).forEach(key => {
        state.currentPaciente.data[key] = empty.data[key]
      })
    },
    //esta mutación toma los pacientes que ingresamos y los agrega a la data
    SET_PACIENTES(state, data){state.pacientes = data},
    UPDATE_NAME(state, name){state.currentPaciente.data.name = name},
    UPDATE_EMAIL(state, email){state.currentPaciente.data.email = email},
    SET_CURRENT_PACIENTE(state, paciente){ state.currentPaciente = paciente },
    OVERLAY_ON(state){state.overlay = true},
    OVERLAY_OFF(state){state.overlay = false}


  },
  actions: {
    //llama a los pacientes que están en la api
    setPacientes({commit}){
      commit('OVERLAY_ON')
      axios.get(`${baseURL}/pacientes`)
      .then((response)=>{
        commit('SET_PACIENTES', response.data)
        commit('SET_EMPTY_PACIENTE')
        commit('OVERLAY_OFF')
      })
    },
    postPaciente({ dispatch, state}){
      axios.post(`${baseURL}/paciente`, state.currentPaciente.data)
      .then(() =>{
        dispatch('setPacientes')
      })
    },
    deletePaciente({ dispatch }, id){
      axios.delete(`${baseURL}/paciente/${id}`)
        .then(() => {
          dispatch('setPacientes')
        })
      },
    setCurrentPaciente({ commit, getters }, id){
      // Buscar si tenemos el paciente en la lista actual
      let targetPaciente = getters.searchPacienteById(id)
      //Si lo encuentra, actualizar el currentPaciente con ese paciente
      if(targetPaciente){
        commit('SET_CURRENT_PACIENTE', targetPaciente)
      } else {
        //Si no, hacer la llamada a la axios
        axios.get(`${baseURL}/paciente/${id}`)
        .then((response) => {
          commit('SET_CURRENT_PACIENTE', response.data)
        })
      }
    },
    updatePaciente({ state, dispatch }, id) {
      axios.put(`${baseURL}/paciente/${id}`, state.currentPaciente.data)
      .then(() => {
        dispatch('setPacientes')
      })
    },
    updateName({commit}, name){
      commit('UPDATE_NAME', name)
    },
    updateEmail({commit}, email){
      commit('UPDATE_EMAIL', email)
    },
  },
  getters: {
    searchPacienteById: (state) => (id) =>{
      return state.pacientes.find(paciente => paciente.id === id)
    }
  }
})
