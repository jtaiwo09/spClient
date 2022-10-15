<template>
  <MoreInfoModal
    :new-class="'s-px-5 s-relative sm:s-px-7 s-pb-16  md-x:s-w-[647px] sm:s-w-[532px] s-min-w-[375px] s-w-full'"
    @cancel="closeForm"
  >
    <Loading v-if="loader" :class="'s-absolute'" />
    <transition>
      <div v-if="allRules" class="s-max-w-fit">
        <div
          class="s-flex s-justify-end s-sticky s-top-0 s-bg-white s-z-10 s-py-7"
        >
          <Button
            :text="'Cancel'"
            class="s-outline s-outline-primary-blue !s-text-primary-blue s-text-sm s-leading-[18px] s-font-bold s-px-10 s-mr-2 sm:s-mt-0 s-rounded-full sm:s-py-[15px] s-py-[8px]"
            @submit="closeForm"
          />
          <Button
            :text="'Update'"
            :loading="loading"
            class="s-bg-primary-blue s-text-sm s-leading-[18px] s-text-white s-font-bold s-px-10 s-mr-2 s-rounded-full sm:s-py-[15px] s-py-[12px]"
            @submit="submitForm"
          />
        </div>
        <div class="s-mt-3">
          <h1
            class="s-text-[#121212] s-mb-1.5 sm:s-text-xl s-text-lg s-leading-6 s-font-bold"
          >
            Booking Information >
            <span class="s-text-[#2E48DA]">House Rules</span>
          </h1>
          <p class="s-text-sm s-font-normal s-text-[#242428] s-leading-5">
            Update information about your space here
          </p>
        </div>
        <div class="s-mt-10 s-px-0.5">
          <label
            for=""
            class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-7"
            >Select rules that apply to your space
          </label>
          <div
            class="s-flex s-flex-col sm:s-flex-row sm:s-flex-wrap s-gap-x-12 s-gap-y-6"
          >
            <div v-for="rule in allRules" :key="rule.id">
              <p-check
                v-model.lazy="selectedRules"
                :value="rule.id"
                class="s-m-0 s-relative s-inline-block s-whitespace-nowrap"
                @change="handleChange(rule)"
              >
                <TickWhiteIcon width="11" height="8" :class="'svg'" />
                {{ rule.name }}
              </p-check>
            </div>
          </div>
          <FormFieldError
            :class="'!s-mt-4'"
            :validation-msg="validationMsg($v.selectedRules)"
          />
        </div>
      </div>
    </transition>
  </MoreInfoModal>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
// import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'

const validate = (val) => {
  if (val?.length === 0) return false
  else return true
}
const formMessages = {
  selectedRulesRequired: () =>
    'Kindly check the boxes for the rules that apply or choose none',
}

export default {
  data() {
    return {
      loading: false,
      selectedRules: [],
      allRules: null,
      rules: [],
      toDelete: [],
      toUpdate: [],
    }
  },
  validations: {
    selectedRules: {
      selectedRulesRequired: validate,
    },
  },
  computed: {
    ...mapState('host/listing', [
      'propertyListingId',
      'propertySetUp',
      'loader',
    ]),
    ...mapGetters('host/listing', ['houseRules']),
  },
  watch: {
    propertySetUp: {
      handler(newVal) {
        if (newVal !== null) {
          const none = this.houseRules.find((el) => el.name === 'None')
          this.allRules = new Set([none, ...this.houseRules])
        }
      },
      immediate: true,
    },
    rules: 'assignReturnedRules',
  },
  async mounted() {
    await this.getHouseRules()
  },
  methods: {
    ...mapActions('host/listing', [
      'getListingDetail',
      'addHouseRules',
      'deleteHouseRules',
    ]),
    ...mapMutations('host/listing', ['SET_ROOMS']),
    validationMsg: validationMessage(formMessages),
    closeForm() {
      this.$emit('cancel')
    },
    removeDuplicate(arr) {
      const ids = arr.map((obj) => obj.rule_id)

      const filtered = arr.filter(
        (obj, index) => !ids.includes(obj.rule_id, index + 1)
      )
      return filtered
    },
    async getHouseRules() {
      try {
        const response = await this.getListingDetail()
        if (response.data.statusCode === 200) {
          const data = this.removeDuplicate(response.data.data)
          this.rules = data.map((el) => ({
            propertyRuleId: el.id,
            ruleId: el.rule_id,
          }))
        }
      } catch (error) {
        this.$errorHandler(error)
      }
    },
    async submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.selectedRules
      } else {
        const data = {}
        data.property_listing_id = this.propertyListingId

        data.rules = this.toUpdate.map((id) => ({
          ruleId: id,
        }))

        const propertyRuleIds = []
        // delete
        this.rules.forEach((el) => {
          if (this.toDelete.includes(el.ruleId)) {
            propertyRuleIds.push(el.propertyRuleId)
          }
        })

        if (this.toUpdate.length) {
          this.loading = true
          try {
            const response = await this.addHouseRules(data)
            this.loading = false
            if (response && response.data.statusCode === 201) {
              this.rules = response.data.data
            }
          } catch (error) {
            this.loading = false
            this.$errorHandler(error)
          }
        }

        if (propertyRuleIds.length) {
          this.loader = true
          try {
            await this.deleteHouseRules({ propertyRuleIds })
            this.loader = false
          } catch (error) {
            this.loader = false
            this.$errorHandler(error)
          }
        }
        this.closeForm()
      }
    },

    handleChange(e) {
      if (e.name === 'None') {
        this.toDelete = this.rules.map((el) => el.ruleId)
        this.rules.forEach((eu) => {
          if (
            this.selectedRules.includes(
              eu.ruleId && !this.toDelete.includes(e.id)
            )
          ) {
            this.toDelete.push(eu.ruleId)
          }
        })
        const check = this.selectedRules.includes(e.id)
        if (check) {
          this.selectedRules = [e.id]
          this.toUpdate = this.toUpdate.filter((el) => el === e.id)
        } else {
          const index = this.selectedRules.indexOf(e.id)
          if (index > -1) {
            this.toUpdate.splice(index, 1)
            this.selectedRules.splice(index, 1)
          }
        }
      } else {
        if (this.toUpdate.includes(12)) {
          const index = this.selectedRules.indexOf(12)
          this.toUpdate.splice(index, 1)
        }
        if (this.selectedRules.includes(12)) {
          if (!this.toDelete.includes(12)) {
            const check = this.rules.find((el) => el.ruleId === 12)
            if (check) {
              this.toDelete.push(12)
            }
          }
        }

        this.allRules.forEach((el) => {
          if (el.name === 'None') {
            this.selectedRules.find((item) => {
              if (el.id === item) {
                const nonePosition = this.selectedRules.indexOf(item)
                this.selectedRules.splice(nonePosition, 1)
              }
              return null
            })
          }
        })
      }
      const findRulesById = this.rules.find((et) => et.ruleId === e.id)
      if (findRulesById) {
        const check = this.toDelete.includes(e.id)
        if (!check) {
          this.toDelete.push(e.id)
        } else {
          const index = this.toDelete.indexOf(e.id)
          if (index > -1) this.toDelete.splice(index, 1)
        }
      } else {
        const check = this.toUpdate.includes(e.id)
        if (!check) {
          this.toUpdate.push(e.id)
        } else {
          const index = this.toUpdate.indexOf(e.id)
          if (index > -1) this.toUpdate.splice(index, 1)
        }
      }
    },
    assignReturnedRules() {
      this.selectedRules = this.rules.length
        ? this.rules.map((el) => {
            return el.ruleId
          })
        : []
    },
  },
}
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
