<template>
  <div>
    <Loading v-if="loading" />
    <div v-else class="md-s:!s-min-h-fit">
      <div
        class="s-mb-2 s-px-6 md-x:!s-px-[3.25rem] s-flex s-justify-between s-items-center s-sticky s-top-0 md-s:s-top-2.5 s-h-[100px] s-w-full s-bg-[#fff] s-z-20"
      >
        <div>
          <h2 class="title s-text-[1.25rem] s-mb-0">Subscription & Booking</h2>
          <p class="sub-title !s-leading-[1.375rem] s-text-xs">
            Review your subscriptions
          </p>
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
          <div v-if="listingType === 'entire'">
            <div class="s-hidden sm:s-block">
              <tabs>
                <div class="s-mt-9">
                  <tab v-if="monthly" title="Monthly">
                    <div class="s-text-[#222228] s-px-4">
                      <div class="s-mb-11">
                        <p class="s-font-semibold s-text-sm s-leading-6 s-mb-2">
                          Total cost
                        </p>
                        <h2
                          class="s-font-semibold s-text-5"
                          v-html="
                            convertToCurrency(
                              +monthlyEntire.amount +
                                +monthlyEntire.service_charge +
                                +monthlyEntire.securityDeposit -
                                +monthlyEntire.amount *
                                  (+monthlyEntire.percentageDiscount / 100)
                            )
                          "
                        ></h2>
                      </div>
                      <div>
                        <h2 class="s-font-bold s-text-4 s-mb-2.5">
                          Cost Breakdown
                        </h2>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Rent - ' + convertToCurrency(monthlyEntire.amount)
                          "
                        ></p>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Total Service Charge - ' +
                            convertToCurrency(monthlyEntire.service_charge)
                          "
                        ></p>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Security Deposit - ' +
                            convertToCurrency(monthlyEntire.securityDeposit)
                          "
                        ></p>
                        <p class="s-text-sm s-font-normal">
                          Discount - {{ monthlyEntire.percentageDiscount }}%
                        </p>
                      </div>
                    </div>
                  </tab>
                  <tab v-if="quarterly" title="Quarterly">
                    <div class="s-text-[#222228] s-px-4">
                      <div class="s-mb-11">
                        <p class="s-font-semibold s-text-sm s-leading-6 s-mb-2">
                          Total cost
                        </p>
                        <h2
                          class="s-font-semibold s-text-5"
                          v-html="
                            convertToCurrency(
                              +quarterlyEntire.amount +
                                +quarterlyEntire.service_charge +
                                +quarterlyEntire.securityDeposit -
                                +quarterlyEntire.amount *
                                  (+quarterlyEntire.percentageDiscount / 100)
                            )
                          "
                        ></h2>
                      </div>
                      <div>
                        <h2 class="s-font-bold s-text-4 s-mb-2.5">
                          Cost Breakdown
                        </h2>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Rent - ' +
                            convertToCurrency(quarterlyEntire.amount)
                          "
                        ></p>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Total Service Charge - ' +
                            convertToCurrency(quarterlyEntire.service_charge)
                          "
                        ></p>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Security Deposit - ' +
                            convertToCurrency(quarterlyEntire.securityDeposit)
                          "
                        ></p>
                        <p class="s-text-sm s-font-normal">
                          Discount - {{ quarterlyEntire.percentageDiscount }}%
                        </p>
                      </div>
                    </div>
                  </tab>
                  <tab v-if="biannually" title="Biannual">
                    <div class="s-text-[#222228] s-px-4">
                      <div class="s-mb-11">
                        <p class="s-font-semibold s-text-sm s-leading-6 s-mb-2">
                          Total cost
                        </p>
                        <h2
                          class="s-font-semibold s-text-5"
                          v-html="
                            convertToCurrency(
                              +biannualEntire.amount +
                                +biannualEntire.service_charge +
                                +biannualEntire.securityDeposit -
                                +biannualEntire.amount *
                                  (+biannualEntire.percentageDiscount / 100)
                            )
                          "
                        ></h2>
                      </div>
                      <div>
                        <h2 class="s-font-bold s-text-4 s-mb-2.5">
                          Cost Breakdown
                        </h2>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Rent - ' + convertToCurrency(biannualEntire.amount)
                          "
                        ></p>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Total Service Charge - ' +
                            convertToCurrency(biannualEntire.service_charge)
                          "
                        ></p>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Security Deposit - ' +
                            convertToCurrency(biannualEntire.securityDeposit)
                          "
                        ></p>
                        <p class="s-text-sm s-font-normal">
                          Discount - {{ biannualEntire.percentageDiscount }}%
                        </p>
                      </div>
                    </div>
                  </tab>
                  <tab v-if="yearly" title="Annually">
                    <div class="s-text-[#222228] s-px-4">
                      <div class="s-mb-11">
                        <p class="s-font-semibold s-text-sm s-leading-6 s-mb-2">
                          Total cost
                        </p>
                        <h2
                          class="s-font-semibold s-text-5"
                          v-html="
                            convertToCurrency(
                              +yearlyEntire.amount +
                                +yearlyEntire.service_charge +
                                +yearlyEntire.securityDeposit -
                                +yearlyEntire.amount *
                                  (+yearlyEntire.percentageDiscount / 100)
                            )
                          "
                        ></h2>
                      </div>
                      <div>
                        <h2 class="s-font-bold s-text-4 s-mb-2.5">
                          Cost Breakdown
                        </h2>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Rent - ' + convertToCurrency(yearlyEntire.amount)
                          "
                        ></p>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Total Service Charge - ' +
                            convertToCurrency(yearlyEntire.service_charge)
                          "
                        ></p>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Security Deposit - ' +
                            convertToCurrency(yearlyEntire.securityDeposit)
                          "
                        ></p>
                        <p class="s-text-sm s-font-normal">
                          Discount - {{ yearlyEntire.percentageDiscount }}%
                        </p>
                      </div>
                    </div>
                  </tab>
                </div>
              </tabs>
            </div>
            <div class="sm:s-hidden s-mb-10">
              <h2 class="s-text-[#000000] s-text-[20px] s-font-bold s-mb-4">
                Review Subscriptions
              </h2>
              <Select
                :class="'s-mr-6 md:s-mr-8 s-w-full'"
                name="cleaningService"
                default-text="Select Option"
                :options="subcriptionPlan"
                no-margin-bottom
                :value="sub"
                @update="(value) => (sub = value)"
              />
              <div class="s-text-[#222228] s-mt-7 s-px-4">
                <div class="s-mb-11">
                  <p class="s-font-semibold s-text-sm s-leading-6 s-mb-2">
                    Total cost
                  </p>
                  <h2
                    class="s-font-semibold s-text-5"
                    v-html="
                      convertToCurrency(
                        +EntireMobile.amount +
                          +EntireMobile.service_charge +
                          +EntireMobile.securityDeposit -
                          +EntireMobile.amount *
                            (+EntireMobile.percentageDiscount / 100)
                      )
                    "
                  ></h2>
                </div>
                <div>
                  <h2 class="s-font-bold s-text-4 s-mb-2.5">Cost Breakdown</h2>
                  <p
                    class="s-text-sm s-font-normal s-mb-4"
                    v-html="'Rent - ' + convertToCurrency(EntireMobile.amount)"
                  ></p>
                  <p
                    class="s-text-sm s-font-normal s-mb-4"
                    v-html="
                      'Total Service Charge - ' +
                      convertToCurrency(EntireMobile.amount)
                    "
                  ></p>
                  <p
                    class="s-text-sm s-font-normal s-mb-4"
                    v-html="
                      'Security Deposit - ' +
                      convertToCurrency(EntireMobile.securityDeposit)
                    "
                  ></p>
                  <p class="s-text-sm s-font-normal">
                    Discount - {{ EntireMobile.percentageDiscount }}%
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="listingType === 'shared'">
            <div class="s-hidden sm:s-block">
              <tabs>
                <div class="s-mt-9">
                  <tab v-if="monthly" title="Monthly">
                    <div class="s-text-[#222228] s-px-4">
                      <div v-for="room in rooms" :key="room.id">
                        <div class="s-relative s-overflow-hidden s-mb-7">
                          <div
                            class="s-z-[2] sm:s-sticky s-top-0 s-bg-white s-cursor-pointer s-w-full s-flex s-justify-between s-items-center s-px-5 s-py-2 s-border s-border-solid s-border-[#D5D9EF] s-rounded-[8px]"
                            @click="toggle(room.id)"
                          >
                            <p class="s-font-bold s-text-[#222228] s-text-sm">
                              {{ room.name }}
                            </p>
                            <ChevronDownIcon
                              :class="{
                                's-transform s-rotate-180 s-duration-200':
                                  show.includes(room.id),
                              }"
                            />
                          </div>
                          <transition name="slide" mode="out-in">
                            <div
                              v-if="show.includes(room.id)"
                              class="s-bg-white s-z-[5] s-px-3 s-pt-7"
                            >
                              <template v-for="price in room.prices">
                                <div
                                  v-if="price.sub_plan === 'monthly'"
                                  :key="price.id"
                                  class="s-flex s-flex-col sm:s-flex-row sm:s-justify-between"
                                >
                                  <div class="s-mb-11 sm:s-mb-0">
                                    <p
                                      class="s-font-semibold s-text-sm s-leading-6 s-mb-2"
                                    >
                                      Total cost
                                    </p>
                                    <h2
                                      class="s-font-semibold s-text-5"
                                      v-html="
                                        convertToCurrency(
                                          +price.amount +
                                            +price.service_charge +
                                            +price.securityDeposit -
                                            +price.amount *
                                              (+price.percentageDiscount / 100)
                                        )
                                      "
                                    ></h2>
                                  </div>
                                  <div>
                                    <h2 class="s-font-bold s-text-4 s-mb-2.5">
                                      Cost Breakdown
                                    </h2>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Rent - ' +
                                        convertToCurrency(price.amount)
                                      "
                                    ></p>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Total Service Charge - ' +
                                        convertToCurrency(price.service_charge)
                                      "
                                    ></p>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Security Deposit - ' +
                                        convertToCurrency(price.securityDeposit)
                                      "
                                    ></p>
                                    <p class="s-text-sm s-font-normal">
                                      Discount - {{ price.percentageDiscount }}%
                                    </p>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </transition>
                        </div>
                      </div>
                    </div>
                  </tab>
                  <tab v-if="quarterly" title="Quarterly">
                    <div class="s-text-[#222228] s-px-4">
                      <div v-for="room in rooms" :key="room.id">
                        <div class="s-relative s-overflow-hidden s-mb-7">
                          <div
                            class="s-z-[2] sm:s-sticky s-top-0 s-bg-white s-cursor-pointer s-w-full s-flex s-justify-between s-items-center s-px-5 s-py-2 s-border s-border-solid s-border-[#D5D9EF] s-rounded-[8px]"
                            @click="toggle(room.id)"
                          >
                            <p class="s-font-bold s-text-[#222228] s-text-sm">
                              {{ room.name }}
                            </p>
                            <ChevronDownIcon
                              :class="{
                                's-transform s-rotate-180 s-duration-200':
                                  show.includes(room.id),
                              }"
                            />
                          </div>
                          <transition name="slide" mode="out-in">
                            <div
                              v-if="show.includes(room.id)"
                              class="s-bg-white s-z-[5] s-px-3 s-pt-7"
                            >
                              <template v-for="price in room.prices">
                                <div
                                  v-if="price.sub_plan === 'quarterly'"
                                  :key="price.id"
                                  class="s-flex s-flex-col sm:s-flex-row sm:s-justify-between"
                                >
                                  <div class="s-mb-11 sm:s-mb-0">
                                    <p
                                      class="s-font-semibold s-text-sm s-leading-6 s-mb-2"
                                    >
                                      Total cost
                                    </p>
                                    <h2
                                      class="s-font-semibold s-text-5"
                                      v-html="
                                        convertToCurrency(
                                          +price.amount +
                                            +price.service_charge +
                                            +price.securityDeposit -
                                            +price.amount *
                                              (+price.percentageDiscount / 100)
                                        )
                                      "
                                    ></h2>
                                  </div>
                                  <div>
                                    <h2 class="s-font-bold s-text-4 s-mb-2.5">
                                      Cost Breakdown
                                    </h2>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Rent - ' +
                                        convertToCurrency(price.amount)
                                      "
                                    ></p>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Total Service Charge - ' +
                                        convertToCurrency(price.service_charge)
                                      "
                                    ></p>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Security Deposit - ' +
                                        convertToCurrency(price.securityDeposit)
                                      "
                                    ></p>
                                    <p class="s-text-sm s-font-normal">
                                      Discount - {{ price.percentageDiscount }}%
                                    </p>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </transition>
                        </div>
                      </div>
                    </div>
                  </tab>
                  <tab v-if="biannually" title="Biannual">
                    <div class="s-text-[#222228] s-px-4">
                      <div v-for="room in rooms" :key="room.id">
                        <div class="s-relative s-overflow-hidden s-mb-7">
                          <div
                            class="s-z-[2] sm:s-sticky s-top-0 s-bg-white s-cursor-pointer s-w-full s-flex s-justify-between s-items-center s-px-5 s-py-2 s-border s-border-solid s-border-[#D5D9EF] s-rounded-[8px]"
                            @click="toggle(room.id)"
                          >
                            <p class="s-font-bold s-text-[#222228] s-text-sm">
                              {{ room.name }}
                            </p>
                            <ChevronDownIcon
                              :class="{
                                's-transform s-rotate-180 s-duration-200':
                                  show.includes(room.id),
                              }"
                            />
                          </div>
                          <transition name="slide" mode="out-in">
                            <div
                              v-if="show.includes(room.id)"
                              class="s-bg-white s-z-[5] s-px-3 s-pt-7"
                            >
                              <template v-for="price in room.prices">
                                <div
                                  v-if="price.sub_plan === 'biannual'"
                                  :key="price.id"
                                  class="s-flex s-flex-col sm:s-flex-row sm:s-justify-between"
                                >
                                  <div class="s-mb-11 sm:s-mb-0">
                                    <p
                                      class="s-font-semibold s-text-sm s-leading-6 s-mb-2"
                                    >
                                      Total cost
                                    </p>
                                    <h2
                                      class="s-font-semibold s-text-5"
                                      v-html="
                                        convertToCurrency(
                                          +price.amount +
                                            +price.service_charge +
                                            +price.securityDeposit -
                                            +price.amount *
                                              (+price.percentageDiscount / 100)
                                        )
                                      "
                                    ></h2>
                                  </div>
                                  <div>
                                    <h2 class="s-font-bold s-text-4 s-mb-2.5">
                                      Cost Breakdown
                                    </h2>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Rent - ' +
                                        convertToCurrency(price.amount)
                                      "
                                    ></p>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Total Service Charge - ' +
                                        convertToCurrency(price.service_charge)
                                      "
                                    ></p>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Security Deposit - ' +
                                        convertToCurrency(price.securityDeposit)
                                      "
                                    ></p>
                                    <p class="s-text-sm s-font-normal">
                                      Discount - {{ price.percentageDiscount }}%
                                    </p>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </transition>
                        </div>
                      </div>
                    </div>
                  </tab>
                  <tab v-if="yearly" title="Annually">
                    <div class="s-text-[#222228] s-px-4">
                      <div v-for="room in rooms" :key="room.id">
                        <div class="s-relative s-overflow-hidden s-mb-7">
                          <div
                            class="s-z-[2] sm:s-sticky s-top-0 s-bg-white s-cursor-pointer s-w-full s-flex s-justify-between s-items-center s-px-5 s-py-2 s-border s-border-solid s-border-[#D5D9EF] s-rounded-[8px]"
                            @click="toggle(room.id)"
                          >
                            <p class="s-font-bold s-text-[#222228] s-text-sm">
                              {{ room.name }}
                            </p>
                            <ChevronDownIcon
                              :class="{
                                's-transform s-rotate-180 s-duration-200':
                                  show.includes(room.id),
                              }"
                            />
                          </div>
                          <transition name="slide" mode="out-in">
                            <div
                              v-if="show.includes(room.id)"
                              class="s-bg-white s-z-[5] s-px-3 s-pt-7"
                            >
                              <template v-for="price in room.prices">
                                <div
                                  v-if="price.sub_plan === 'yearly'"
                                  :key="price.id"
                                  class="s-flex s-flex-col sm:s-flex-row sm:s-justify-between"
                                >
                                  <div class="s-mb-11 sm:s-mb-0">
                                    <p
                                      class="s-font-semibold s-text-sm s-leading-6 s-mb-2"
                                    >
                                      Total cost
                                    </p>
                                    <h2
                                      class="s-font-semibold s-text-5"
                                      v-html="
                                        convertToCurrency(
                                          +price.amount +
                                            +price.service_charge +
                                            +price.securityDeposit -
                                            +price.amount *
                                              (+price.percentageDiscount / 100)
                                        )
                                      "
                                    ></h2>
                                  </div>
                                  <div>
                                    <h2 class="s-font-bold s-text-4 s-mb-2.5">
                                      Cost Breakdown
                                    </h2>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Rent - ' +
                                        convertToCurrency(price.amount)
                                      "
                                    ></p>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Total Service Charge - ' +
                                        convertToCurrency(price.service_charge)
                                      "
                                    ></p>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Security Deposit - ' +
                                        convertToCurrency(price.securityDeposit)
                                      "
                                    ></p>
                                    <p class="s-text-sm s-font-normal">
                                      Discount - {{ price.percentageDiscount }}%
                                    </p>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </transition>
                        </div>
                      </div>
                    </div>
                  </tab>
                </div>
              </tabs>
            </div>
            <div class="sm:s-hidden s-mb-10">
              <h2 class="s-text-[#000000] s-text-[20px] s-font-bold s-mb-4">
                Review Subscriptions
              </h2>
              <Select
                :class="'s-mr-6 md:s-mr-8 s-w-full !s-mb-10'"
                name="cleaningService"
                default-text="Select Option"
                :options="subcriptionPlan"
                no-margin-bottom
                :value="sub"
                @update="(value) => (sub = value)"
              />
              <div v-if="monthly" class="s-text-[#222228]">
                <div v-for="room in rooms" :key="room.id">
                  <div
                    v-if="sub === 'monthly'"
                    class="s-relative s-overflow-hidden s-mb-7"
                  >
                    <div
                      class="s-z-[2] sm:s-sticky s-top-0 s-bg-white s-cursor-pointer s-w-full s-flex s-justify-between s-items-center s-px-5 s-py-2 s-border s-border-solid s-border-[#D5D9EF] s-rounded-[8px]"
                      @click="toggle(room.id)"
                    >
                      <p class="s-font-bold s-text-[#222228] s-text-sm">
                        {{ room.name }}
                      </p>
                      <ChevronDownIcon
                        :class="{
                          's-transform s-rotate-180 s-duration-200':
                            show.includes(room.id),
                        }"
                      />
                    </div>
                    <transition name="slide" mode="out-in">
                      <div
                        v-if="show.includes(room.id)"
                        class="s-bg-white s-z-[5] s-px-3 s-pt-7"
                      >
                        <template v-for="price in room.prices">
                          <div
                            v-if="
                              price.sub_plan === 'monthly' &&
                              price.listing_type === 'shared'
                            "
                            :key="price.id"
                            class="s-flex s-flex-col sm:s-flex-row sm:s-justify-between"
                          >
                            <div class="s-mb-11 sm:s-mb-0">
                              <p
                                class="s-font-semibold s-text-sm s-leading-6 s-mb-2"
                              >
                                Total cost
                              </p>
                              <h2
                                class="s-font-semibold s-text-5"
                                v-html="
                                  convertToCurrency(
                                    +price.amount +
                                      +price.service_charge +
                                      +price.securityDeposit -
                                      +price.amount *
                                        (+price.percentageDiscount / 100)
                                  )
                                "
                              ></h2>
                            </div>
                            <div>
                              <h2 class="s-font-bold s-text-4 s-mb-2.5">
                                Cost Breakdown
                              </h2>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Rent - ' + convertToCurrency(price.amount)
                                "
                              ></p>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Total Service Charge - ' +
                                  convertToCurrency(price.service_charge)
                                "
                              ></p>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Security Deposit - ' +
                                  convertToCurrency(price.securityDeposit)
                                "
                              ></p>
                              <p class="s-text-sm s-font-normal">
                                Discount - {{ price.percentageDiscount }}%
                              </p>
                            </div>
                          </div>
                        </template>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
              <div v-if="quarterly" class="s-text-[#222228]">
                <div v-for="room in rooms" :key="room.id">
                  <div
                    v-if="sub === 'quarterly'"
                    class="s-relative s-overflow-hidden s-mb-7"
                  >
                    <div
                      class="s-z-[2] sm:s-sticky s-top-0 s-bg-white s-cursor-pointer s-w-full s-flex s-justify-between s-items-center s-px-5 s-py-2 s-border s-border-solid s-border-[#D5D9EF] s-rounded-[8px]"
                      @click="toggle(room.id)"
                    >
                      <p class="s-font-bold s-text-[#222228] s-text-sm">
                        {{ room.name }}
                      </p>
                      <ChevronDownIcon
                        :class="{
                          's-transform s-rotate-180 s-duration-200':
                            show.includes(room.id),
                        }"
                      />
                    </div>
                    <transition name="slide" mode="out-in">
                      <div
                        v-if="show.includes(room.id)"
                        class="s-bg-white s-z-[5] s-px-3 s-pt-7"
                      >
                        <template v-for="price in room.prices">
                          <div
                            v-if="
                              price.sub_plan === 'quarterly' &&
                              price.listing_type === 'shared'
                            "
                            :key="price.id"
                            class="s-flex s-flex-col sm:s-flex-row sm:s-justify-between"
                          >
                            <div class="s-mb-11 sm:s-mb-0">
                              <p
                                class="s-font-semibold s-text-sm s-leading-6 s-mb-2"
                              >
                                Total cost
                              </p>
                              <h2
                                class="s-font-semibold s-text-5"
                                v-html="
                                  convertToCurrency(
                                    +price.amount +
                                      +price.service_charge +
                                      +price.securityDeposit -
                                      +price.amount *
                                        (+price.percentageDiscount / 100)
                                  )
                                "
                              ></h2>
                            </div>
                            <div>
                              <h2 class="s-font-bold s-text-4 s-mb-2.5">
                                Cost Breakdown
                              </h2>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Rent - ' + convertToCurrency(price.amount)
                                "
                              ></p>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Total Service Charge - ' +
                                  convertToCurrency(price.service_charge)
                                "
                              ></p>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Security Deposit - ' +
                                  convertToCurrency(price.securityDeposit)
                                "
                              ></p>
                              <p class="s-text-sm s-font-normal">
                                Discount - {{ price.percentageDiscount }}%
                              </p>
                            </div>
                          </div>
                        </template>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
              <div v-if="biannually" class="s-text-[#222228]">
                <div v-for="room in rooms" :key="room.id">
                  <div
                    v-if="sub === 'biannual'"
                    class="s-relative s-overflow-hidden s-mb-7"
                  >
                    <div
                      class="s-z-[2] sm:s-sticky s-top-0 s-bg-white s-cursor-pointer s-w-full s-flex s-justify-between s-items-center s-px-5 s-py-2 s-border s-border-solid s-border-[#D5D9EF] s-rounded-[8px]"
                      @click="toggle(room.id)"
                    >
                      <p class="s-font-bold s-text-[#222228] s-text-sm">
                        {{ room.name }}
                      </p>
                      <ChevronDownIcon
                        :class="{
                          's-transform s-rotate-180 s-duration-200':
                            show.includes(room.id),
                        }"
                      />
                    </div>
                    <transition name="slide" mode="out-in">
                      <div
                        v-if="show.includes(room.id)"
                        class="s-bg-white s-z-[5] s-px-3 s-pt-7"
                      >
                        <template v-for="price in room.prices">
                          <div
                            v-if="price.sub_plan === 'biannual'"
                            :key="price.id"
                            class="s-flex s-flex-col sm:s-flex-row sm:s-justify-between"
                          >
                            <div class="s-mb-11 sm:s-mb-0">
                              <p
                                class="s-font-semibold s-text-sm s-leading-6 s-mb-2"
                              >
                                Total cost
                              </p>
                              <h2
                                class="s-font-semibold s-text-5"
                                v-html="
                                  convertToCurrency(
                                    +price.amount +
                                      +price.service_charge +
                                      +price.securityDeposit -
                                      +price.amount *
                                        (+price.percentageDiscount / 100)
                                  )
                                "
                              ></h2>
                            </div>
                            <div>
                              <h2 class="s-font-bold s-text-4 s-mb-2.5">
                                Cost Breakdown
                              </h2>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Rent - ' + convertToCurrency(price.amount)
                                "
                              ></p>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Total Service Charge - ' +
                                  convertToCurrency(price.service_charge)
                                "
                              ></p>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Security Deposit - ' +
                                  convertToCurrency(price.securityDeposit)
                                "
                              ></p>
                              <p class="s-text-sm s-font-normal">
                                Discount - {{ price.percentageDiscount }}%
                              </p>
                            </div>
                          </div>
                        </template>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
              <div v-if="yearly" class="s-text-[#222228]">
                <div v-for="room in rooms" :key="room.id">
                  <div
                    v-if="sub === 'yearly'"
                    class="s-relative s-overflow-hidden s-mb-7"
                  >
                    <div
                      class="s-z-[2] sm:s-sticky s-top-0 s-bg-white s-cursor-pointer s-w-full s-flex s-justify-between s-items-center s-px-5 s-py-2 s-border s-border-solid s-border-[#D5D9EF] s-rounded-[8px]"
                      @click="toggle(room.id)"
                    >
                      <p class="s-font-bold s-text-[#222228] s-text-sm">
                        {{ room.name }}
                      </p>
                      <ChevronDownIcon
                        :class="{
                          's-transform s-rotate-180 s-duration-200':
                            show.includes(room.id),
                        }"
                      />
                    </div>
                    <transition name="slide" mode="out-in">
                      <div
                        v-if="show.includes(room.id)"
                        class="s-bg-white s-z-[5] s-px-3 s-pt-7"
                      >
                        <template v-for="price in room.prices">
                          <div
                            v-if="
                              price.sub_plan === 'yearly' &&
                              price.listing_type === 'shared'
                            "
                            :key="price.id"
                            class="s-flex s-flex-col sm:s-flex-row sm:s-justify-between"
                          >
                            <div class="s-mb-11 sm:s-mb-0">
                              <p
                                class="s-font-semibold s-text-sm s-leading-6 s-mb-2"
                              >
                                Total cost
                              </p>
                              <h2
                                class="s-font-semibold s-text-5"
                                v-html="
                                  convertToCurrency(
                                    +price.amount +
                                      +price.service_charge +
                                      +price.securityDeposit -
                                      +price.amount *
                                        (+price.percentageDiscount / 100)
                                  )
                                "
                              ></h2>
                            </div>
                            <div>
                              <h2 class="s-font-bold s-text-4 s-mb-2.5">
                                Cost Breakdown
                              </h2>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Rent - ' + convertToCurrency(+price.amount)
                                "
                              ></p>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Total Service Charge - ' +
                                  convertToCurrency(price.service_charge)
                                "
                              ></p>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Security Deposit - ' +
                                  convertToCurrency(price.securityDeposit)
                                "
                              ></p>
                              <p class="s-text-sm s-font-normal">
                                Discount - {{ price.percentageDiscount }}%
                              </p>
                            </div>
                          </div>
                        </template>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="listingType === 'both'">
            <div class="s-hidden sm:s-block">
              <tabs>
                <div class="s-mt-9">
                  <tab v-if="monthly" title="Monthly">
                    <div class="s-text-[#222228] s-px-4 s-mb-11">
                      <div class="s-mb-11">
                        <p class="s-font-semibold s-text-sm s-leading-6 s-mb-2">
                          Total cost
                        </p>
                        <h2
                          class="s-font-semibold s-text-5"
                          v-html="
                            convertToCurrency(
                              +monthlyEntire.amount +
                                +monthlyEntire.service_charge +
                                +monthlyEntire.securityDeposit -
                                +monthlyEntire.amount *
                                  (+monthlyEntire.percentageDiscount / 100)
                            )
                          "
                        ></h2>
                      </div>
                      <div>
                        <h2 class="s-font-bold s-text-4 s-mb-2.5">
                          Cost Breakdown
                        </h2>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Rent - ' + convertToCurrency(monthlyEntire.amount)
                          "
                        ></p>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Total Service Charge - ' +
                            convertToCurrency(monthlyEntire.service_charge)
                          "
                        ></p>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Security Deposit - ' +
                            convertToCurrency(monthlyEntire.securityDeposit)
                          "
                        ></p>
                        <p class="s-text-sm s-font-normal">
                          Discount - {{ monthlyEntire.percentageDiscount }}%
                        </p>
                      </div>
                    </div>

                    <div class="s-text-[#222228] s-px-4">
                      <div v-for="room in rooms" :key="room.id">
                        <div class="s-relative s-overflow-hidden s-mb-7">
                          <div
                            class="s-z-[2] sm:s-sticky s-top-0 s-bg-white s-cursor-pointer s-w-full s-flex s-justify-between s-items-center s-px-5 s-py-2 s-border s-border-solid s-border-[#D5D9EF] s-rounded-[8px]"
                            @click="toggle(room.id)"
                          >
                            <p class="s-font-bold s-text-[#222228] s-text-sm">
                              {{ room.name }}
                            </p>
                            <ChevronDownIcon
                              :class="{
                                's-transform s-rotate-180 s-duration-200':
                                  show.includes(room.id),
                              }"
                            />
                          </div>
                          <transition name="slide" mode="out-in">
                            <div
                              v-if="show.includes(room.id)"
                              class="s-bg-white s-z-[5] s-px-3 s-pt-7"
                            >
                              <template v-for="price in room.prices">
                                <div
                                  v-if="price.sub_plan === 'monthly'"
                                  :key="price.id"
                                  class="s-flex s-flex-col sm:s-flex-row sm:s-justify-between"
                                >
                                  <div class="s-mb-11 sm:s-mb-0">
                                    <p
                                      class="s-font-semibold s-text-sm s-leading-6 s-mb-2"
                                    >
                                      Total cost
                                    </p>
                                    <h2
                                      class="s-font-semibold s-text-5"
                                      v-html="
                                        convertToCurrency(
                                          +price.amount +
                                            +price.service_charge +
                                            +price.securityDeposit -
                                            +price.amount *
                                              (+price.percentageDiscount / 100)
                                        )
                                      "
                                    ></h2>
                                  </div>
                                  <div>
                                    <h2 class="s-font-bold s-text-4 s-mb-2.5">
                                      Cost Breakdown
                                    </h2>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Rent - ' +
                                        convertToCurrency(price.amount)
                                      "
                                    ></p>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Total Service Charge - ' +
                                        convertToCurrency(price.service_charge)
                                      "
                                    ></p>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Security Deposit - ' +
                                        convertToCurrency(price.securityDeposit)
                                      "
                                    ></p>
                                    <p class="s-text-sm s-font-normal">
                                      Discount - {{ price.percentageDiscount }}%
                                    </p>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </transition>
                        </div>
                      </div>
                    </div>
                  </tab>
                  <tab v-if="quarterly" title="Quarterly">
                    <div class="s-text-[#222228] s-px-4 s-mb-11">
                      <div class="s-mb-11">
                        <p class="s-font-semibold s-text-sm s-leading-6 s-mb-2">
                          Total cost
                        </p>
                        <h2
                          class="s-font-semibold s-text-5"
                          v-html="
                            convertToCurrency(
                              +quarterlyEntire.amount +
                                +quarterlyEntire.service_charge +
                                +quarterlyEntire.securityDeposit -
                                +quarterlyEntire.amount *
                                  (+quarterlyEntire.percentageDiscount / 100)
                            )
                          "
                        ></h2>
                      </div>
                      <div>
                        <h2 class="s-font-bold s-text-4 s-mb-2.5">
                          Cost Breakdown
                        </h2>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Rent - ' +
                            convertToCurrency(quarterlyEntire.amount)
                          "
                        ></p>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Total Service Charge - ' +
                            convertToCurrency(quarterlyEntire.service_charge)
                          "
                        ></p>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Security Deposit - ' +
                            convertToCurrency(quarterlyEntire.securityDeposit)
                          "
                        ></p>
                        <p class="s-text-sm s-font-normal">
                          Discount - {{ quarterlyEntire.percentageDiscount }}%
                        </p>
                      </div>
                    </div>
                    <div class="s-text-[#222228] s-px-4">
                      <div v-for="room in rooms" :key="room.id">
                        <div class="s-relative s-overflow-hidden s-mb-7">
                          <div
                            class="s-z-[2] sm:s-sticky s-top-0 s-bg-white s-cursor-pointer s-w-full s-flex s-justify-between s-items-center s-px-5 s-py-2 s-border s-border-solid s-border-[#D5D9EF] s-rounded-[8px]"
                            @click="toggle(room.id)"
                          >
                            <p class="s-font-bold s-text-[#222228] s-text-sm">
                              {{ room.name }}
                            </p>
                            <ChevronDownIcon
                              :class="{
                                's-transform s-rotate-180 s-duration-200':
                                  show.includes(room.id),
                              }"
                            />
                          </div>
                          <transition name="slide" mode="out-in">
                            <div
                              v-if="show.includes(room.id)"
                              class="s-bg-white s-z-[5] s-px-3 s-pt-7"
                            >
                              <template v-for="price in room.prices">
                                <div
                                  v-if="price.sub_plan === 'quarterly'"
                                  :key="price.id"
                                  class="s-flex s-flex-col sm:s-flex-row sm:s-justify-between"
                                >
                                  <div class="s-mb-11 sm:s-mb-0">
                                    <p
                                      class="s-font-semibold s-text-sm s-leading-6 s-mb-2"
                                    >
                                      Total cost
                                    </p>
                                    <h2
                                      class="s-font-semibold s-text-5"
                                      v-html="
                                        convertToCurrency(
                                          +price.amount +
                                            +price.service_charge +
                                            +price.securityDeposit -
                                            +price.amount *
                                              (+price.percentageDiscount / 100)
                                        )
                                      "
                                    ></h2>
                                  </div>
                                  <div>
                                    <h2 class="s-font-bold s-text-4 s-mb-2.5">
                                      Cost Breakdown
                                    </h2>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Rent - ' +
                                        convertToCurrency(price.amount)
                                      "
                                    ></p>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Total Service Charge - ' +
                                        convertToCurrency(price.service_charge)
                                      "
                                    ></p>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Security Deposit - ' +
                                        convertToCurrency(price.securityDeposit)
                                      "
                                    ></p>
                                    <p class="s-text-sm s-font-normal">
                                      Discount - {{ price.percentageDiscount }}%
                                    </p>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </transition>
                        </div>
                      </div>
                    </div>
                  </tab>
                  <tab v-if="biannually" title="Biannual">
                    <div class="s-text-[#222228] s-px-4 s-mb-11">
                      <div class="s-mb-11">
                        <p class="s-font-semibold s-text-sm s-leading-6 s-mb-2">
                          Total cost
                        </p>
                        <h2
                          class="s-font-semibold s-text-5"
                          v-html="
                            convertToCurrency(
                              +biannualEntire.amount +
                                +biannualEntire.service_charge +
                                +biannualEntire.securityDeposit -
                                +biannualEntire.amount *
                                  (+biannualEntire.percentageDiscount / 100)
                            )
                          "
                        ></h2>
                      </div>
                      <div>
                        <h2 class="s-font-bold s-text-4 s-mb-2.5">
                          Cost Breakdown
                        </h2>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Rent - ' + convertToCurrency(biannualEntire.amount)
                          "
                        ></p>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Total Service Charge - ' +
                            convertToCurrency(biannualEntire.service_charge)
                          "
                        ></p>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Security Deposit - ' +
                            convertToCurrency(biannualEntire.securityDeposit)
                          "
                        ></p>
                        <p class="s-text-sm s-font-normal">
                          Discount - {{ biannualEntire.percentageDiscount }}%
                        </p>
                      </div>
                    </div>
                    <div class="s-text-[#222228] s-px-4">
                      <div v-for="room in rooms" :key="room.id">
                        <div class="s-relative s-overflow-hidden s-mb-7">
                          <div
                            class="s-z-[2] sm:s-sticky s-top-0 s-bg-white s-cursor-pointer s-w-full s-flex s-justify-between s-items-center s-px-5 s-py-2 s-border s-border-solid s-border-[#D5D9EF] s-rounded-[8px]"
                            @click="toggle(room.id)"
                          >
                            <p class="s-font-bold s-text-[#222228] s-text-sm">
                              {{ room.name }}
                            </p>
                            <ChevronDownIcon
                              :class="{
                                's-transform s-rotate-180 s-duration-200':
                                  show.includes(room.id),
                              }"
                            />
                          </div>
                          <transition name="slide" mode="out-in">
                            <div
                              v-if="show.includes(room.id)"
                              class="s-bg-white s-z-[5] s-px-3 s-pt-7"
                            >
                              <template v-for="price in room.prices">
                                <div
                                  v-if="price.sub_plan === 'biannual'"
                                  :key="price.id"
                                  class="s-flex s-flex-col sm:s-flex-row sm:s-justify-between"
                                >
                                  <div class="s-mb-11 sm:s-mb-0">
                                    <p
                                      class="s-font-semibold s-text-sm s-leading-6 s-mb-2"
                                    >
                                      Total cost
                                    </p>
                                    <h2
                                      class="s-font-semibold s-text-5"
                                      v-html="
                                        convertToCurrency(
                                          +price.amount +
                                            +price.service_charge +
                                            +price.securityDeposit -
                                            +price.amount *
                                              (+price.percentageDiscount / 100)
                                        )
                                      "
                                    ></h2>
                                  </div>
                                  <div>
                                    <h2 class="s-font-bold s-text-4 s-mb-2.5">
                                      Cost Breakdown
                                    </h2>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Rent - ' +
                                        convertToCurrency(price.amount)
                                      "
                                    ></p>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Total Service Charge - ' +
                                        convertToCurrency(price.service_charge)
                                      "
                                    ></p>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Security Deposit - ' +
                                        convertToCurrency(price.securityDeposit)
                                      "
                                    ></p>
                                    <p class="s-text-sm s-font-normal">
                                      Discount - {{ price.percentageDiscount }}%
                                    </p>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </transition>
                        </div>
                      </div>
                    </div>
                  </tab>
                  <tab v-if="yearly" title="Annually">
                    <div class="s-text-[#222228] s-px-4 s-mb-11">
                      <div class="s-mb-11">
                        <p class="s-font-semibold s-text-sm s-leading-6 s-mb-2">
                          Total cost
                        </p>
                        <h2
                          class="s-font-semibold s-text-5"
                          v-html="
                            convertToCurrency(
                              +yearlyEntire.amount +
                                +yearlyEntire.service_charge +
                                +yearlyEntire.securityDeposit -
                                +yearlyEntire.amount *
                                  (+yearlyEntire.percentageDiscount / 100)
                            )
                          "
                        ></h2>
                      </div>
                      <div>
                        <h2 class="s-font-bold s-text-4 s-mb-2.5">
                          Cost Breakdown
                        </h2>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Rent - ' + convertToCurrency(yearlyEntire.amount)
                          "
                        ></p>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Total Service Charge - ' +
                            convertToCurrency(yearlyEntire.service_charge)
                          "
                        ></p>
                        <p
                          class="s-text-sm s-font-normal s-mb-4"
                          v-html="
                            'Security Deposit - ' +
                            convertToCurrency(yearlyEntire.securityDeposit)
                          "
                        ></p>
                        <p class="s-text-sm s-font-normal">
                          Discount - {{ yearlyEntire.percentageDiscount }}%
                        </p>
                      </div>
                    </div>
                    <div class="s-text-[#222228] s-px-4">
                      <div v-for="room in rooms" :key="room.id">
                        <div class="s-relative s-overflow-hidden s-mb-7">
                          <div
                            class="s-z-[2] sm:s-sticky s-top-0 s-bg-white s-cursor-pointer s-w-full s-flex s-justify-between s-items-center s-px-5 s-py-2 s-border s-border-solid s-border-[#D5D9EF] s-rounded-[8px]"
                            @click="toggle(room.id)"
                          >
                            <p class="s-font-bold s-text-[#222228] s-text-sm">
                              {{ room.name }}
                            </p>
                            <ChevronDownIcon
                              :class="{
                                's-transform s-rotate-180 s-duration-200':
                                  show.includes(room.id),
                              }"
                            />
                          </div>
                          <transition name="slide" mode="out-in">
                            <div
                              v-if="show.includes(room.id)"
                              class="s-bg-white s-z-[5] s-px-3 s-pt-7"
                            >
                              <template v-for="price in room.prices">
                                <div
                                  v-if="price.sub_plan === 'yearly'"
                                  :key="price.id"
                                  class="s-flex s-flex-col sm:s-flex-row sm:s-justify-between"
                                >
                                  <div class="s-mb-11 sm:s-mb-0">
                                    <p
                                      class="s-font-semibold s-text-sm s-leading-6 s-mb-2"
                                    >
                                      Total cost
                                    </p>
                                    <h2
                                      class="s-font-semibold s-text-5"
                                      v-html="
                                        convertToCurrency(
                                          +price.amount +
                                            +price.service_charge +
                                            +price.securityDeposit -
                                            +price.amount *
                                              (+price.percentageDiscount / 100)
                                        )
                                      "
                                    ></h2>
                                  </div>
                                  <div>
                                    <h2 class="s-font-bold s-text-4 s-mb-2.5">
                                      Cost Breakdown
                                    </h2>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Rent - ' +
                                        convertToCurrency(price.amount)
                                      "
                                    ></p>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Total Service Charge - ' +
                                        convertToCurrency(price.service_charge)
                                      "
                                    ></p>
                                    <p
                                      class="s-text-sm s-font-normal s-mb-4"
                                      v-html="
                                        'Security Deposit - ' +
                                        convertToCurrency(price.securityDeposit)
                                      "
                                    ></p>
                                    <p class="s-text-sm s-font-normal">
                                      Discount - {{ price.percentageDiscount }}%
                                    </p>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </transition>
                        </div>
                      </div>
                    </div>
                  </tab>
                </div>
              </tabs>
            </div>
            <div class="sm:s-hidden s-mb-10">
              <h2 class="s-text-[#000000] s-text-[20px] s-font-bold s-mb-4">
                Review Subscriptions
              </h2>
              <Select
                :class="'s-mr-6 md:s-mr-8 s-w-full'"
                name="cleaningService"
                default-text="Select Option"
                :options="subcriptionPlan"
                no-margin-bottom
                :value="sub"
                @update="(value) => (sub = value)"
              />
              <div class="s-text-[#222228] s-mt-7 s-px-4 s-mb-10">
                <div class="s-mb-11">
                  <p class="s-font-semibold s-text-sm s-leading-6 s-mb-2">
                    Total cost
                  </p>
                  <h2
                    class="s-font-semibold s-text-5"
                    v-html="
                      convertToCurrency(
                        +EntireMobile.amount +
                          +EntireMobile.service_charge +
                          +EntireMobile.securityDeposit -
                          +EntireMobile.amount *
                            (+EntireMobile.percentageDiscount / 100)
                      )
                    "
                  ></h2>
                </div>
                <div>
                  <h2 class="s-font-bold s-text-4 s-mb-2.5">Cost Breakdown</h2>
                  <p
                    class="s-text-sm s-font-normal s-mb-4"
                    v-html="'Rent - ' + convertToCurrency(EntireMobile.amount)"
                  ></p>
                  <p
                    class="s-text-sm s-font-normal s-mb-4"
                    v-html="
                      'Total Service Charge - ' +
                      convertToCurrency(EntireMobile.amount)
                    "
                  ></p>
                  <p
                    class="s-text-sm s-font-normal s-mb-4"
                    v-html="
                      'Security Deposit - ' +
                      convertToCurrency(EntireMobile.securityDeposit)
                    "
                  ></p>
                  <p class="s-text-sm s-font-normal">
                    Discount - {{ EntireMobile.percentageDiscount }}%
                  </p>
                </div>
              </div>
              <div v-if="monthly" class="s-text-[#222228]">
                <div v-for="room in rooms" :key="room.id">
                  <div
                    v-if="sub === 'monthly'"
                    class="s-relative s-overflow-hidden s-mb-7"
                  >
                    <div
                      class="s-z-[2] sm:s-sticky s-top-0 s-bg-white s-cursor-pointer s-w-full s-flex s-justify-between s-items-center s-px-5 s-py-2 s-border s-border-solid s-border-[#D5D9EF] s-rounded-[8px]"
                      @click="toggle(room.id)"
                    >
                      <p class="s-font-bold s-text-[#222228] s-text-sm">
                        {{ room.name }}
                      </p>
                      <ChevronDownIcon
                        :class="{
                          's-transform s-rotate-180 s-duration-200':
                            show.includes(room.id),
                        }"
                      />
                    </div>
                    <transition name="slide" mode="out-in">
                      <div
                        v-if="show.includes(room.id)"
                        class="s-bg-white s-z-[5] s-px-3 s-pt-7"
                      >
                        <template v-for="price in room.prices">
                          <div
                            v-if="price.sub_plan === 'monthly'"
                            :key="price.id"
                            class="s-flex s-flex-col sm:s-flex-row sm:s-justify-between"
                          >
                            <div class="s-mb-11 sm:s-mb-0">
                              <p
                                class="s-font-semibold s-text-sm s-leading-6 s-mb-2"
                              >
                                Total cost
                              </p>
                              <h2
                                class="s-font-semibold s-text-5"
                                v-html="
                                  convertToCurrency(
                                    +price.amount +
                                      +price.service_charge +
                                      +price.securityDeposit -
                                      +price.amount *
                                        (+price.percentageDiscount / 100)
                                  )
                                "
                              ></h2>
                            </div>
                            <div>
                              <h2 class="s-font-bold s-text-4 s-mb-2.5">
                                Cost Breakdown
                              </h2>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Rent - ' + convertToCurrency(price.amount)
                                "
                              ></p>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Total Service Charge - ' +
                                  convertToCurrency(price.service_charge)
                                "
                              ></p>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Security Deposit - ' +
                                  convertToCurrency(price.securityDeposit)
                                "
                              ></p>
                              <p class="s-text-sm s-font-normal">
                                Discount - {{ price.percentageDiscount }}%
                              </p>
                            </div>
                          </div>
                        </template>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
              <div v-if="quarterly" class="s-text-[#222228]">
                <div v-for="room in rooms" :key="room.id">
                  <div
                    v-if="sub === 'quarterly'"
                    class="s-relative s-overflow-hidden s-mb-7"
                  >
                    <div
                      class="s-z-[2] sm:s-sticky s-top-0 s-bg-white s-cursor-pointer s-w-full s-flex s-justify-between s-items-center s-px-5 s-py-2 s-border s-border-solid s-border-[#D5D9EF] s-rounded-[8px]"
                      @click="toggle(room.id)"
                    >
                      <p class="s-font-bold s-text-[#222228] s-text-sm">
                        {{ room.name }}
                      </p>
                      <ChevronDownIcon
                        :class="{
                          's-transform s-rotate-180 s-duration-200':
                            show.includes(room.id),
                        }"
                      />
                    </div>
                    <transition name="slide" mode="out-in">
                      <div
                        v-if="show.includes(room.id)"
                        class="s-bg-white s-z-[5] s-px-3 s-pt-7"
                      >
                        <template v-for="price in room.prices">
                          <div
                            v-if="price.sub_plan === 'quarterly'"
                            :key="price.id"
                            class="s-flex s-flex-col sm:s-flex-row sm:s-justify-between"
                          >
                            <div class="s-mb-11 sm:s-mb-0">
                              <p
                                class="s-font-semibold s-text-sm s-leading-6 s-mb-2"
                              >
                                Total cost
                              </p>
                              <h2
                                class="s-font-semibold s-text-5"
                                v-html="
                                  convertToCurrency(
                                    +price.amount +
                                      +price.service_charge +
                                      +price.securityDeposit -
                                      +price.amount *
                                        (+price.percentageDiscount / 100)
                                  )
                                "
                              ></h2>
                            </div>
                            <div>
                              <h2 class="s-font-bold s-text-4 s-mb-2.5">
                                Cost Breakdown
                              </h2>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Rent - ' + convertToCurrency(price.amount)
                                "
                              ></p>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Total Service Charge - ' +
                                  convertToCurrency(price.service_charge)
                                "
                              ></p>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Security Deposit - ' +
                                  convertToCurrency(price.securityDeposit)
                                "
                              ></p>
                              <p class="s-text-sm s-font-normal">
                                Discount - {{ price.percentageDiscount }}%
                              </p>
                            </div>
                          </div>
                        </template>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
              <div v-if="biannually" class="s-text-[#222228]">
                <div v-for="room in rooms" :key="room.id">
                  <div
                    v-if="sub === 'biannual'"
                    class="s-relative s-overflow-hidden s-mb-7"
                  >
                    <div
                      class="s-z-[2] sm:s-sticky s-top-0 s-bg-white s-cursor-pointer s-w-full s-flex s-justify-between s-items-center s-px-5 s-py-2 s-border s-border-solid s-border-[#D5D9EF] s-rounded-[8px]"
                      @click="toggle(room.id)"
                    >
                      <p class="s-font-bold s-text-[#222228] s-text-sm">
                        {{ room.name }}
                      </p>
                      <ChevronDownIcon
                        :class="{
                          's-transform s-rotate-180 s-duration-200':
                            show.includes(room.id),
                        }"
                      />
                    </div>
                    <transition name="slide" mode="out-in">
                      <div
                        v-if="show.includes(room.id)"
                        class="s-bg-white s-z-[5] s-px-3 s-pt-7"
                      >
                        <template v-for="price in room.prices">
                          <div
                            v-if="price.sub_plan === 'biannual'"
                            :key="price.id"
                            class="s-flex s-flex-col sm:s-flex-row sm:s-justify-between"
                          >
                            <div class="s-mb-11 sm:s-mb-0">
                              <p
                                class="s-font-semibold s-text-sm s-leading-6 s-mb-2"
                              >
                                Total cost
                              </p>
                              <h2
                                class="s-font-semibold s-text-5"
                                v-html="
                                  convertToCurrency(
                                    +price.amount +
                                      +price.service_charge +
                                      +price.securityDeposit -
                                      +price.amount *
                                        (+price.percentageDiscount / 100)
                                  )
                                "
                              ></h2>
                            </div>
                            <div>
                              <h2 class="s-font-bold s-text-4 s-mb-2.5">
                                Cost Breakdown
                              </h2>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Rent - ' + convertToCurrency(price.amount)
                                "
                              ></p>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Total Service Charge - ' +
                                  convertToCurrency(price.service_charge)
                                "
                              ></p>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Security Deposit - ' +
                                  convertToCurrency(price.securityDeposit)
                                "
                              ></p>
                              <p class="s-text-sm s-font-normal">
                                Discount - {{ price.percentageDiscount }}%
                              </p>
                            </div>
                          </div>
                        </template>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
              <div v-if="yearly" class="s-text-[#222228]">
                <div v-for="room in rooms" :key="room.id">
                  <div
                    v-if="sub === 'yearly'"
                    class="s-relative s-overflow-hidden s-mb-7"
                  >
                    <div
                      class="s-z-[2] sm:s-sticky s-top-0 s-bg-white s-cursor-pointer s-w-full s-flex s-justify-between s-items-center s-px-5 s-py-2 s-border s-border-solid s-border-[#D5D9EF] s-rounded-[8px]"
                      @click="toggle(room.id)"
                    >
                      <p class="s-font-bold s-text-[#222228] s-text-sm">
                        {{ room.name }}
                      </p>
                      <ChevronDownIcon
                        :class="{
                          's-transform s-rotate-180 s-duration-200':
                            show.includes(room.id),
                        }"
                      />
                    </div>
                    <transition name="slide" mode="out-in">
                      <div
                        v-if="show.includes(room.id)"
                        class="s-bg-white s-z-[5] s-px-3 s-pt-7"
                      >
                        <template v-for="price in room.prices">
                          <div
                            v-if="price.sub_plan === 'yearly'"
                            :key="price.id"
                            class="s-flex s-flex-col sm:s-flex-row sm:s-justify-between"
                          >
                            <div class="s-mb-11 sm:s-mb-0">
                              <p
                                class="s-font-semibold s-text-sm s-leading-6 s-mb-2"
                              >
                                Total costs
                              </p>
                              <h2
                                class="s-font-semibold s-text-5"
                                v-html="
                                  convertToCurrency(
                                    +price.amount +
                                      +price.service_charge +
                                      +price.securityDeposit -
                                      +price.amount *
                                        (+price.percentageDiscount / 100)
                                  )
                                "
                              ></h2>
                            </div>
                            <div>
                              <h2 class="s-font-bold s-text-4 s-mb-2.5">
                                Cost Breakdown
                              </h2>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Rent - ' + convertToCurrency(price.amount)
                                "
                              ></p>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Total Service Charge - ' +
                                  convertToCurrency(price.service_charge)
                                "
                              ></p>
                              <p
                                class="s-text-sm s-font-normal s-mb-4"
                                v-html="
                                  'Security Deposit - ' +
                                  convertToCurrency(price.securityDeposit)
                                "
                              ></p>
                              <p class="s-text-sm s-font-normal">
                                Discount - {{ price.percentageDiscount }}%
                              </p>
                            </div>
                          </div>
                        </template>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            :show="publishModal"
            modal-classes="s-px-[1.75rem] sm:s-px-[2.75rem]"
            @close="publishModal = false"
          >
            <div>
              <h2
                class="s-mb-1 s-font-bold s-text-[1.25rem] s-text-[#0E0C0C] s-leading-6"
              >
                Ready to go live <span v-if="false">again</span>?
              </h2>
              <p
                class="s-max-w-[22.625rem] s-my-[1.265rem] s-w-full s-font-normal s-text-xs s-text-primary"
              >
                Resubmit your listing to be published on Spleet. It will go live
                once it’s approved. Here’s what has changed with your update.
                Please go over to make sure it’s correct.
              </p>
              <div v-if="false" class="s-mb-7">
                <div class="s-mb-7">
                  <p class="s-font-bold s-text-sm text-[#0E0C0C]">
                    Previous Details
                  </p>
                  <p
                    class="s-font-normal s-text-xs s-text-primary s-leading-6 s-mb-1"
                  >
                    Last updated 26 June, 2023
                  </p>
                  <div
                    class="s-bg-[#b1b7d647] s-border s-border-solid s-border-[#D2D0E9] s-rounded-xl s-px-5 s-py-4"
                  >
                    <p class="s-text-sm">
                      <span class="s-font-bold">Monthly Rent: </span>50,000 NGN
                    </p>
                  </div>
                </div>
                <div class="s-mb-7">
                  <p class="s-font-bold s-text-sm text-[#0E0C0C]">
                    New Details
                  </p>
                  <p
                    class="s-font-normal s-text-xs s-text-primary s-leading-6 s-mb-1"
                  >
                    Last updated few minutes ago
                  </p>
                  <div
                    class="s-bg-[#b1b7d647] s-border s-border-solid s-border-[#D2D0E9] s-rounded-xl s-px-5 s-py-4"
                  >
                    <p class="s-text-sm">
                      <span class="s-font-bold">Monthly Rent: </span>150,000 NGN
                    </p>
                  </div>
                </div>
              </div>
              <div class="s-flex s-w-full s-space-x-4">
                <Button
                  :class="'s-hidden s-grow sm:s-flex s-bg-primary-blue s-text-white s-px-3 s-py-2.5 s-font-bold'"
                  text="Submit For Review"
                  :loading="publishLoader"
                  @submit="publish"
                />
                <Button
                  :class="'sm:s-hidden s-grow s-bg-primary-blue s-text-white !s-mx-0 s-py-2.5 s-font-bold'"
                  text="Submit"
                  :loading="publishLoader"
                  @submit="publish"
                />
                <Button
                  :class="'s-mr-1.5 s-grow s-border-2 s-border-solid s-border-primary-blue !s-text-primary-blue s-py-2.5 s-px-5 s-font-bold'"
                  text="Do This Later"
                  @submit="closeModal"
                />
              </div>
            </div>
          </Modal>
        </div>
        <div
          class="border s-mt-auto s-flex s-justify-end md-s:s-hidden s-py-5 s-border-t s-border-solid s-fixed s-bottom-0 s-w-full s-pr-4 s-left-0 s-bg-white"
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
import { formatCurrencyAmount } from '../../../helpers/utils'

export default {
  data() {
    return {
      loading: false,
      loader: false,
      tabs: [],
      selectedIndex: null,
      priceBreakDown: null,
      sub: 'monthly',
      show: [],
      publishModal: false,
      publishLoader: false,
    }
  },
  computed: {
    ...mapState('host/listing', [
      'subPlan',
      'propertyListingId',
      'listingType',
    ]),
    ...mapGetters('host/listing', [
      'monthly',
      'biannually',
      'quarterly',
      'yearly',
    ]),
    ...mapState('user', ['userData']),
    subcriptionPlan() {
      return this.subPlan?.map((el) => {
        switch (el.plan) {
          case 'monthly':
            return { text: 'Monthly', value: 'monthly' }
          case 'quarterly':
            return { text: 'Quarterly', value: 'quarterly' }
          case 'biannual':
            return { text: 'Biannual', value: 'biannual' }
          case 'yearly':
            return { text: 'Annual', value: 'yearly' }
          default:
            return {}
        }
      })
    },
    rooms() {
      if (this.priceBreakDown && this.priceBreakDown.listingType === 'shared') {
        return this.priceBreakDown.prices
      } else if (
        this.priceBreakDown &&
        this.priceBreakDown.listingType === 'both'
      ) {
        return this.priceBreakDown.sharedBedroomPicing
      }
      return null
    },
    monthlyEntire() {
      if (this.priceBreakDown && this.priceBreakDown.listingType === 'entire') {
        return this.priceBreakDown.prices.find(
          (el) => el.sub_plan === 'monthly'
        )
      } else if (
        this.priceBreakDown &&
        this.priceBreakDown.listingType === 'both'
      ) {
        return this.priceBreakDown.entireListingPricing.find(
          (el) => el.sub_plan === 'monthly'
        )
      }
      return {}
    },
    quarterlyEntire() {
      if (this.priceBreakDown && this.priceBreakDown.listingType === 'entire') {
        return this.priceBreakDown.prices.find(
          (el) => el.sub_plan === 'quarterly'
        )
      } else if (
        this.priceBreakDown &&
        this.priceBreakDown.listingType === 'both'
      ) {
        return this.priceBreakDown.entireListingPricing.find(
          (el) => el.sub_plan === 'quarterly'
        )
      }
      return {}
    },
    biannualEntire() {
      if (this.priceBreakDown && this.priceBreakDown.listingType === 'entire') {
        return this.priceBreakDown.prices.find(
          (el) => el.sub_plan === 'biannual'
        )
      } else if (
        this.priceBreakDown &&
        this.priceBreakDown.listingType === 'both'
      ) {
        return this.priceBreakDown.entireListingPricing.find(
          (el) => el.sub_plan === 'biannual'
        )
      }
      return {}
    },
    yearlyEntire() {
      if (this.priceBreakDown && this.priceBreakDown.listingType === 'entire') {
        return this.priceBreakDown.prices.find((el) => el.sub_plan === 'yearly')
      } else if (
        this.priceBreakDown &&
        this.priceBreakDown.listingType === 'both'
      ) {
        return this.priceBreakDown.entireListingPricing.find(
          (el) => el.sub_plan === 'yearly'
        )
      }
      return {}
    },
    EntireMobile() {
      if (this.sub === 'monthly') return this.monthlyEntire
      else if (this.sub === 'quarterly') return this.quarterlyEntire
      else if (this.sub === 'biannual') return this.biannualEntire
      else return this.yearlyEntire
    },
    kycStatus() {
      if (this.userData) {
        return this.userData.user.kycStatus
      }
      return 'none'
    },
  },
  watch: {
    propertyListingId: 'getSummary',
  },
  mounted() {
    if (this.propertyListingId) {
      this.getSummary()
    }
    this.selectTab(0)
  },
  methods: {
    ...mapActions('host/listing', [
      'getPriceSummary',
      'publishListing',
      'updateBackendMove',
    ]),
    ...mapMutations('host/listing', ['UPDATE_LEVEL', 'UPDATE_STEP']),
    async updateLevel() {
      const response = await this.updateBackendMove()
      return response
    },
    async getSummary() {
      this.loading = true
      try {
        const response = await this.getPriceSummary()
        this.loading = false
        if (response.data.statusCode === 200) {
          this.priceBreakDown = response.data.data
        }
      } catch (error) {
        this.loading = false
        this.$errorHandler(error)
      }
    },
    selectTab(i) {
      this.selectedIndex = i
      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i
      })
    },

    back() {
      this.$router.push({
        name: 'host-listing-booking',
        query: { step: 2, level: 5 },
      })
    },
    next() {
      if (this.kycStatus === 'none' || this.kycStatus === 'declined') {
        this.UPDATE_LEVEL(1)
        this.UPDATE_STEP(3)
        // this.updateLevel()
        this.$router.push(
          `/host/listing/continue-listing?id=${this.propertyListingId}`
        )
      } else if (
        this.kycStatus === 'approved' ||
        this.kycStatus === 'pending'
      ) {
        this.publishModal = true
      }
    },
    toggle(id) {
      if (!this.show.includes(id)) {
        this.show.push(id)
      } else {
        this.show = this.show.filter((showId) => showId !== id)
      }
    },
    convertToCurrency(value) {
      if (this.priceBreakDown) return formatCurrencyAmount(value, 'NGN')
      else return undefined
    },
    async publish() {
      try {
        this.publishLoader = true
        const response = await this.publishListing()
        this.publishLoader = false
        this.publishModal = false
        if (response.data.statusCode === 200) {
          this.$router.push('/host/listing')
        }
      } catch (error) {
        this.publishLoader = false
        this.$errorHandler(error)
      }
    },
    closeModal() {
      this.publishModal = false
      this.$router.push('/host/listing')
    },
  },
}
</script>

<style lang="scss" scoped></style>
