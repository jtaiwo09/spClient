<template>
  <div>
    <div
      v-if="
        openTab === 1 &&
        tenantsData.length === 0 &&
        !refreshData &&
        mode === 'tab'
      "
      class="s-mx-[15px] sm:s-ml-9 sm:s-mr-[14px] sm:s-mt-0 s-mt-20 s-max-w-[1440px] xl:s-mx-auto"
    >
      <EmptyState :btn-text="'Verify Tenant'" @btnAction="verify">
        <div class="s-w-32 s-mx-auto s-pt-4 s-pb-6">
          <NoSearch />
        </div>

        <p
          class="s-text-[#77777D] s-leading-6 s-text-sm s-font-normal sm:s-max-w-sm s-max-w-xs s-mx-auto sm:s-px-0 s-px-7"
        >
          It looks like you haven’t made any verifications requests yet. Create
          a verification request now to get started.
        </p>
      </EmptyState>
    </div>
    <div v-else>
      <div
        class="sm:s-flex s-flex-col s-bg-[#fff] s-rounded-xl s-ml-9 s-mr-[14px] s-hidden s-max-w-[1440px] xl:s-mx-auto s-min-h-[600px] s-mb-10"
      >
        <div>
          <TableTop
            :btn-text="'New Request'"
            :loading="searchLoadingState"
            @customInput="search = $event"
            @btnAction="$router.push('verify/create')"
            @searchData="searchData"
          >
            <ul class="s-flex s-list-none s-flex-row">
              <li
                v-for="(tab, index) in tabs"
                :key="index"
                class="s-text-center s-w-40"
                :class="{
                  's-border-solid s-border-b-2 s-border-b-indigo-500 s-border-l-[#fff] s-border-r-[#fff] s-border-t-[#fff]':
                    openTab === tab.id,
                }"
              >
                <span
                  class="s-capitalize s-leading-normal hover:s-text-primary-blue hover:s-cursor-pointer"
                  :class="{
                    's-text-[#ABAEBF] s-font-normal s-bg-[#fff]':
                      openTab !== tab.id,
                    's-text-primary-blue s-font-bold': openTab === tab.id,
                  }"
                  @click="toggleTabs(tab)"
                >
                  <p
                    class="s-pt-[26px] s-pb-[18px] s-text-sm s-leading-[18px] s-whitespace-nowrap"
                    :class="index + 1 === tab.length && 's-text-center'"
                  >
                    {{ tab.text }}
                  </p>
                </span>
              </li>
            </ul>
          </TableTop>
          <div class="s-overflow-x-auto s-min-h-[calc(600px-62px)]">
            <div v-for="tab in 4" :key="tab">
              <div v-if="openTab === tab">
                <TableLoader v-if="showLoader" />
                <div v-if="tenantsData.length > 0">
                  <Tables
                    v-if="filteredTenantData.length > 0"
                    :table-head="headers"
                    class="s-pb-[30px]"
                  >
                    <tr
                      v-for="tenant in filteredTenantData"
                      :key="tenant.id"
                      class="s-text-center s-bg-[#fff] s-border-b dark:s-border-gray-700 hover:s-bg-[#EFFFF8]"
                    >
                      <td class="s-pt-[18px] s-pb-5">
                        <div class="s-flex s-items-center s-space-x-3 s-w-full">
                          <div class="s-pl-12">
                            <div v-if="tenant.selfie">
                              <img
                                :src="tenant.selfie"
                                alt=""
                                class="s-rounded-full"
                                width="55px"
                              />
                            </div>
                            <div v-else>
                              <avatar />
                            </div>
                          </div>
                          <p
                            class="s-text-sm s-font-normal s-leading-6 s-text-[#0F0C3D]"
                          >
                            {{ tenant.firstName }} {{ tenant.lastName }}
                          </p>
                        </div>
                      </td>
                      <td>
                        <p
                          class="s-text-sm s-leading-6 s-text-[#0F0C3D] s-font-normal"
                        >
                          {{ tenant.email }}
                        </p>
                      </td>
                      <td>
                        <p
                          class="s-text-sm s-leading-6 s-text-[#0F0C3D] s-font-normal"
                        >
                          {{ tenant.phone }}
                        </p>
                      </td>
                      <td>
                        <p
                          class="s-text-sm s-leading-6 s-text-[#0F0C3D] s-font-normal"
                        >
                          {{ tenant.createdAt | formatDate('do MMMM, yyyy') }}
                        </p>
                      </td>
                      <td>
                        <div
                          class="s-mx-auto s-border s-border-[#B1B7D6] s-rounded-full s-border-solid s-py-1 s-flex s-w-fit s-px-5"
                        >
                          <div
                            class="s-w-[11px] s-h-[11px] s-rounded-full s-mr-[6px] [#3DDC97] s-self-center"
                            :class="handleColor(tenant.status)"
                          ></div>
                          <p
                            class="s-text-xs s-leading-6 s-text-[#0F0C3D] s-whitespace-nowrap"
                          >
                            {{ tenant.status | capitalize }}
                          </p>
                        </div>
                      </td>
                      <td class="s-text-center">
                        <TableAction @openDropdown="expandOption(tenant)">
                          <button
                            class="s-border-[0.5px] s-bg-white s-text-sm s-border-[#B1B7D6] s-py-[19px] s-px-[34px] s-rounded-xl"
                            @click="expandOption(tenant)"
                          >
                            <span
                              v-if="loading === true"
                              class="google__wrap-text s-mr-2"
                            >
                              View
                            </span>
                            <Loader v-else fill="#B0BCFF" />
                          </button>
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
                        Kindly hit the
                        <strong class="s-text-primary-blue"
                          >search button</strong
                        >
                        to do a further search.
                      </p>
                    </EmptyState>
                  </div>
                </div>
                <div
                  v-else-if="tenantsData.length === 0 && search === ''"
                  class="s-py-14"
                >
                  <EmptyState :display="false">
                    <div class="s-w-32 s-mx-auto s-pt-4 s-pb-6">
                      <NoSearch />
                    </div>

                    <p
                      class="s-text-[#77777D] s-leading-6 s-text-sm s-font-normal sm:s-max-w-sm s-max-w-xs s-mx-auto sm:s-px-0 s-px-7"
                    >
                      It looks like you don’t have any requests here
                    </p>
                  </EmptyState>
                </div>
                <div v-else-if="tenantsData.length === 0 && search !== ''">
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
          </div>
        </div>
        <div v-if="tenantsData.length" class="s-mt-auto">
          <pagination
            class="sm:s-pl-10 s-pl-0 s-mb-4 s-mt-2"
            :total-pages="totalPages"
            :total="total"
            :per-page="10"
            :current-page="currentPage"
            :has-more-pages="hasMorePages"
            @pagechanged="showMore"
          >
          </pagination>
        </div>
      </div>
      <!-- mobile -->
      <div class="sm:s-hidden s-block s-mx-[15px]">
        <div
          class="s-border s-rounded-[10px] s-border-solid s-border-[#EDEDED] s-bg-[#fff] s-pt-[21px] s-pb-[17px]"
        >
          <div class="s-flex s-items-center s-pl-[23px] s-pr-[32px]">
            <Select
              :class="'s-mr-6 md:s-mr-8 s-w-full'"
              label=""
              name="status"
              icon=""
              :options="tabs"
              :value="tenantStatus"
              @select="toggleTabs"
            />
            <div
              class="s-bg-[#F3F5FF] s-rounded-full s-w-[43px] s-p-[11px] s-mb-5"
              :class="toggleRequestBtn === true ? 's-hidden' : 's-block'"
              @click="toggleRequestBtn = true"
            >
              <Search />
            </div>
          </div>
          <div v-if="toggleRequestBtn" class="">
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
                  placeholder="Search for tenant"
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
              @click="$router.push('verify/create')"
            >
              New Request
            </button>
          </div>
        </div>

        <div>
          <div v-if="tenantsData.length > 0">
            <div v-if="filteredTenantData.length > 0">
              <div v-for="tenant in filteredTenantData" :key="tenant.id">
                <TenantCard
                  class="s-mt-[11px]"
                  :status-badge="handleColor(tenant.status)"
                  :loading="loading"
                  :tenant="tenant"
                  @view="expandOption(tenant)"
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
                  <strong class="s-text-primary-blue">search button</strong> to
                  do a further search.
                </p>
              </EmptyState>
            </div>
          </div>
          <div
            v-else-if="tenantsData.length === 0 && search === ''"
            class="s-py-14"
          >
            <EmptyState :display="false">
              <div class="s-w-32 s-mx-auto s-pt-4 s-pb-6">
                <NoSearch />
              </div>

              <p
                class="s-text-[#77777D] s-leading-6 s-text-sm s-font-normal sm:s-max-w-sm s-max-w-xs s-mx-auto sm:s-px-0 s-px-7"
              >
                It looks like you don’t have any requests here
              </p>
            </EmptyState>
          </div>
          <div
            v-else-if="tenantsData.length === 0 && search !== ''"
            class="s-mt-5"
          >
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
                searching for something else
              </p>
            </EmptyState>
          </div>
        </div>
        <div v-if="tenantsData.length">
          <pagination
            class="sm:s-pl-10 s-pl-0 s-mb-3 s-mt-2"
            :total-pages="totalPages"
            :total="total"
            :per-page="10"
            :current-page="currentPage"
            :has-more-pages="hasMorePages"
            @pagechanged="showMore"
          >
          </pagination>
        </div>
      </div>
      <!-- Modal -->
      <div
        v-show="showModal === true"
        class="dialog-bg s-fixed s-top-0 s-bottom-0 s-right-0 s-left-0 s-w-full s-z-50 s-flex s-items-center s-justify-end"
      >
        <div class="s-h-[100vh] s-overflow-scroll">
          <div class="s-bg-[#fff]">
            <TenantInformation
              :single-tenant-data="singleTenantData"
              @close="showModal = false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TableLoader from '../reusables/TableLoader.vue'
export default {
  components: {
    TableLoader,
  },
  layout: 'host',
  props: {
    tenantsData: {
      type: Array,
      default: () => [],
    },
    refreshData: {
      type: Boolean,
      default: false,
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
    showLoader: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openTab: 1,
      isOptionsExpanded: false,
      selectedTenant: {},
      pages: this.page,
      perPage: 10,
      currentPage: 1,
      hasMorePages: true,
      tabs: [
        {
          text: 'All Requests',
          value: 'All Request',
          id: 1,
        },
        {
          text: 'Completed Requests',
          value: 'Completed',
          id: 2,
        },
        {
          text: 'Pending Requests',
          value: 'Pending',
          id: 3,
        },
        {
          text: 'Incomplete Requests',
          value: 'Incomplete Verification',
          id: 4,
        },
      ],
      headers: [
        {
          text: 'TENANT',
          align: 'center',
          value: 'tenant',
        },
        { text: 'EMAIL ADDRESS', value: 'email' },
        { text: 'Phone Number', value: 'phonenumber' },
        { text: 'REQUEST DATE', value: 'request-date' },
        { text: 'STATUS', value: 'status' },
        { text: 'Actions', value: 'actions' },
      ],

      tenantStatus: 'All Request',
      timeFrame: '',
      toggleRequestBtn: false,
      showModal: false,
      loading: true,
      searchLoadingState: true,
      search: '',
      mode: 'tab',
    }
  },
  computed: {
    filteredTenantData() {
      if (this.search) {
        return this.tenantsData.filter(
          (item) =>
            item.firstName.toLowerCase().includes(this.search) ||
            item.lastName.toLowerCase().includes(this.search) ||
            item.firstName.includes(this.search) ||
            item.lastName.includes(this.search)
        )
      } else {
        return this.tenantsData
      }
    },
    ...mapGetters('host/verify', ['singleTenantData']),
  },
  methods: {
    ...mapActions('host/verify', ['fetchSingleTenantData', 'searchTenantData']),
    toggleTabs(tab) {
      this.openTab = tab.id
      this.mode = 'tab'
      this.tenantStatus = tab.value
      this.updateData()
    },
    async searchData() {
      if (this.search === '') {
        this.mode = 'tab'
      } else {
        this.searchLoadingState = false
        try {
          this.mode = 'search'
          await this.searchTenantData(this.search)
          this.searchLoadingState = true
        } catch (error) {
          this.$errorHandler(error)
        }
      }
    },
    updateData() {
      const tabKeys = {
        1: 'all',
        2: 'completed',
        3: 'pending',
        4: 'incomplete',
      }
      this.$emit('refresh', {
        status: tabKeys[this.openTab],
        page: 1,
      })
    },
    handleColor(status) {
      const chipColors = {
        completed: 's-bg-[#3DDC97]',
        pending: 's-bg-[#F7CE51]',
        'incomplete verification': 's-bg-[#FF7F37]',
      }
      return chipColors[status.toLowerCase()]
    },
    async expandOption(item) {
      this.selectedTenant = item
      this.loading = false
      try {
        this.loading = false
        await this.fetchSingleTenantData(item.id)
        this.loading = true
        this.showModal = true
      } catch (error) {
        this.$errorHandler(error)
      }
    },
    verify() {
      this.$router.push('verify/create')
    },
    ...mapActions('host/verify', ['fetchTenantsData']),
    collapseBtn() {
      this.toggleRequestBtn = false
      this.search = ''
      this.updateData()
    },
    showMore(page) {
      this.pages = page
      this.currentPage = page
      const tabKeys = {
        1: 'all',
        2: 'completed',
        3: 'pending',
        4: 'incomplete',
      }
      this.$emit('goToSelectedPage', {
        status: tabKeys[this.openTab],
        page: this.pages,
      })
    },
  },
}
</script>

<style scoped>
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
</style>
