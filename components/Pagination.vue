<template>
  <div class="cheetah-pagination">
    <template v-if="isShowPagination">
      <div class="page-total my-1 mr-2">
          Có {{ total }} trang :
      </div>

      <b-pagination
        :total-rows="total"
        pills
        :disabled="disabled || !total"
        class="my-1 mr-2"
        @change="val => onPageChange(+val, pageSize)"
      />

    </template>
  </div>
</template>

<script>
import { PAGE_SIZES } from '../contants/index'

const EVENT_PAGE_SIZE_CHANGE = 'page-size-change'
const EVENT_PAGE_CHANGE = 'page-change'

export default {
  props: {
    /**
     * Total record
     */
    total: {
      type: Number,
      default: null
    },

    /**
     * Current page
     */
    currentPage: {
      type: Number,
      default: 0
    },

    /**
     * Number of items per page
     */
    pageSize: {
      type: Number,
      default: 0
    },

    /**
     * Item name
     */
    itemName: {
      type: String,
      default: ''
    },

    /**
     * Disabled status
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      isShowPagination: false // For F5 Browser
    }
  },

  computed: {
    /**
     * Get PAGE_SIZES
     *
     * @return {Array} PAGE_SIZES
     */
    PAGE_SIZES () {
      return PAGE_SIZES
    }
  },

  mounted () {
    setTimeout(() => {
      this.isShowPagination = true
    }, 500)
  },

  methods: {
    /**
     * Event when click to page number
     *
     * @param {Number} page - Page number
     * @param {Number} limit - Page size number
     */
    onPageChange (page, limit) {
      this.$emit(EVENT_PAGE_CHANGE, { page, limit })
    },

    /**
     * Event when change option page size number
     *
     * @param {Number} limit - Page size number
     */
    onPageSizeChange (limit) {
      this.$emit(EVENT_PAGE_SIZE_CHANGE, limit)
    }
  }
}
</script>
