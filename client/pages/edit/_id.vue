<template>
    <div>
      <v-data-table
        no-data-text="ไม่พบข้อมูล"
        :headers="headers"
        :items="positions"
        hide-default-footer
        class="elevation-2"
      >
        <template v-slot:[`item.created_at`]="{ item }">
          {{ $moment(item.created_at).format('DD/MM/YYYY') }}
        </template>
        <!-- <template v-slot:[`item.details`]="{ item }">
          <v-btn icon @click="openDetailsDialog(item.id)"
            ><v-icon class="mr-2" medium color="primary">
              mdi-text-box-search
            </v-icon></v-btn
          >
        </template> -->
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
    // async fetch() {
    //   const Provinces = await this.$store.dispatch('api/public/getAllProvince')
    //   this.provinces = Provinces.data.data
    //   const GovType = await this.$store.dispatch(
    //     'api/public/getLocalGovernmentType'
    //   )
    //   this.localGovernmentTypes = GovType.data.data
    // },
    data() {
      return {
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
          //1
          {
            text: 'ทดสอบตาบอดสี',
            align: 'start',
            value: 'color',
          },
          {
            text: 'ทดสอบสายตายาว',
            align: 'start',
            value: 'long',
          },
          {
            text: 'ทดสอบสายตาเอียง',
            align: 'start',
            value: 'tilted',
          },
          {
            text: 'ทดสอบการตอบสนอง',
            align: 'start',
            value: 'reflex',
          },
          //2
          {
            text: 'ทดสอบการตอบสนอง',
            align: 'start',
            value: 'lname',
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
      async create() {
        await this.$store.dispatch('api/admin/create', this.forms)
        this.$router.push('/')
      },
    },
  }
  </script>
  