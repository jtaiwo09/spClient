<template>
  <div>
    <Loading v-if="loading" />
    <div v-else class="md-s:!s-min-h-fit">
      <div
        class="s-mb-2 s-px-6 md-x:!s-px-[3.25rem] s-flex s-justify-between s-items-center s-sticky s-top-0 md-s:s-top-2.5 s-h-[100px] s-w-full s-bg-[#fff] s-z-20"
      >
        <div>
          <h2 class="title s-text-[1.25rem] s-mb-0">Subscription & Booking</h2>
          <p class="sub-title !s-leading-[1.375rem] s-text-xs">House Rules</p>
        </div>
        <div class="md-s:s-flex s-hidden">
          <Button
            :class="'s-mr-1.5 s-w-[7.875rem] s-border-2 s-border-solid s-border-primary-blue s-py-2.5 s-font-bold'"
            text="Back"
            text-class="s-text-primary-blue"
            @submit="back"
          />
          <Button
            :class="'s-w-[7.875rem] s-bg-primary-blue  s-py-2.5 s-font-bold s-text-[#fff]'"
            text="Next"
            :loading="loader"
            @submit="next"
          />
        </div>
      </div>
      <div class="s-flex md-s:s-block s-flex-col">
        <div class="s-px-6 md-x:!s-px-[3.25rem]">
          <div>
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
        <div
          class="border s-mt-auto s-flex s-justify-end md-s:s-hidden s-py-5 s-border-t s-border-solid sm:s-border-0 s-fixed s-bottom-0 s-w-full s-pr-4 s-left-0 s-bg-white"
        >
          <Button
            :class="'s-mr-1.5 s-w-[7.875rem] s-border-2 s-border-solid s-border-primary-blue s-py-2.5 s-font-bold'"
            text="Back"
            text-class="s-text-primary-blue"
            @submit="back"
          />
          <Button
            :class="'s-w-[7.875rem] s-bg-primary-blue s-py-2.5 s-font-bold s-text-[#fff]'"
            text="Next"
            :loading="loader"
            @submit="next"
          />
        </div>
      </div>
    </div>
  </div>
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
      loader: false,
      selectedRules: [],
      editMode: false,
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
    ...mapState('host/listing', ['propertyListingId', 'propertySetUp']),
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
    if (this.rules.length) this.editMode = true
    else this.editMode = false
  },
  methods: {
    ...mapActions('host/listing', [
      'getListingDetail',
      'addHouseRules',
      'deleteHouseRules',
    ]),
    ...mapMutations('host/listing', ['SET_ROOMS']),
    validationMsg: validationMessage(formMessages),
    removeDuplicate(arr) {
      const ids = arr.map((obj) => obj.rule_id)

      const filtered = arr.filter(
        (obj, index) => !ids.includes(obj.rule_id, index + 1)
      )
      return filtered
    },
    async getHouseRules() {
      this.loading = true
      try {
        const response = await this.getListingDetail()
        this.loading = false
        if (response.data.statusCode === 200) {
          const data = this.removeDuplicate(response.data.data)
          this.rules = data.map((el) => ({
            propertyRuleId: el.id,
            ruleId: el.rule_id,
          }))
        }
      } catch (error) {
        this.loading = false
        this.$errorHandler(error)
      }
    },
    back() {
      this.$router.push({
        name: 'host-listing-booking',
        query: { step: 2, level: 4 },
      })
    },
    async next() {
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
          this.loader = true
          try {
            const response = await this.addHouseRules(data)
            this.loader = false
            if (response && response.data.statusCode === 201) {
              this.rules = response.data.data
            }
          } catch (error) {
            this.loader = false
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
        this.$router.push({
          name: 'host-listing-booking',
          query: { step: 2, level: 6 },
        })
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

<style lang="scss" scoped></style>
