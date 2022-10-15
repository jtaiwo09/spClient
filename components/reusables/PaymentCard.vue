<template>
  <div
    class="s-max-w-[308px] s-h-[225px] s-bg-[#F8F9FF] s-rounded-xl s-pt-3 s-pl-[19px] s-pr-[23px] s-pb-6"
  >
    <div
      class="card_bg s-relative s-rounded-xl s-w-full s-h-[150px] s-flex s-items-center"
    >
      <img
        src="https://res.cloudinary.com/spleetng/image/upload/v1656600751/frontend-images/s-ribbon.png"
        alt=""
        class="s-absolute s-right-0 s-top-0"
      />
      <template v-if="cardType === 'atm'">
        <div class="s-ml-[26px]">
          <p
            class="s-mb-[7px] s-text-lg s-text-white s-font-bold s-tracking-[2px]"
          >
            {{
              card.cardType === 'MASTERCARD' ? 'MASTER' : card.cardType
            }}****{{ card.lastFour }}
          </p>
          <p class="s-font-normal s-text-sm s-text-white">
            Expires - {{ card.expMonth }}/{{ card.expYear }}
          </p>
          <img
            src="../../assets/images/visa.svg"
            alt=""
            class="s-absolute s-bottom-5 s-right-4"
          />
        </div>
      </template>
      <template v-if="cardType === 'bank'">
        <div class="s-flex s-h-full s-w-full">
          <div class="s-mt-auto s-px-6 s-pb-5 s-w-full">
            <p
              class="s-mb-[7px] s-text-lg s-text-white s-font-bold s-tracking-[2px] s-uppercase"
            >
              {{ card.accountName }}
            </p>
            <div class="s-w-full s-flex s-justify-between">
              <p v-if="card.bank" class="s-font-normal s-text-sm s-text-white">
                Access Bank
              </p>
              <p class="s-font-normal s-text-sm s-text-white">
                {{ card.accountNumber }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="s-mt-[14px] s-flex s-justify-between s-items-center">
      <div class="s-flex s-items-center">
        <p class="s-text-[#242428] s-font-bold s-text-sm s-mr-1.5">
          Set as default
        </p>
        <div @click="setMainCard(card.id)">
          <Toggle :is-toggled="(isToggled = card.main)" :show-text="false" />
        </div>
      </div>
      <h2
        class="s-text-[#ED3355] s-text-sm s-font-semibold s-cursor-pointer"
        @click="toggleWarningCardModal(card.id)"
      >
        Delete Card
      </h2>
    </div>
    <Modal
      :show="showWarningCardModal"
      modal-max-width="s-max-w-[25rem]"
      @close="showWarningCardModal = !showWarningCardModal"
    >
      <h2
        class="s-font-bold s-text-[24px] s-text-[#0f0c3d] s-mb-2.5 s-leading-9"
      >
        Delete this card details?
      </h2>
      <p class="s-text-sm s-mb-5 s-font-normal">
        Are you sure you want to delete this card details?
      </p>
      <div class="s-flex s-space-x-3">
        <Button
          text="Cancel"
          class="s-bg-primary-blue s-flex-1"
          @submit="showWarningCardModal = !showWarningCardModal"
        />
        <Button
          text="Delete"
          :loading="deleteCardLoader"
          class="s-bg-[#ED3355] s-flex-1"
          @submit="handleDelete"
        />
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    card: {
      type: Object,
      default: () => {},
    },
    cardType: {
      type: String,
      default: 'atm',
    },
  },
  data() {
    return {
      isToggled: false,
      cardDeleteID: null,
      showWarningCardModal: false,
      deleteCardLoader: false,
    }
  },
  methods: {
    ...mapActions('renters', ['deleteCard', 'deleteBank', 'mainCard']),
    async deleteUserCard() {
      this.deleteCardLoader = true
      try {
        const response = await this.deleteCard(this.cardDeleteID)
        this.deleteCardLoader = false
        if (response.data.statusCode === 200) {
          this.showWarningCardModal = false
          this.$emit('fetchcard')
        }
      } catch (error) {
        this.deleteCardLoader = false
        this.$errorHandler(error)
      }
    },
    async deleteBankCard() {
      this.deleteCardLoader = true
      try {
        const response = await this.deleteBank(this.cardDeleteID)
        this.deleteCardLoader = false
        if (response.data.statusCode === 200) {
          this.showWarningCardModal = false
          this.$emit('fetchbank')
        }
      } catch (error) {
        this.deleteCardLoader = false
        this.$errorHandler(error)
      }
    },
    handleDelete() {
      if (this.cardType === 'bank') {
        this.deleteBankCard()
      } else if (this.cardType === 'atm') {
        this.deleteUserCard()
      }
    },
    toggleWarningCardModal(id) {
      this.cardDeleteID = id
      this.showWarningCardModal = !this.showWarningCardModal
    },
    async setMainCard(id) {
      try {
        await this.mainCard(id)
        this.$emit('fetchcard')
      } catch (error) {
        this.$errorHandler(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card_bg {
  background: linear-gradient(141.58deg, #000000 22.12%, #3f4252 127.86%);
}
</style>
