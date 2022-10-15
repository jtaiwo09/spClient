<template>
  <VuePagination
    :page-count="getPaginateCount"
    :page-range="pageRange"
    :margin-pages="marginPages"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :click-handler="paginateClickCallback"
    :container-class="'s-flex s-gap-x-[8px] s-font-bold s-text-[#707070]'"
    :page-class="'s-text-[18px] s-w-[35px] s-h-[35px] s-border s-border-solid s-border-[#EFEFEF] s-rounded-[8px] s-flex s-justify-center s-items-center'"
    :page-link-class="'page-link'"
    :prev-class="'s-text-[18px] s-w-[60px] s-h-[35px] s-border s-border-solid s-border-[#EFEFEF] s-rounded-[8px] s-flex s-justify-center s-items-center'"
    :prev-link-class="'page-link'"
    :next-class="'s-text-[18px] s-w-[60px] s-h-[35px] s-border s-border-solid s-border-[#EFEFEF] s-rounded-[8px] s-flex s-justify-center s-items-center'"
    :next-link-class="'page-link'"
    :first-last-button="false"
  ></VuePagination>
</template>

<script>
import VuePagination from 'vuejs-paginate'
export default {
  components: {
    VuePagination,
  },
  props: {
    pageCount: {
      type: Number,
      default: 10,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    pageRange: {
      type: Number,
      default: 3,
    },
    marginPages: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {}
  },
  computed: {
    getPaginateCount() {
      return Math.ceil(this.total / this.perPage)
    },
  },
  methods: {
    paginateClickCallback(pageNum) {
      //   this.currentPage = Number(pageNum)
      this.$emit('handlePagination', pageNum)
    },
  },
}
</script>

<style>
.active {
  background: #2e48da;
  color: white;
}
</style>
