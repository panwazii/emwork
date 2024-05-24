<template>
  <div>
    <v-row class="mb-4">
      <v-col cols="12" md="4">
        <v-text-field
          v-model="search.fname"
          outlined
          hide-details
          label="ชื่อจริง"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="search.lname"
          outlined
          hide-details
          label="นามสกุล"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn @click="fetchData">search</v-btn>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn @click="fetchData">clear</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      no-data-text="ไม่พบข้อมูล"
      :headers="headers"
      :items="result"
      hide-default-footer
      class="elevation-2"
    >
      <template v-slot:[`item.created_at`]="{ item }">
        {{ $moment(item.created_at).format('DD/MM/YYYY') }}
      </template>
      <template v-slot:[`item.status`]="{ item }">
        {{ getPassStatus(item.pass1, item.pass2, item.pass3) }}
      </template>
      <template v-slot:[`item.edit`]="{ item }">
        <v-btn icon @click="goToEdit(item.id)"
          ><v-icon class="mr-2" medium color="primary">
            mdi-pencil
          </v-icon></v-btn
        >
      </template>
      <template v-slot:[`item.delete`]="{ item }">
        <v-btn icon @click="deleteItem(item.id)"
          ><v-icon class="mr-2" medium color="primary">
            mdi-trash-can
          </v-icon></v-btn
        >
      </template>
    </v-data-table>
    <div class="text-center mt-5">
      <v-pagination
        v-model="page"
        :length="totalPages"
        total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  head() {
    return {
      title: 'home',
    }
  },
  page() {
    this.fetchData()
  },
  mounted() {
    this.fetchData()
  },
  data() {
    return {
      result: [],
      search: {
        fname: '',
        lname: '',
      },
      page: 1,
      totalPages: 0,
      itemsPerPage: 12,
      headers: [
        {
          text: 'ชื่อจริง',
          align: 'start',
          value: 'fname',
        },
        {
          text: 'นามสกุล',
          align: 'start',
          value: 'lname',
        },
        {
          text: 'สถานะ',
          align: 'start',
          value: 'status',
        },
        {
          text: 'date',
          align: 'start',
          value: 'created_at',
        },
        {
          text: 'edit',
          align: 'start',
          value: 'edit',
        },
        {
          text: 'delete',
          align: 'start',
          value: 'delete',
        },
        // {
        //   text: 'รายละเอียด',
        //   value: 'details',
        //   align: 'left',
        // },
      ],
    }
  },
  methods: {
    async fetchData() {
      const allResult = await this.$store.dispatch('api/admin/getAllResult', {
        params: {
          fname: this.search.fname,
          lname: this.search.lname,
          limit: this.itemsPerPage,
          page: this.page,
        },
      })
      this.result = allResult.data.data
      this.totalPages = allResult.data.total_pages
    },
    async clear() {
      await this.fetchData()
    },
    async deleteItem(id) {
      await this.$store.dispatch('api/admin/delete', {
        params: {
          id,
        },
      })
      await this.fetchData()
    },

    goToEdit(id) {
      this.$router.push(`/edit/${id}`)
    },
    getPassStatus(pass1, pass2, pass3) {
      if (pass1 === true && pass2 === true && pass3 === true) {
        return 'pass'
      } else if (pass1 === null || pass2 === null || pass3 === null) {
        return 'waiting'
      } else {
        return 'not pass'
      }
    },
  },
}
</script>
