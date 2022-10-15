<template>
  <div>
    <div class="s-flex">
      <ul class="pagination s-p-2 s-rounded s-flex s-items-center">
        <li class="pagination-item sm:s-block s-hidden">
          <span
            v-if="isInFirstPage"
            class="s-rounded-l s-rounded-sm s-border s-border-gray-100 s-px-3 s-py-2 s-cursor-not-allowed s-no-underline s-text-gray-600 s-h-10"
            >&laquo;</span
          >
          <a
            v-else
            class="s-rounded-l s-rounded-sm s-border-t s-border-b s-border-l s-border-gray-100 s-px-3 s-py-2 s-text-gray-600 hover:s-bg-gray-100 s-no-underline"
            href="#"
            role="button"
            rel="prev"
            @click.prevent="onClickFirstPage"
          >
            &laquo;
          </a>
        </li>

        <li class="pagination-item">
          <button
            type="button"
            :disabled="isInFirstPage"
            aria-label="Go to previous page"
            class="s-border s-border-solid s-font-bold s-border-[#EFEFEF] s-rounded-lg s-px-2.5 s-py-2 hover:s-bg-gray-100 s-text-[#707070] s-no-underline s-mx-2 sm:s-text-lg s-text-[16px]"
            :class="{ 's-cursor-not-allowed': isInFirstPage }"
            @click="onClickPreviousPage"
          >
            Prev
          </button>
        </li>

        <li v-for="page in pages" :key="page.name" class="pagination-item">
          <a
            class="s-rounded-lg s-border s-border-solid s-border-[#EFEFEF] s-px-3 s-py-2 hover:s-bg-gray-100 s-text-[#707070] hover:s-text-[#707070] s-no-underline s-mx-2 s-font-bold sm:s-text-lg s-text-[14px]"
            href="#"
            role="button"
            :class="{
              '!s-bg-primary-blue !s-text-white': currentPage === page.name,
            }"
            @click.prevent="onClickPage(page.name)"
            >{{ page.name }}</a
          >
        </li>

        <li class="pagination-item">
          <button
            type="button"
            :disabled="isInLastPage"
            aria-label="Go to next page"
            class="s-border s-border-solid s-font-bold s-border-[#EFEFEF] s-rounded-lg s-px-2.5 s-py-2 hover:s-bg-gray-100 s-text-[#707070] s-no-underline s-mx-2 sm:s-text-lg s-text-[16px]"
            :class="{ 's-cursor-not-allowed': isInLastPage }"
            @click="onClickNextPage"
          >
            Next
          </button>
        </li>

        <li class="pagination-item sm:s-block s-hidden">
          <a
            v-if="hasMorePages"
            class="s-rounded-r s-rounded-sm s-border s-border-gray-100 s-px-3 s-py-2 hover:s-bg-gray-100 s-text-gray-600 s-no-underline"
            href="#"
            rel="next"
            role="button"
            @click.prevent="onClickLastPage"
            >&raquo;</a
          >
          <span
            v-else
            class="s-rounded-r s-rounded-sm s-border s-border-gray-100 s-px-3 s-py-2 hover:s-bg-gray-100 s-text-gray-600 s-no-underline s-cursor-not-allowed"
            >&raquo;</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },

    totalPages: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    perPage: {
      type: Number,
      required: true,
    },

    currentPage: {
      type: Number,
      required: true,
    },

    hasMorePages: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1
      } else if (
        this.currentPage === this.totalPages &&
        this.totalPages > this.maxVisibleButtons
      ) {
        return this.totalPages - this.maxVisibleButtons + 1
      } else {
        return 1
      }
    },
    endPage() {
      if (this.totalPages > 1) {
        return Math.min(
          this.startPage + this.maxVisibleButtons - 1,
          this.totalPages
        )
      } else {
        return 1
      }
    },
    pages() {
      const range = []

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        })
      }

      return range
    },
    isInFirstPage() {
      return this.currentPage === 1
    },
    isInLastPage() {
      return this.currentPage === this.totalPages
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1)
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1)
    },
    onClickPage(page) {
      this.$emit('pagechanged', page)
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1)
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages)
    },
    isPageActive(page) {
      return this.currentPage === page
    },
  },
}
</script>

<style lang="scss" scoped></style>
