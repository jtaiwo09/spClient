<template>
  <div
    ref="tableList"
    class="s-h-[calc(100vh-226px)] md:s-h-[calc(100vh-130px)] s-overflow-scroll s-scroll-smooth"
  >
    <div>
      <!-- Desktop -->
      <div
        class="s-bg-white s-rounded-xl sm:s-flex s-flex-col s-hidden sm:s-ml-9 s-ml-5 s-mr-5 s-overflow-x-scroll s-min-h-[600px] s-mb-10"
      >
        <div class="s-mb-5">
          <TableTop
            :btn-text="'New Listing'"
            :loading="searchLoadingState"
            :scroll-tab="false"
            :class="'s-sticky s-top-0 s-z-20'"
            placeholder="Search"
            @customInput="search = $event"
            @searchData="searchData"
            @btnAction="listSpace"
          >
            <Select
              :class="'s-mr-6 md:s-mr-8 s-w-[15.188rem] !s-my-2'"
              label=""
              name="status"
              icon=""
              :options="listStatus"
              :value="status"
              @update="handleFilter"
            />
          </TableTop>
          <TableLoader v-if="showLoader" class="s-sticky s-top-[70px]" />
          <div
            class="hide-scrollbar scroll s-overflow-auto s-min-h-[calc(600px-80px)]"
          >
            <Tables v-if="filteredSpaces.length > 0" :table-head="headers">
              <tr
                v-for="space in filteredSpaces"
                :key="space.id"
                class="s-text-center s-bg-[#fff] s-border-b dark:s-border-gray-700 hover:s-bg-[#EFFFF8]"
              >
                <td>
                  <p
                    class="s-text-sm s-font-normal s-leading-6 s-text-[#0F0C3D] s-pt-8 s-pb-7"
                  >
                    {{ space.title || '-' }}
                  </p>
                </td>
                <td>
                  <p
                    class="s-text-sm s-leading-6 s-text-[#0F0C3D] s-font-normal s-capitalize"
                  >
                    {{ space.listing_type }}
                  </p>
                </td>
                <td>
                  <p
                    class="s-text-sm s-leading-6 s-text-[#0F0C3D] s-font-normal"
                  >
                    {{ space.city || '-' }}
                  </p>
                </td>
                <td>
                  <div class="s-self-center">
                    <StatusBadge :text="space.status" class="!s-mx-auto" />
                  </div>
                </td>
                <td>
                  <TableAction>
                    <div
                      class="s-border-[0.5px] s-w-[120px] s-mx-auto s-border-solid s-text-sm s-border-[#B1B7D6] s-rounded-xl s-bg-white"
                    >
                      <ul>
                        <li
                          v-for="action in actionsDropdown"
                          :key="action.id"
                          class="s-border-b-[0.5px] s-border-solid s-border-b-[#E7E9F1] s-rounded-t-xl hover:s-cursor-pointer"
                          @click="handleAction(action, space)"
                        >
                          <p class="s-px-[34px] s-py-3 s-text-[#242428]">
                            {{ action.text }}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </TableAction>
                </td>
              </tr>
            </Tables>
            <div v-else>
              <EmptyState
                :title="`No results found for “${search}”`"
                :display="false"
              >
                <div class="s-w-32 s-mx-auto s-pt-4 s-pb-6">
                  <NoResult />
                </div>

                <p
                  class="s-leading-6 s-text-sm s-font-normal sm:s-max-w-sm s-max-w-xs s-mx-auto sm:s-px-0 s-px-7"
                >
                  Sorry, we couldn’t find any result with that. Please try
                  searching for someone else
                </p>
              </EmptyState>
            </div>
          </div>
        </div>
        <div v-if="allSpaces.length" class="s-mt-auto s-ml-[2.875rem] s-mb-5">
          <t-pagination
            v-model="currentPage"
            :total-items="listedSpace.totalUserListing"
            :per-page="10"
            :limit="4"
            prev-label="Prev"
            next-label="Next"
            @change="showMore"
          />
        </div>
      </div>
      <!-- mobile -->
      <div class="sm:s-hidden s-block s-mx-[15px]">
        <div
          class="s-border s-rounded-[10px] s-border-solid s-border-[#EDEDED] s-bg-[#fff] s-pt-[21px] s-pb-[17px] s-sticky s-top-0 s-z-10"
        >
          <div class="s-flex s-items-center s-pl-[23px] s-pr-[32px]">
            <Select
              :class="'s-w-full s-mr-2'"
              label=""
              name="status"
              icon=""
              :options="listStatus"
              :value="status"
              @update="handleFilter"
            />
            <div
              class="s-bg-[#F3F5FF] s-rounded-full s-w-[43px] s-p-[11px] s-mb-5"
              :class="toggleRequestBtn === true ? 's-hidden' : 's-block'"
              @click="toggleRequestBtn = true"
            >
              <Search />
            </div>
          </div>
          <div v-if="toggleRequestBtn">
            <hr class="s-mb-5" />
            <div class="s-mx-7">
              <div class="s-relative s-w-full s-min-w-[230px]">
                <div
                  class="s-flex s-absolute s-inset-y-0 s-left-0 s-items-center s-pl-3 s-pointer-events-none"
                >
                  <Search class="s-absolute s-left-6" />
                </div>
                <input
                  v-model="search"
                  type="search"
                  class="s-pl-14 s-w-full s-px-4 s-h-12 s-rounded-full s-border-[#99A4E1] s-border-solid s-border s-bg-[#FAFAFE] focus:s-outline-none placeholder:s-text-sm s-text-sm"
                  placeholder="Search for space"
                />

                <Button
                  :loading="!searchLoadingState"
                  :icon="false"
                  type="submit"
                  class="s-text-[#fff] s-absolute s-right-[3px] s-bottom-[2px] s-bg-blue-700 s-rounded-full s-text-sm s-px-3 s-py-[10px] s-font-bold"
                  @submit="searchData"
                >
                  <ChevronLeftIcon />
                </Button>
              </div>
              <button
                class="s-text-primary-blue s-text-xs s-leading-6 s-underline s-ml-[14px] s-mb-[30px]"
                @click="collapseBtn"
              >
                collapse
              </button>
            </div>
          </div>
          <div class="s-pl-[23px] s-pr-[32px]">
            <button
              class="s-bg-primary-blue s-rounded-full s-text-sm s-font-bold s-pt-[12px] s-pb-3.5 s-px-10 s-text-[#fff] s-min-w-[250px] s-w-full"
              @click="listSpace"
            >
              New Listing
            </button>
          </div>
        </div>
        <TableLoader v-if="showLoader" class="s-sticky s-top-[168px]" />
        <div v-if="filteredSpaces.length">
          <div v-for="space in filteredSpaces" :key="space.id">
            <listCard
              class="s-mt-3.5"
              :space="space"
              :status-badge="handleColor(space.status)"
              :actions-dropdown="actionsDropdown"
              @dropdownAction="handleAction"
            />
          </div>
        </div>
        <div v-else class="s-mt-5">
          <EmptyState
            :title="`No results found for “${search}”`"
            :display="false"
          >
            <div class="s-w-32 s-mx-auto s-pt-4 s-pb-6">
              <NoResult />
            </div>

            <p
              class="s-leading-6 s-text-sm s-font-normal sm:s-max-w-sm s-max-w-xs s-mx-auto sm:s-px-0 s-px-7"
            >
              Kindly hit the
              <strong class="s-text-primary-blue">search button</strong> to do a
              further search.
            </p>
          </EmptyState>
        </div>
        <div v-if="allSpaces.length" class="sm:s-pl-10">
          <t-pagination
            v-model="currentPage"
            :total-items="listedSpace.totalUserListing"
            :per-page="10"
            :limit="4"
            prev-label="Prev"
            next-label="Next"
            @change="showMore"
          />
        </div>
      </div>
      <!-- Modal -->
      <div>
        <Modal :show="showEditDialog" @close="showEditDialog = false">
          <div class="s-mt-7">
            <h1
              class="s-text-lg s-leading-6 s-font-bold s-text-[#0E0C0C] s-mb-6"
            >
              You are about to edit a listing that is live
            </h1>
            <p class="s-text-sm s-leading-6 s-text-[#3F3D56] s-font-normal">
              The listing you are trying to edit is already live. Making changes
              to this listing would take it offline and you’ll have to resubmit
              for approval
            </p>
            <div class="s-flex sm:s-mt-5 s-mt-[30px]">
              <Button
                :loading="unpublishLoader"
                :text="'Continue'"
                class="s-bg-primary-blue s-text-sm s-leading-[18px] s-text-white s-font-bold sm:s-px-10 s-px-[18px] s-mr-2 s-rounded-full sm:!s-py-[15px] s-py-[10px]"
                @submit="handleUpdate"
              />
              <Button
                :text="'Go Back'"
                class="s-outline s-outline-primary-blue !s-text-primary-blue s-text-sm s-leading-[18px] s-font-bold sm:s-px-10 s-px-5 s-mr-2 s-rounded-full sm:!s-py-[6px] s-py-[10px]"
                @submit="showEditDialog = false"
              />
            </div>
          </div>
        </Modal>
        <Modal
          :show="showDeleteDialog"
          :modal-max-width="'s-max-w-[20rem] !s-p-6'"
          @close="showDeleteDialog = false"
        >
          <div class="s-mt-7">
            <DeleteIcon />
            <h1
              class="s-text-[1rem] s-leading-6 s-font-bold s-text-[#0E0C0C] s-mb-2 s-mt-7"
            >
              Are you sure you want to delete?
            </h1>
            <p class="s-text-sm s-leading-6 s-text-[#3F3D56] s-font-normal">
              Deleting this will permanently unpublish this listing.
            </p>
            <div class="s-flex sm:s-mt-5 s-mt-6">
              <Button
                :text="'Cancel'"
                class="s-outline s-outline-primary-blue !s-text-primary-blue s-text-sm s-leading-[18px] s-font-bold sm:s-px-10 s-px-7 s-mr-2 s-rounded-full s-py-2.5"
                @submit="showDeleteDialog = false"
              />
              <Button
                :text="'Delete'"
                :loading="loading"
                class="s-bg-[#DC2212] s-text-sm s-leading-[18px] s-text-white s-font-bold sm:s-px-10 s-px-7 s-mr-2 s-rounded-full s-py-3"
                @submit="deleteSpace"
              />
            </div>
          </div>
        </Modal>
        <div
          v-show="showManageDialog === true"
          class="dialog-bg s-fixed s-top-0 s-bottom-0 s-right-0 s-left-0 s-w-full s-z-50 s-flex s-justify-end"
          @click="showManageDialog = false"
        >
          <div class="s-h-[100vh] s-overflow-scroll">
            <div class="s-bg-[#fff]" @click.stop>
              <SpaceInformation
                :space-data="singleListedSpace"
                :selected-space="selectedSpace"
                @refresh="refreshPage"
                @close="showManageDialog = false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import DeleteIcon from '../../icons/DeleteIcon.vue'
import TableLoader from '../../reusables/TableLoader.vue'
import listCard from './listCard.vue'
import SpaceInformation from './spaceInformation.vue'
export default {
  components: { listCard, SpaceInformation, DeleteIcon, TableLoader },
  props: {
    totalSpace: {
      type: Array,
      default: () => [],
    },
    page: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      allSpaces: [],
      status: 'all listing',
      search: '',
      searchLoadingState: true,
      loading: false,
      unpublishLoader: false,
      toggleRequestBtn: false,
      mode: 'tab',
      showEditDialog: false,
      showManageDialog: false,
      showDeleteDialog: false,
      pages: this.page,
      perPage: 10,
      currentPage: 1,
      hasMorePages: true,
      selectedSpace: {},
      selectListingId: '',
      showLoader: false,
      listStatus: [
        { text: 'All Listing', value: 'all listing' },
        { text: 'Pending', value: 'pending' },
        { text: 'Published', value: 'published' },
        { text: 'Declined', value: 'declined' },
        { text: 'Updated', value: 'updated' },
        { text: 'Deactived', value: 'deactivated' },
        { text: 'Unavailable', value: 'unavailable' },
        { text: 'Awaiting Approval', value: 'awaiting approval' },
      ],
      headers: [
        {
          text: 'SPACE NAME',
          value: 'name',
        },
        { text: 'SPACE TYPE', value: 'type' },
        { text: 'LOCATION', value: 'location' },
        { text: 'STATUS', value: 'status' },
        { text: 'Actions', value: 'actions' },
      ],
      actionsDropdown: [
        { text: 'Update', value: 'update' },
        { text: 'Manage', value: 'manage' },
        { text: 'Delete', value: 'delete' },
      ],
    }
  },
  computed: {
    ...mapGetters('host/listing', ['singleListedSpace']),
    ...mapState('host/listing', ['listedSpace']),
    filteredSpaces: {
      get() {
        if (this.search) {
          if (this.status !== 'all listing') {
            return this.listedSpace.userListings.filter(
              (el) =>
                el.title &&
                el.title.toLowerCase().includes(this.search.toLowerCase()) &&
                el.status === this.status
            )
          }
          return this.allSpaces.filter(
            (el) =>
              el.title &&
              el.title.toLowerCase().includes(this.search.toLowerCase())
          )
        } else {
          if (this.status === 'all listing') {
            return this.listedSpace.userListings
          } else {
            return this.listedSpace.userListings.filter(
              (el) => el.status === this.status
            )
          }
        }
      },
      set(searchedArray) {
        if (searchedArray.length) {
          if (this.status && this.status !== 'all listing') {
            this.allSpaces = searchedArray.filter(
              (el) => el.status === this.status
            )
          } else this.allSpaces = searchedArray
        }
      },
    },
  },
  watch: {
    search(newValue) {
      if (newValue === '') {
        this.allSpaces = this.listedSpace.userListings
      }
    },
  },
  mounted() {
    const page = +this.$route.query.page
    if (page) {
      this.currentPage = page
    }
    this.UPDATE_LEVEL(null)
    this.UPDATE_STEP(null)
    this.allSpaces = this.listedSpace?.userListings
  },
  methods: {
    ...mapMutations('host/listing', [
      'UPDATE_LEVEL',
      'UPDATE_STEP',
      'UPDATE_PROPERTY_ID',
    ]),
    ...mapActions('host/listing', [
      'getSingleListedSpace',
      'getListedSpace',
      'unpublishListing',
    ]),
    handleFilter(value) {
      this.status = value
      if (this.search && this.status !== 'all listing') {
        this.allSpaces = this.listedSpace.userListings.filter(
          (el) =>
            el.title !== null &&
            el.status === value &&
            el.title.toLowerCase().includes(this.search.toLowerCase())
        )
      } else {
        if (value === 'all listing') {
          this.allSpaces = this.listedSpace?.userListings
        } else {
          this.allSpaces = this.listedSpace?.userListings.filter(
            (el) => el.status === value
          )
        }
      }
    },
    listSpace() {
      this.$router.push('/host/listing/start-listing')
    },
    async handleUpdate() {
      if (this.selectedSpace.status === 'published') {
        this.unpublishLoader = true
        try {
          await this.unpublishListing(this.selectListingId)
          this.unpublishLoader = false
          this.$router.push(
            `/host/listing/edit-listing?id=${this.selectListingId}`
          )
        } catch (error) {
          this.unpublishLoader = false
          this.$errorHandler(error)
        }
      } else {
        if (
          this.selectedSpace.status === 'unpublished' ||
          this.selectedSpace.status === 'unavailable' ||
          this.selectedSpace.status === 'updated' ||
          this.selectedSpace.status === 'declined'
        ) {
          const page = this.$route.query.page
          this.$router.push(
            `/host/listing/edit-listing?id=${this.selectListingId}&page=${page}`
          )
        } else if (this.selectedSpace.status === 'pending') {
          this.$router.push(
            `/host/listing/continue-listing?id=${this.selectListingId}`
          )
        }
      }
    },
    handleColor(status) {
      const chipColors = {
        published: 's-bg-[#3DDC97]',
        pending: 's-bg-[#F7CE51]',
        rejected: 's-bg-[#CC1D1D]',
        updated: 's-bg-purple-500',
        unavailable: 's-bg-[red]',
      }
      return chipColors[status]
    },
    searchData() {
      if (this.search !== '') {
        this.filteredSpaces = this.listedSpace.userListings.filter((item) => {
          if (item.title !== null) {
            return item.title.toLowerCase().includes(this.search.toLowerCase())
          }
          return null
        })
      }
    },
    collapseBtn() {
      this.toggleRequestBtn = false
      this.search = ''
    },
    async handleAction(action, space) {
      this.selectListingId = space.id
      this.selectedSpace = space
      this.UPDATE_PROPERTY_ID(this.selectListingId)
      if (
        space.status === 'published' ||
        space.status === 'unpublished' ||
        space.status === 'unavailable'
      ) {
        if (action.text === 'Manage') {
          try {
            await this.getSingleListedSpace(this.selectListingId)
            this.showManageDialog = true
          } catch (error) {
            this.$errorHandler(error)
          }
        }
      }
      if (space.status !== 'awaiting approval') {
        if (action.text === 'Update' && space.status === 'published') {
          this.showEditDialog = true
        }else{
          this.handleUpdate();
        }
      }
      if (action.text === 'Delete') {
        this.showDeleteDialog = true
      } else {
        return action
      }
    },
    toggleStatus(stat) {
      this.status = stat.value
    },
    async deleteSpace() {
      this.loading = true
      try {
        await this.$axios.$delete(`property/listing/${this.selectedSpace.id}`)
        await this.getListedSpace(this.currentPage)
        this.loading = false
        this.showDeleteDialog = false
      } catch (error) {
        this.$errorHandler(error)
        this.loading = false
      }
    },
    async showMore() {
      this.showLoader = true
      try {
        const response = await this.getListedSpace(this.currentPage)
        this.allSpaces = response.data.data.userListings
        this.showLoader = false
        this.$refs.tableList.scrollTop = 0
        this.$router.replace({ query: { page: this.currentPage } })
      } catch (error) {
        this.showLoader = false
        this.$errorHandler(error)
      }
    },
    async refreshPage() {
      await this.getSingleListedSpace(this.selectedSpace.id)
      this.$emit('refresh', this.currentPage)
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog-bg {
  background: rgba(0, 0, 0, 0.63);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}
.html {
  scroll-behavior: smooth;
}
</style>
