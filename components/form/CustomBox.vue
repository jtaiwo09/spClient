<template>
  <div :class="[extraClass]">
    <div class="s-flex s-items-center s-mr-4 s-mb-2">
      <input
        :id="`customBox-${name}`"
        :type="type"
        :value="val"
        v-model="checked"
        @change="onChange"
        :name="name"
        class="s-opacity-0 s-absolute"
        :class="type == 'checkbox' ? 's-rounded-md s-w-6 s-h-6' : 's-rounded-full s-w-4 s-h-4'"
      />
      <div
        class="s-border s-border-solid s-flex s-flex-shrink-0 s-justify-center s-items-center s-mr-2 focus-within:s-border-primary-blue"
        :class="
          [ 
            (darkMode) ? 's-border-[#B8BED9] s-bg-[#282828]' : 's-border-[#B8BED9] s-bg-white',
            (type=='checkbox' && value.includes(val)) || (type =='radio' && value == val)
            ? '!s-border-primary-blue !s-bg-primary-blue' : null,

            type == 'checkbox' ? 's-rounded-md s-w-6 s-h-6' : 's-rounded-full s-w-4 s-h-4' 
        ]
        "
      >
        <svg 
          class="s-fill-current s-text-blue-600 s-pointer-events-none"
          :class="[(type=='checkbox' && value.includes(val)) || (type =='radio' && value == val) ? 's-block' : 's-hidden', type == 'checkbox' ? 's-w-2 s-h-2' : 's-w-2 s-h-2' ]"
          version="1.1"
          viewBox="0 0 17 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fill-rule="evenodd">
            <g transform="translate(-9 -11)" fill="#fff" fill-rule="nonzero">
              <path
                d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z"
              />
            </g>
          </g>
        </svg>
      </div>
      <label :for="`customBox-${label ?? name}`" class=" s-text-primary-light s-text-[13px]"><slot></slot></label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'checkbox',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: [Number, String]
    },

    value: {
      type: [Array, String, Boolean],
    },

    val: {
      type: [String, Boolean, Number]
    },
    label: {
      type: String
    },
    extraClass: {
      type: String
    },
    darkMode: {
      type: Boolean,
      default : false
    },
    

  },
  emits: ["check"],

  data() {
    return {
        checkedProxy: false
    }
  },
  computed: {
	  checked: {
      get () {
        return this.value
      },
      set (val) {
        this.checkedProxy = val
      }
    }
  },

  methods: {
    onChange(e) {
      this.$emit('input', this.checkedProxy)
    }
  }
}
</script>

<style></style>
