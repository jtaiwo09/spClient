<template>
  <div class="s-flex s-flex-col s-h-[90%] sm:s-h-full">
    <div>
      <div
        class="sm:s-border-b sm:s-border-b-[#b1b7d6]/[0.19] sm:s-border-solid sm:s-pb-4 sm:s-mb-7"
      >
        <Select
          :class="'sm:!s-mb-0 sm:s-w-[48%]'"
          label="Employment status"
          name="employmentStatus"
          icon="WorkIcon"
          :options="selectEmployment"
          :error="error && error.employmentStatus"
          :validation-msg="validationMsg($v.formData.employmentStatus)"
          :value="formData.employmentStatus"
          @update="(value) => (formData.employmentStatus = value)"
        />
      </div>
      <div class="s-flex s-flex-col s-w-full sm:s-mr-8 sm:s-flex-row">
        <TextField
          :class="'s-mr-6 md:s-mr-8 s-w-full'"
          label="Name of company"
          placeholder="Enter Name Of Company"
          type="text"
          icon="WorkIcon"
          name="companyName"
          :disabled="disabledOnUnemploymentselected"
          :error="error && error.companyName"
          :validation-msg="validationMsg($v.formData.companyName)"
          :model-value="formData.companyName"
          @update:modelValue="(value) => (formData.companyName = value)"
        />

        <TextField
          :class="'s-w-full'"
          label="Role in company"
          placeholder="Enter your role"
          type="text"
          icon="UserIcon"
          name="role"
          :disabled="disabledOnUnemploymentselected"
          :error="error && error.role"
          :validation-msg="validationMsg($v.formData.role)"
          :model-value="formData.role"
          @update:modelValue="(value) => (formData.role = value)"
        />
      </div>
      <div class="s-flex s-flex-col s-w-full sm:s-flex-row">
        <TextField
          :class="'s-mr-6 md:s-mr-8 s-w-full'"
          label="Company Address"
          placeholder="Enter Company Address"
          type="text"
          icon="LocationIcon"
          name="companyAddress"
          :disabled="disabledOnUnemploymentselected"
          :error="error && error.companyAddress"
          :validation-msg="validationMsg($v.formData.companyAddress)"
          :model-value="formData.companyAddress"
          @update:modelValue="(value) => (formData.companyAddress = value)"
        />
        <Date
          :class="'s-w-full'"
          label="Date you joined"
          :disabled="disabledOnUnemploymentselected"
          :error="error && error.dateJoined"
          :validation-msg="validationMsg($v.formData.dateJoined)"
          :model-value="formData.dateJoined"
          @update:modelValue="(value) => (formData.dateJoined = value)"
        />
      </div>
    </div>

    <div class="s-flex s-justify-end s-mt-10 btn">
      <Button
        text="Go Back"
        :class="'s-mr-4 s-bg-white sm:s-border-2 sm:s-border-solid sm:s-border-primary-blue !s-text-primary-blue s-py-3 s-w-full sm:s-w-32'"
        @submit="decreaseStep"
      />
      <Button
        text="Continue"
        :class="'s-bg-primary-blue s-text-white s-py-3 s-w-full sm:s-w-32'"
        :loading="loading"
        @submit="increaseStep"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { required, requiredIf } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { formattedDate } from '../../helpers/utils'

const formMessages = {
  employmentStatusRequired: () => 'Employment status is required',
  companyNameRequired: () => 'Company name is required',
  roleRequired: () => 'Role is required',
  companyAddressRequired: () => 'Company address is required',
  dateJoinedRequired: () => 'Date is required',
}
export default {
  props: {
    selectEmployment: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      formData: {
        employmentStatus: '',
        companyName: '',
        role: '',
        companyAddress: '',
        dateJoined: '',
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
          companyNameRequired: requiredIf(() => {
            if (this.disabledOnUnemploymentselected) {
              return false
            } else {
              return true
            }
          }),
        },
        role: {
          roleRequired: requiredIf(() => {
            if (this.disabledOnUnemploymentselected) {
              return false
            } else {
              return true
            }
          }),
        },
        companyAddress: {
          companyAddressRequired: requiredIf(() => {
            if (this.disabledOnUnemploymentselected) {
              return false
            } else {
              return true
            }
          }),
        },
        dateJoined: {
          dateJoinedRequired: requiredIf(() => {
            if (this.disabledOnUnemploymentselected) {
              return false
            } else {
              return true
            }
          }),
        },
      },
    }
  },
  computed: {
    ...mapState('renters/verify', [
      'currentStep',
      'tenant',
      'employmentDetails',
    ]),
    formatDate() {
      if (this.formData.dateJoined)
        return formattedDate(this.formData.dateJoined)
      else return null
    },
    disabledOnUnemploymentselected() {
      if (
        this.formData.employmentStatus === 'unemployed' ||
        this.formData.employmentStatus === 'student'
      )
        return true
      else return false
    },
  },
  mounted() {
    if (this.employmentDetails) {
      this.formData.employmentStatus = this.employmentDetails.employmentStatus
      this.formData.companyName = this.employmentDetails.companyName
      this.formData.role = this.employmentDetails.role
      this.formData.companyAddress = this.employmentDetails.companyAddress
      this.formData.dateJoined = new Date(this.employmentDetails.dateJoined)
    }
  },
  methods: {
    ...mapMutations('renters/verify', ['INCREMENT_STEP', 'DECREMENT_STEP']),
    ...mapActions('renters/verify', [
      'addEmploymentDetails',
      'updateEmploymentDetails',
    ]),
    validationMsg: validationMessage(formMessages),
    scrolltoTop() {
      window.scrollTo(0, 0)
    },
    async increaseStep() {
      if (this.currentStep < 5) {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.error = this.$v.formData
        } else {
          this.error = null
          this.loading = true
          if (this.employmentDetails === undefined) {
            try {
              const response = this.disabledOnUnemploymentselected
                ? await this.addEmploymentDetails({
                    employmentStatus: this.formData.employmentStatus,
                    tenantId: this.tenant.id,
                  })
                : await this.addEmploymentDetails({
                    ...this.formData,
                    dateJoined: this.formatDate,
                    tenantId: this.tenant.id,
                  })
              if (response.data.statusCode === 201) {
                this.loading = false
                this.INCREMENT_STEP()
                this.scrolltoTop()
              }
            } catch (error) {
              this.loading = false
              this.$errorHandler(error)
            }
          } else {
            try {
              const response = this.disabledOnUnemploymentselected
                ? await this.updateEmploymentDetails({
                    employmentStatus: this.formData.employmentStatus,
                    id: this.employmentDetails.id,
                  })
                : await this.updateEmploymentDetails({
                    ...this.formData,
                    dateJoined: this.formatDate,
                    id: this.employmentDetails.id,
                  })
              if (response.data.statusCode === 200) {
                this.loading = false
                this.INCREMENT_STEP()
                this.scrolltoTop()
              }
            } catch (error) {
              this.loading = false
              this.$errorHandler(error)
            }
          }
        }
      }
    },
    decreaseStep() {
      if (this.currentStep > 1) {
        this.error = null
        this.DECREMENT_STEP()
        this.scrolltoTop()
      }
    },
  },
}
</script>

<style></style>
