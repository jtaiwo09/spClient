<template>
  <div>
    <ul
      class="s-flex s-border-b s-border-b-[#b1b7d6]/30 s-border-solid s-w-full s-space-x-4"
    >
      <li
        v-for="(tab, index) in tabs"
        :key="tab.title"
        class="s-cursor-pointer s-px-4 s-py-2"
        :class="{
          's-border-b-2 s-border-b-[#2E48DA] s-border-solid':
            index == selectedIndex,
        }"
        @click="selectTab(index)"
      >
        {{ tab.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedIndex: 0,
      tabs: [],
    }
  },
  created() {
    this.tabs = this.$children
  },
  mounted() {
    this.selectTab(0)
  },
  methods: {
    selectTab(i) {
      this.selectedIndex = i
      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i
      })
    },
  },
}
</script>
