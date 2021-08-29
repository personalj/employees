import makeRequest from "@/services/makeRequest";
import { apiLink }  from "@/config.js"

export default ({
  state: {
    employees: [],
  },
  getters: {
    employees(state) {
      return state.employees
    }
  },
  mutations: {
    SET_EMPLOYEE_TO_STATE(state, employees) {
      state.employees = employees
    },
    CREATE_EMPLOYEE(state, employee) {
      state.employees.push(employee)
    },
    DELETE_EMPLOYEE(state, employee) {
      state.employees = state.employees.filter(item => item._id !== employee._id)
    },
    EDIT_EMPLOYEE(state, employee) {
      const index = state.employees.findIndex(item => item._id === employee._id)
      Object.assign(state.employees[index], employee)
    }
  },
  actions: {
    getEmployees(context) {
      makeRequest({
        url: apiLink+'employees',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: true
        },
      })
      .then((employees) => {
        context.commit('SET_EMPLOYEE_TO_STATE', employees.data)
      })
      .catch(err => {
        console.log('error', err)
      })
    },
    createEmployee(context, data) {
      makeRequest({
        url: apiLink+'employees',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: true
        },
        data: JSON.stringify(data)
      })
      .then((res) => {
        context.commit('CREATE_EMPLOYEE', res.data.employee)
        context.dispatch('getEmployees')
      })
      .catch(err => {
        console.log('error', err)
      })
    },
    deleteEmployee(context, data) {
      makeRequest({
        url: apiLink+'employees/'+data._id,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: true
        },
        data: JSON.stringify(data)
      })
      .then(() => {
        context.commit('DELETE_EMPLOYEE', data)
      })
      .catch(err => {
        console.log('error', err)
      })
    },
    editEmployee(context, data) {
      makeRequest({
        url: apiLink+'employees/'+data._id,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: true
        },
        data: JSON.stringify(data)
      })
      .then(() => {
        context.commit('EDIT_EMPLOYEE', data)
      })
      .catch(err => {
        console.log('error', err)
      })
    },
  }
});
