<template>
  <div class="s-flex s-flex-col s-h-[90%] sm:s-h-full">
    <div class="s-max-w-[40rem] s-mx-5 s-mt-4">
      <div class="s-flex s-flex-col s-w-full sm:s-flex-row s-gap-0 sm:s-gap-7">
        <Select
          class="s-w-full sm:s-w-1/2"
          label="EMPLOYMENT STATUS"
          name="employmentStatus"
          :options="employmentStatusOptions"
          :value="formData.employmentStatus"
          :error="error && error.employmentStatus"
          :validation-msg="validationMsg($v.formData.employmentStatus)"
          @update="(value) => handleEmploymentSelection(value)"
        />

        <TextField
          class="s-w-full sm:s-w-1/2"
          label="COMPANY / EMPLOYER’S NAME"
          placeholder="Enter Employer Name"
          type="text"
          name="companyName"
          :error="error && error.companyName"
          :disabled="formData.employmentStatus === 'Unemployed'"
          :validation-msg="validationMsg($v.formData.companyName)"
          :model-value="formData.companyName"
          @update:modelValue="(value) => (formData.companyName = value)"
        />
      </div>

      <div class="s-flex s-flex-col s-w-full sm:s-flex-row s-gap-0 sm:s-gap-7">
        <Select
          class="s-w-full sm:s-w-1/2"
          label="MONTHLY INCOME"
          name="monthlyIncome"
          :options="monthlyIncomeOptions"
          :value="formData.monthlyIncome"
          :disabled="formData.employmentStatus === 'Unemployed'"
          :error="error && error.monthlyIncome"
          :validation-msg="validationMsg($v.formData.monthlyIncome)"
          @update="(value) => (formData.monthlyIncome = value)"
        />

        <TextField
          class="s-w-full sm:s-w-1/2"
          label="JOB TITLE"
          placeholder="Enter your job title"
          type="text"
          name="jobTitle"
          :model-value="formData.jobTitle"
          :error="error && error.jobTitle"
          :disabled="formData.employmentStatus === 'Unemployed'"
          :validation-msg="validationMsg($v.formData.jobTitle)"
          @update:modelValue="(value) => (formData.jobTitle = value)"
        />
      </div>

      <section class="s-mt-1 s-w-full">
        <div class="sm:s-mb-2.5">
          <TextField
            :class="'s-w-full s-inline-block'"
            label="EMPLOYER ADDRESS"
            placeholder="Enter your address"
            type="text"
            name="companyAddress"
            :model-value="formData.companyAddress"
            :error="error && error.companyAddress"
            :disabled="formData.employmentStatus === 'Unemployed'"
            :validation-msg="validationMsg($v.formData.companyAddress)"
            @update:modelValue="(value) => (formData.companyAddress = value)"
          />
        </div>
      </section>
    </div>

    <div class="s-flex s-justify-end s-mt-10 btn s-mx-10">
      <Button
        text="Save Changes"
        :class="'s-bg-primary-blue s-text-white s-py-3 s-px-5'"
        :loading="loading"
        @submit="updateProfile"
      />
    </div>
  </div>
</template>

<script>
import { required, requiredIf } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { mapActions, mapState } from 'vuex'

const formMessages = {
  employmentStatusRequired: () => 'Employement Status is required',
  employerNameRequired: () => 'Employer Name is required',
  monthlyIncomeRequired: () => 'Monthly Income is required',
  jobTitleRequired: () => 'Job Title is required',
  addressRequired: () => 'Address is required',
}
export default {
  name: 'EmploymentDetails',
  data() {
    return {
      formData: {
        employmentStatus: '',
        companyName: '',
        monthlyIncome: '',
        jobTitle: '',
        companyAddress: '',
      },
      error: null,
      loading: false,
    }
  },
  validations() {
    return {
      formData: {
        employmentStatus: {
          employmentStatusRequired: required,
        },
        companyName: {
          employerNameRequired: requiredIf(() => {
            if (this.formData.employmentStatus === 'Unemployed') {
              return false
            }

            return true
          }),
        },
        monthlyIncome: {
          monthlyIncomeRequired: requiredIf(() => {
            if (this.formData.employmentStatus === 'Unemployed') {
              return false
            }

            return true
          }),
        },
        jobTitle: {
          jobTitleRequired: requiredIf(() => {
            if (this.formData.employmentStatus === 'Unemployed') {
              return false
            }

            return true
          }),
        },
        companyAddress: {
          addressRequired: requiredIf(() => {
            if (this.formData.employmentStatus === 'Unemployed') {
              return false
            }

            return true
          }),
        },
      },
    }
  },
  computed: {
    ...mapState('user', ['userData']),
    employmentStatusOptions() {
      return [
        { text: 'Employed', value: 'Employed' },
        { text: 'Unemployed', value: 'Unemployed' },
        { text: 'Business Owner', value: 'Business Owner' },
        { text: 'Intern', value: 'Intern' },
        { text: 'NYSC Corps Member', value: 'NYSC Corps Member' },
        { text: 'Student', value: 'Student' },
      ]
    },
    monthlyIncomeOptions() {
      return [
        { text: 'less than 200000', value: 'less than 200000' },
        { text: '200000 - 500000', value: '200000 - 500000' },
        { text: '500000 - 1000000', value: '500000 - 1000000' },
        { text: 'above 1000000', value: 'above 1000000' },
      ]
    },
  },
  watch: {},
  mounted() {
    this.updateForm()
  },
  methods: {
    ...mapActions('user', ['updateEmployementDetails']),
    validationMsg: validationMessage(formMessages),
    scrolltoTop() {
      window.scrollTo(0, 0)
    },

    handleEmploymentSelection(value) {
      this.formData.employmentStatus = value;

      if(this.formData.employmentStatus === "Unemployed") {
        this.formData.companyAddress = "";
        this.formData.companyName = "";
        this.formData.jobTitle = "";
        this.formData.monthlyIncome = ""
      }
    },

    updateForm() {
      if (this.userData && this.userData.employmentDetails) {
        const {
          companyAddress,
          companyName,
          employmentStatus,
          jobTitle,
          monthlyIncome,
        } = this.userData.employmentDetails
        this.formData.companyAddress = companyAddress
        this.formData.companyName = companyName
        this.formData.employmentStatus = employmentStatus
        this.formData.jobTitle = jobTitle
        this.formData.monthlyIncome = monthlyIncome
      }
    },

    async updateProfile() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.formData
      } else {
        this.error = null
        const data = this.formData.employmentStatus === "Unemployed" ? {employmentStatus: this.formData.employmentStatus} : {...this.formData}

        try {
          const response = await this.updateEmployementDetails(data)
          this.loading = false
          if (response.data.statusCode === 200) {
            this.$showToast(response.data.message, 'success')
          }
        } catch (error) {
          this.loading = false
          this.$errorHandler(error)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
