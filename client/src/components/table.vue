<template>
  <div class="container">
    <v-dialog v-model="dialog" class="dialog-item" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark class="add" v-bind="attrs" v-on="on"
          >Создать</v-btn
        >
      </template>
      <v-card>
        <v-card-text>
          <v-container>
            <v-form ref="form"
                v-model="valid"
            >
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="name"
                    :rules="fullName"
                    label="ФИО*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="position"
                    :rules="positionRules"
                    label="Должность*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="salary"
                    :rules="salaryRules"
                    label="Оклад*"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-row justify="center">
                    <v-date-picker
                     v-model="dateOfBirth"
                     :max="currentDate"
                    >
                    </v-date-picker>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveItem" :disabled="!valid">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          label="Поиск"
          append-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="employees"
        :search="search"
        sort-by="calories"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      search: "",
      name: "",
      position: "",
      editedId: 0,
      edited: false,
      salary: "",
      aaa: [],
      valid: true,
      currentDate: new Date().toISOString().substr(0, 10),
      dateOfBirth: new Date().toISOString().substr(0, 10),
      fullName: [
        (v) => !!v || "ФИО обязательное поле",
        (v) => /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(v) || "Только буквы",
      ],
      positionRules: [
        (v) => !!v || "Позиция обязательное поле",
        (v) => /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(v) || "Только буквы",
      ],
      salaryRules: [(v) => /^[0-9]+$/.test(v) || "Только цифры"],
      dialog: false,
      headers: [
        {
          text: "ФИО",
          align: "start",
          sortable: true,
          filterable: true,
          value: "name",
        },
        { text: "Дата рождения", value: "dateOfBirth" },
        { text: "Должность", value: "position" },
        { text: "Оклад", value: "salary" },
        { text: "Действия", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters(["employees"]),
  },
  methods: {
    clear() {
      this.dialog = false
      this.name = ""
      this.salary = ""
      this.position = ""
      this.dateOfBirth = new Date().toISOString().substr(0, 10)
      this.editedId = 0
      this.edited = false
    },
    closeDialog() {
      this.clear()
    },
    editItem(item) {
      this.name = item.name,
      this.salary = item.salary,
      this.position = item.position,
      this.dateOfBirth = item.dateOfBirth,
      this.editedId = item._id
      this.edited = true
      this.dialog =  true
    },
    deleteItem(item) {
      if (confirm("Удалить сотрудника?")) {
        this.deleteEmployee(item)
        this.$toast.open({
          message: 'Данные удалены',
          type: 'error'
        })
      }
    },
    async saveItem() {
      const formData = {
        name: this.name,
        dateOfBirth: this.dateOfBirth,
        position: this.position,
        salary: this.salary,
      }
      if (!this.edited) {
        try {
          await this.createEmployee(formData)
          this.$toast.open('Сотрудник создан')
        } catch (e) {
          console.log(e);
        }
      }else {
        try {
          const editedEmployee = {
            ...formData,
            _id: this.editedId
          }
          await this.editEmployee(editedEmployee);
          this.editedId = 0
          this.edited = false
          this.$toast.open('Сотрудник изменен')
        } catch (e) {
          console.log(e);
        }
      }
      this.clear()
    },
    ...mapActions([
      "getEmployees",
      "createEmployee",
      "deleteEmployee",
      "editEmployee",
    ]),
  },
  mounted() {
    this.getEmployees();
    if(!this.dialog) {
      this.clear()
    }
  },
};
</script>
