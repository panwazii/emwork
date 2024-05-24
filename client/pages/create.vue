<template>
  <div>
    <!-- <ModalConfirm
      :open="confirmModal"
      :message="confirmMessage"
      :onConfirm="register"
      :confirm.sync="confirmModal"
    />
    <ModalComplete
      :open="completeModal"
      :message="completeMessage"
      :method="redirectToLogin"
      :complete.sync="completeModal"
    />
    <ModalError
      :open="errorModal"
      :message="errorMessage"
      :error.sync="errorModal"
    />
    <ModalLoading :open="loading" :message="loadingMessage" /> -->
    <v-card class="pa-6" elevation="4">
      <v-form>
        <v-card-title primary-title> create </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="forms.fname"
                outlined
                hide-details
                label="ชื่อจริง"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="forms.lname"
                outlined
                hide-details
                label="นามสกุล"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <!-- 1 -->
          <v-card-subtitle class="subtitle-1">
            การทดสอบร่างการ
          </v-card-subtitle>
          <v-row>
            <v-col cols="12">
              <v-select
                outlined
                :items="status"
                item-text="name"
                item-value="value"
                v-model="forms.color"
                :label="`ทดสอบตาบอดสี`"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                outlined
                :items="status"
                item-text="name"
                item-value="value"
                v-model="forms.long"
                :label="`ทดสอบสายตายาว`"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                outlined
                :items="status"
                item-text="name"
                item-value="value"
                v-model="forms.tilted"
                :label="`ทดสอบสายตาเอียง`"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                outlined
                :items="status"
                item-text="name"
                item-value="value"
                v-model="forms.reflex"
                :label="`ทดสอบการตอบสนองของร่างการ`"
              ></v-select>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <!-- 2 -->
          <v-card-subtitle class="subtitle-1">
            การทดสอบภาคทฤษฏี
          </v-card-subtitle>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="forms.sign"
                outlined
                type="number"
                hide-details
                label="ป้ายจราจร"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="forms.line"
                outlined
                type="number"
                hide-details
                label="เส้นจราจร"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="forms.way"
                outlined
                type="number"
                hide-details
                label="การให้ทาง"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <!-- 3 -->
          <v-card-subtitle class="subtitle-1">
            การสอบภาคปฏิบัติ
          </v-card-subtitle>
          <v-col cols="12">
            <v-select
              outlined
              :items="status"
              item-text="name"
              item-value="value"
              v-model="forms.practical"
              :label="`การสอบภาคปฏิบัติ`"
            ></v-select>
          </v-col>

          <v-card-actions class="mt-5">
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mr-4" @click="create"> submit </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-form>
    </v-card>
  </div>
</template>
  
  <script>
export default {
  layout: 'default',
  head() {
    return {
      title: 'create',
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
      status: [
        { name: 'ผ่าน', value: true },
        { name: 'ไม่ผ่าน', value: false },
      ],
      forms: {
        fname: '',
        lname: '',
        //1
        color: null,
        long: null,
        tilted: null,
        reflex: null,
        //2
        sign: null,
        line: null,
        way: null,
        //3
        practical: null,
      },
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