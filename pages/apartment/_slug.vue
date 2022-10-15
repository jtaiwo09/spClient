<template>
  <div class="relative s-max-w-[1440px] s-w-full s-mx-auto">
    <div v-if="loading" class="s-h-[50vh]"></div>
    <Loading v-if="loading" :class="'s-absolute'" />
    <div v-else>
      <div
        class="s-fixed s-top-[116px] s-w-full s-z-10 s-transition-all s-duration-[250]"
        :class="isSuccess ? 's-opacity-100' : 's-hidden s-opacity-0'"
      >
        <SnackBar
          :title="snackBarText"
          :background="
            staus === 'success' ? 's-bg-[#28A46E]' : 's-bg-[#f06f37]'
          "
          @close=";(isSuccess = false), (status = '')"
        />
      </div>
      <div
        class="sm:s-px-[1.875rem] md:s-px-[4.375rem] sm:s-pt-[35px] s-grid s-gap-3 s-grid-cols-[repeat(5,_minmax(auto-fill,_1fr))] s-grid-rows-[repeat(2,_minmax(auto,205px))] s-relative"
      >
        <div
          v-for="(image, index) in imageGrid.slice(0, 2)"
          :key="index"
          :style="{
            backgroundImage: `url(${image})`,
          }"
          class="grid_style sm:s-rounded-lg s-bg-cover s-cursor-pointer s-bg-no-repeat s-bg-center"
          @click="openGallery(index)"
        >
          <div class="image_overlay s-w-full s-h-full s-rounded-lg"></div>
        </div>
        <div
          v-for="(image, index) in imageGrid.slice(2)"
          :key="'second' + index"
          :style="{
            backgroundImage: `url(${image})`,
          }"
          class="grid_style sm:s-rounded-lg s-bg-cover s-cursor-pointer s-bg-no-repeat s-bg-center s-relative"
          @click="openGallery(index)"
        >
          <div class="image_overlay s-w-full s-h-full s-rounded-lg"></div>
          <button
            class="s-px-1 s-absolute s-top-0 sm:s-top-[auto] s-left-0 sm:s-left-[auto] s-right-0 s-bottom-0 s-m-auto sm:s-m-0 sm:s-right-[30px] sm:s-bottom-[18px] s-text-white s-flex s-justify-center s-items-center s-gap-2 s-w-[80%] sm:s-w-[60%] s-max-w-[178px] s-h-[48px] s-font-bold s-text-sm s-bg-[#1e1c1cb8] s-rounded-lg"
            @click="openGallery(0)"
          >
            <BrokenImageIcon />
            View all photos
          </button>
        </div>
      </div>
      <div class="s-px-0 md:s-px-[4.375rem]">
        <section
          class="s-mt-[35px] s-flex s-flex-col md-x:s-flex-row s-gap-[2.25rem]"
        >
          <div class="s-w-full md-x:s-w-[66%]">
            <div class="s-px-[1.875rem] md:s-px-0">
              <h1
                class="s-text-[2.25rem] s-font-[900] s-text-[#000628] s-leading-[3rem]"
              >
                {{ spaceName }}
              </h1>
              <p
                class="s-text-[#4B4F63] s-text-sm s-font-normal s-leading-6 s-uppercase"
              >
                {{ city }}, {{ country }}
              </p>
            </div>

            <div
              class="s-mt-[0.875rem] s-flex s-flex-wrap s-gap-y-2 s-items-center s-text-[#4B4F63] s-text-sm s-pb-8 s-border-b s-border-solid s-border-[#d0d0d075]"
            >
              <div
                class="s-px-[1.875rem] md:s-px-0 s-flex s-flex-wrap s-items-center"
              >
                <div class="s-flex s-items-center">
                  <span>{{ numberBedroom + ' bed(s)' }}</span>
                  <span
                    v-show="numberBedroom"
                    class="s-w-[3px] s-h-[3px] s-rounded-full s-bg-[#4B4F63] s-mx-6"
                  ></span>
                </div>
                <span>{{ spaceType | capitalize }} space</span>
                <span
                  v-show="bathroomType"
                  class="s-w-[3px] s-h-[3px] s-rounded-full s-bg-[#4B4F63] s-mx-6"
                ></span>
                <span v-show="bathroomType"
                  >{{ bathroomType | capitalize }} bathroom</span
                >
                <span
                  class="s-w-[3px] s-h-[3px] s-rounded-full s-bg-[#4B4F63] s-mx-6"
                ></span>
                <span>{{ powerDuration + ' hrs power' }}</span>
                <span
                  class="s-w-[3px] s-h-[3px] s-rounded-full s-bg-[#4B4F63] s-mx-6"
                ></span>
                <span>{{ furnishStatus }}</span>
              </div>
            </div>
            <div
              v-if="subType === 'RLS' && availability"
              class="s-px-[1.875rem] md:s-px-0 s-mt-3 s-flex s-gap-x-[3.5rem] s-gap-y-2 s-flex-wrap s-pb-4 s-border-b s-border-solid s-border-[#d0d0d075]"
            >
              <p class="s-text-[#4B4F63] s-text-sm s-font-semibold s-uppercase">
                APARTMENT AVAILABLE UNTIL
              </p>
              <p class="s-font-bold s-text-[#130F26]">{{ availability }}</p>
            </div>
            <!-- mobile -->
            <div class="s-px-[1.875rem]">
              <div
                class="md-x:s-hidden s-mx-auto s-mt-[2.375rem] s-border-[1.5px] s-border-solid s-border-[#E0DEF7] s-bg-white s-rounded-lg s-px-[1.125rem] sm:s-px-[2.25rem] s-pt-8 s-pb-6 s-w-full s-max-w-[28.5rem] s-h-fit"
              >
                <p class="s-font-semibold s-text-sm s-text-[#000929] s-mb-1">
                  Rent price
                </p>
                <h2 v-if="loadingPrice" class="bg s-h-9 s-w-[180px]"></h2>
                <template v-else>
                  <h2
                    v-if="commission != null && subType == 'RLS'"
                    class="s-text-[24px] s-font-semibold s-text-primary"
                  >
                    {{ country === 'Ghana' ? 'GHC' : 'NGN' }}
                    {{
                      new Intl.NumberFormat().format(
                        Number(totalRent) + serviceCharge - discount
                      )
                    }}<span class="s-text-sm s-text-[#000929] s-font-normal"
                      >/{{
                        duration === 'yearly'
                          ? 'Annual'
                          : duration === 'monthly'
                          ? 'month'
                          : duration === 'quarterly'
                          ? 'quarter'
                          : duration | capitalize
                      }}</span
                    >
                  </h2>
                </template>
                <Select
                  :class="'s-mt-6'"
                  label="DURATION"
                  name="duration"
                  icon=""
                  :options="subPlanDuration"
                  :value="duration"
                  @update="handleSelectDuration"
                />
                <div class="s-mt-6 s-text-sm s-text-primary">
                  <div
                    class="s-w-full s-flex s-justify-between s-items-center s-mb-[1.125rem]"
                  >
                    <p class="s-font-semibold">{{ subType }}</p>
                    <p class="s-font-normal">
                      {{ country === 'Ghana' ? 'GHC' : 'NGN' }}
                      {{ new Intl.NumberFormat().format(Number(totalRent)) }}
                      {{ duration === 'yearly' ? 'Annually' : duration }}
                    </p>
                  </div>
                  <div
                    class="s-w-full s-flex s-justify-between s-items-center s-mb-[1.125rem]"
                  >
                    <p class="s-font-semibold">Service Fee</p>
                    <p class="s-font-normal">
                      {{ country === 'Ghana' ? 'GHC' : 'NGN' }}
                      {{
                        new Intl.NumberFormat().format(Number(serviceCharge))
                      }}
                    </p>
                  </div>
                  <div
                    class="s-w-full s-flex s-justify-between s-items-center s-mb-[1.125rem]"
                  >
                    <p class="s-font-semibold">One-time security deposit</p>
                    <p class="s-font-normal">
                      {{ country === 'Ghana' ? 'GHC' : 'NGN' }}
                      {{
                        new Intl.NumberFormat().format(Number(securityDeposit))
                      }}
                    </p>
                  </div>
                  <div
                    class="s-w-full s-flex s-justify-between s-items-center s-mb-[1.125rem]"
                  >
                    <p class="s-font-semibold">One-time booking fee</p>
                    <p class="s-font-normal">
                      {{ country === 'Ghana' ? 'GHC' : 'NGN' }}
                      {{ new Intl.NumberFormat().format(Number(bookingFee)) }}
                    </p>
                  </div>
                  <div
                    class="s-w-full s-flex s-justify-between s-items-center s-mb-[1.125rem]"
                  >
                    <p class="s-font-semibold">VAT</p>
                    <p class="s-font-normal">
                      {{ country === 'Ghana' ? 'GHC' : 'NGN' }}
                      {{ new Intl.NumberFormat().format(Number(vat)) }}
                    </p>
                  </div>
                  <div
                    v-if="discount > 1"
                    class="s-w-full s-flex s-justify-between s-items-center s-mb-[1.125rem]"
                  >
                    <p class="s-font-semibold">Discount</p>
                    <p class="s-font-normal">
                      {{ country === 'Ghana' ? 'GHC' : 'NGN' }} -{{
                        new Intl.NumberFormat().format(Number(discount))
                      }}
                    </p>
                  </div>
                  <div
                    class="s-w-full s-flex s-justify-between s-items-center s-mb-[1.625rem] s-pt-4 s-border-t s-border-solid s-border-[#99a4e13d]"
                  >
                    <p class="s-font-semibold">Total</p>
                    <p class="s-font-bold s-text-[1.125rem]">
                      {{ country === 'Ghana' ? 'GHC' : 'NGN' }}
                      {{ new Intl.NumberFormat().format(Number(totalPrice)) }}
                    </p>
                  </div>
                  <div class="s-space-y-4">
                    <nuxt-link
                      v-if="!isLoggedIn"
                      :to="'/login?redirect=' + $route.fullPath"
                      tag="button"
                      class="s-bg-primary-blue s-text-white s-w-full s-py-3.5 s-rounded-full s-mb-[1.625rem]"
                      :disabled="loadingPrice"
                    >
                      <Loader v-show="loadingPrice" />
                      {{ loadingPrice ? '' : 'Login' }}
                    </nuxt-link>
                    <Button
                      v-if="isLoggedIn"
                      :text="loadingPrice ? '' : 'Book Now'"
                      class="s-bg-primary-blue s-w-full"
                      :loading="loadingPrice"
                      @submit="createBooking"
                    />
                    <Button
                      v-if="isLoggedIn"
                      text="Book Viewing"
                      class="s-bg-white s-border-primary-blue s-border !s-text-primary-blue s-w-full"
                      @submit="showBooking = !showBooking"
                    />
                    <div
                      v-show="showBooking && isLoggedIn"
                      class="s-w-fit s-mx-auto"
                    >
                      <p
                        v-show="errorMsg"
                        class="s-text-xs s-text-center s-text-red s-mb-3"
                      >
                        {{ errorMsg }}
                      </p>
                      <v-date-picker
                        v-model="date"
                        mode="dateTime"
                        is-required
                        :available-dates="
                          setAvailableDate.length
                            ? { weekdays: setAvailableDate }
                            : undefined
                        "
                        :model-config="modelConfig"
                        :class="'!s-block s-mx-auto'"
                      />
                    </div>
                    <p
                      v-if="isLoggedIn"
                      class="s-mt-6 s-max-w-[17.25rem] s-w-full s-mx-auto s-text-center s-text-[#4B4F63] s-text-sm s-font-normal"
                    >
                      By clicking 'Book Now' you accept Spleet
                      <nuxt-link
                        to="#"
                        class="s-text-primary-blue hover:s-text-primary-blue hover:s-underline s-inline-block"
                        >Terms of service</nuxt-link
                      >
                    </p>
                    <p
                      v-if="!isLoggedIn"
                      class="s-mb-2 s-w-full s-mx-auto s-text-center s-text-[#4B4F63] s-text-xs s-font-normal"
                    >
                      You need to login to book a space
                    </p>
                    <p
                      v-if="!isLoggedIn"
                      class="s-w-full s-mx-auto s-text-center s-text-[#4B4F63] s-text-xs s-font-normal"
                    >
                      Don’t have an account?
                      <nuxt-link to="/createaccount" class="s-text-primary-blue"
                        >Create an account on Spleet</nuxt-link
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p
              class="s-px-[1.875rem] md:s-px-0 s-mt-[1.625rem] s-pb-[2.875rem] s-border-b s-border-solid s-border-[#d0d0d075]"
            >
              {{ spaceDescription }}
            </p>
            <div
              class="s-px-[1.875rem] md:s-px-0 s-mt-6 s-pb-10 s-border-b s-border-solid s-border-[#99a4e13d]"
            >
              <p class="s-uppercase s-text-sm s-text-[#0F0F10] s-font-semibold">
                All Bills Inclusive
              </p>
              <div class="s-mt-[2.75rem] s-flex s-flex-wrap s-gap-y-[3.25rem]">
                <div
                  v-for="({ icon, desc }, index) in bills"
                  :key="index"
                  class="s-w-[50%] sm:s-w-[33%] even:s-self-end"
                >
                  <div class="s-max-w-[160px]">
                    <component :is="icon" class="s-block s-mx-auto" />
                    <p
                      class="s-mt-2.5 s-text-sm s-font-normal s-text-[#000628] s-text-center"
                    >
                      {{ desc }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="s-px-[1.875rem] md:s-px-0 s-mt-[2.875rem] s-pb-[1.875rem] s-border-b s-border-[#99a4e157] s-border-solid"
            >
              <p class="s-mb-6 s-text-sm s-text-[#0F0F10] s-font-semibold">
                Amenities
              </p>
              <div
                class="s-grid s-grid-cols-[repeat(1,_1fr)] md-x:s-grid-cols-[repeat(2,_1fr)] s-grid-rows-[auto] s-gap-x-3 s-gap-y-[30px] s-w-[80%] s-mb-6"
              >
                <p
                  v-for="({ icon, name }, index) in amenitiesShown.slice(0, 10)"
                  :key="index"
                  class="s-flex s-items-center"
                >
                  <img
                    :src="icon"
                    :alt="icon"
                    class="s-max-w-full s-h-auto s-w-5 s-mr-1.5"
                  />
                  <span class="s-font-normal s-text-[#4B4F63]">{{ name }}</span>
                </p>
              </div>
              <p
                class="s-text-primary-blue hover:s-text-primary-blue s-font-semibold s-text-sm s-underline s-cursor-pointer"
                @click="showAmenitiesModal = true"
              >
                See All
              </p>
            </div>

            <div
              class="s-px-[1.875rem] md:s-px-0 s-mt-[2.875rem] s-pb-[1.875rem] s-border-b s-border-[#99a4e157] s-border-solid"
            >
              <p
                class="s-mb-6 s-text-sm s-text-[#0F0F10] s-font-semibold s-uppercase"
              >
                House Rules
              </p>
              <div
                class="s-grid s-grid-cols-[repeat(1,_1fr)] md-x:s-grid-cols-[repeat(2,_1fr)] s-grid-rows-[auto] s-gap-x-3 s-gap-y-[30px] s-w-[90%] s-mb-6"
              >
                <p
                  v-for="(rule, index) in rules"
                  :key="index"
                  class="s-flex s-items-center"
                >
                  <BlueBgCheckIcon class="s-mr-2" />
                  <span class="s-font-normal s-text-[#4B4F63]">{{
                    rule.rules.name
                  }}</span>
                </p>
              </div>
            </div>
          </div>
          <div
            class="s-sticky s-top-[15%] s-hidden md-x:s-block s-border-[1.5px] s-border-solid s-border-[#E0DEF7] s-bg-white s-rounded-lg s-px-[2.25rem] s-pt-8 s-pb-6 s-w-full s-max-w-[28.5rem] s-h-fit"
          >
            <p class="s-font-semibold s-text-sm s-text-[#000929] s-mb-1">
              Rent price
            </p>
            <h2 v-if="loadingPrice" class="bg s-h-9 s-w-[200px]"></h2>
            <template v-else>
              <h2
                v-if="commission != null && subType == 'RLS'"
                class="s-text-[24px] s-font-semibold s-text-primary"
              >
                {{ country === 'Ghana' ? 'GHC' : 'NGN' }}
                {{
                  new Intl.NumberFormat().format(
                    Number(totalRent) + serviceCharge - discount
                  )
                }}<span class="s-text-sm s-text-[#000929] s-font-normal"
                  >/{{
                    duration === 'yearly'
                      ? 'Annual'
                      : duration === 'monthly'
                      ? 'month'
                      : duration === 'quarterly'
                      ? 'quarter'
                      : duration | capitalize
                  }}</span
                >
              </h2>
            </template>
            <Select
              :class="'s-mt-6'"
              label="DURATION"
              name="duration"
              icon=""
              :options="subPlanDuration"
              :value="duration"
              @update="handleSelectDuration"
            />
            <div class="s-mt-6 s-text-sm s-text-primary">
              <div
                class="s-w-full s-flex s-justify-between s-items-center s-mb-[1.125rem]"
              >
                <p class="s-font-semibold">{{ subType }}</p>
                <p class="s-font-normal">
                  {{ country === 'Ghana' ? 'GHC' : 'NGN' }}
                  {{ new Intl.NumberFormat().format(Number(totalRent)) }}
                  {{ duration === 'yearly' ? 'Annually' : duration }}
                </p>
              </div>
              <div
                class="s-w-full s-flex s-justify-between s-items-center s-mb-[1.125rem]"
              >
                <p class="s-font-semibold">Service Fee</p>
                <p class="s-font-normal">
                  {{ country === 'Ghana' ? 'GHC' : 'NGN' }}
                  {{ new Intl.NumberFormat().format(Number(serviceCharge)) }}
                </p>
              </div>
              <div
                class="s-w-full s-flex s-justify-between s-items-center s-mb-[1.125rem]"
              >
                <p class="s-font-semibold">One-time security deposit</p>
                <p class="s-font-normal">
                  {{ country === 'Ghana' ? 'GHC' : 'NGN' }}
                  {{ new Intl.NumberFormat().format(Number(securityDeposit)) }}
                </p>
              </div>
              <div
                class="s-w-full s-flex s-justify-between s-items-center s-mb-[1.125rem]"
              >
                <p class="s-font-semibold">One-time booking fee</p>
                <p class="s-font-normal">
                  {{ country === 'Ghana' ? 'GHC' : 'NGN' }}
                  {{ new Intl.NumberFormat().format(Number(bookingFee)) }}
                </p>
              </div>
              <div
                class="s-w-full s-flex s-justify-between s-items-center s-mb-[1.125rem]"
              >
                <p class="s-font-semibold">VAT</p>
                <p class="s-font-normal">
                  {{ country === 'Ghana' ? 'GHC' : 'NGN' }}
                  {{ new Intl.NumberFormat().format(Number(vat)) }}
                </p>
              </div>
              <div
                v-if="discount > 1"
                class="s-w-full s-flex s-justify-between s-items-center s-mb-[1.125rem]"
              >
                <p class="s-font-semibold">Discount</p>
                <p class="s-font-normal">
                  {{ country === 'Ghana' ? 'GHC' : 'NGN' }} -{{
                    new Intl.NumberFormat().format(Number(discount))
                  }}
                </p>
              </div>
              <div
                class="s-w-full s-flex s-justify-between s-items-center s-mb-[1.625rem] s-pt-4 s-border-t s-border-solid s-border-[#99a4e13d]"
              >
                <p class="s-font-semibold">Total</p>
                <p class="s-font-bold s-text-[1.125rem]">
                  {{ country === 'Ghana' ? 'GHC' : 'NGN' }}
                  {{ new Intl.NumberFormat().format(Number(totalPrice)) }}
                </p>
              </div>
              <div class="s-space-y-4">
                <nuxt-link
                  v-if="!isLoggedIn"
                  :to="'/login?redirect=' + $route.fullPath"
                  tag="button"
                  class="s-bg-primary-blue s-text-white s-w-full s-py-3.5 s-rounded-full s-mb-[1.625rem] s-flex s-items-center s-justify-center"
                  :disabled="loadingPrice"
                >
                  <Loader v-show="loadingPrice" />
                  {{ loadingPrice ? '' : 'Login' }}
                </nuxt-link>
                <Button
                  v-if="isLoggedIn"
                  :text="loadingPrice ? '' : 'Book Now'"
                  class="s-bg-primary-blue s-w-full"
                  :loading="loadingPrice"
                  @submit="createBooking"
                />
                <Button
                  v-if="isLoggedIn"
                  text="Book Viewing"
                  class="s-bg-white s-border-primary-blue s-border !s-text-primary-blue s-w-full"
                  @submit="showBooking = !showBooking"
                />
                <div
                  v-show="showBooking && isLoggedIn"
                  class="s-w-fit s-mx-auto"
                >
                  <p
                    v-show="errorMsg"
                    class="s-text-xs s-text-center s-text-red s-mb-3"
                  >
                    {{ errorMsg }}
                  </p>
                  <v-date-picker
                    v-model="date"
                    mode="dateTime"
                    is-required
                    :available-dates="
                      setAvailableDate.length
                        ? { weekdays: setAvailableDate }
                        : undefined
                    "
                    :model-config="modelConfig"
                    :class="'!s-block s-mx-auto'"
                  />
                </div>
                <p
                  v-if="isLoggedIn"
                  class="s-mt-6 s-max-w-[17.25rem] s-w-full s-mx-auto s-text-center s-text-[#4B4F63] s-text-sm s-font-normal"
                >
                  By clicking 'Book Now' you accept Spleet
                  <nuxt-link
                    to="#"
                    class="s-text-primary-blue hover:s-text-primary-blue hover:s-underline s-inline-block"
                    >Terms of service</nuxt-link
                  >
                </p>
                <p
                  v-if="!isLoggedIn"
                  class="s-mb-2 s-w-full s-mx-auto s-text-center s-text-[#4B4F63] s-text-xs s-font-normal"
                >
                  You need to login to book a space
                </p>
                <p
                  v-if="!isLoggedIn"
                  class="s-w-full s-mx-auto s-text-center s-text-[#4B4F63] s-text-xs s-font-normal"
                >
                  Don’t have an account?
                  <nuxt-link to="/createaccount" class="s-text-primary-blue"
                    >Create an account on Spleet</nuxt-link
                  >
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- map location -->
        <!-- <div class="s-my-[2.75rem] s-px-[1.875rem] md:s-px-0">
          <p
            class="s-mb-6 s-text-sm s-text-[#0F0F10] s-font-semibold s-uppercase"
          >
            Location
          </p>
          <div id="map" class="s-w-full s-h-[500px] s-rounded-md"></div>
        </div> -->

        <!-- nearby spaces -->
        <div
          v-if="returnedSpaces.length > 0"
          class="s-px-[1.875rem] md:s-px-0 s-mt-[2.75rem]"
        >
          <p
            class="s-mb-6 s-text-sm s-text-[#0F0F10] s-font-semibold s-uppercase"
          >
            Nearby Spaces
          </p>
          <VueperSlides
            :bullets="false"
            class="no-shadow"
            :visible-slides="3"
            :slide-multiple="false"
            :gap="3"
            fixed-height="424px"
            :slide-ratio="1 / 4"
            :dragging-distance="70"
            :breakpoints="{
              960: { visibleSlides: 2 },
              730: { visibleSlides: 1 },
            }"
            :arrows="false"
            :touchable="true"
            :autoplay="true"
          >
            <VueperSlide
              v-for="(space, index) in returnedSpaces"
              :key="'second' + index"
              :duration="2500"
            >
              <template #content>
                <Apartment :apartment="space" />
              </template>
            </VueperSlide>
          </VueperSlides>
        </div>
      </div>

      <div class="spaceDetail__lightbox">
        <CoolLightBox
          :items="media"
          :index="index"
          :effect="'fade'"
          @close="index = null"
        >
          ></CoolLightBox
        >
      </div>

      <!-- amenities modal -->
      <OverflowModal
        :show="showAmenitiesModal"
        @toggle="showAmenitiesModal = false"
      >
        <div>
          <p
            v-if="spaceLayout.length"
            class="s-mb-4 s-text-sm s-font-semibold s-tracking-[1px] s-text-primary s-uppercase"
          >
            Space Layout
          </p>
          <div
            class="s-grid s-w-full s-grid-cols-1 s-mb-2.5 s-gap-y-3 s-grid-rows-[auto]"
          >
            <p v-for="(layout, index) in spaceLayout" :key="index">
              <img
                :src="layout.image"
                :alt="layout.name"
                class="s-w-5 s-max-w-full s-mr-2.5 s-h-[auto] s-inline-block"
              />
              <span class="s-text-[#413e5f]">{{ layout.name }}</span>
            </p>
          </div>
        </div>
        <div>
          <p
            v-if="generalAmenities"
            class="s-mb-4 s-text-sm s-font-semibold s-tracking-[1px] s-text-primary s-uppercase"
          >
            General Amenities
          </p>
          <div
            class="s-grid s-w-full s-grid-cols-1 s-mb-2.5 s-gap-y-3 s-grid-rows-[auto]"
          >
            <p
              v-for="(
                { amenity_name: { icon, name } }, index
              ) in generalAmenities"
              :key="index"
              class=""
            >
              <img
                :src="icon"
                :alt="name"
                class="s-w-5 s-max-w-full s-mr-2.5 s-h-[auto] s-inline-block"
              />
              <span class="s-text-[#413e5f]">{{ name }}</span>
            </p>
          </div>
        </div>
        <div>
          <p
            v-if="livingRoomAmenities"
            class="s-mb-4 s-text-sm s-font-semibold s-tracking-[1px] s-text-primary s-uppercase"
          >
            Living Room
          </p>
          <div
            class="s-grid s-w-full s-grid-cols-1 s-mb-2.5 s-gap-y-3 s-grid-rows-[auto]"
          >
            <p
              v-for="(
                { amenity_name: { icon, name } }, index
              ) in livingRoomAmenities"
              :key="index"
              class=""
            >
              <img
                :src="icon"
                :alt="name"
                class="s-w-5 s-max-w-full s-mr-2.5 s-h-[auto] s-inline-block"
              />
              <span class="s-text-[#413e5f]">{{ name }}</span>
            </p>
          </div>
        </div>
        <div>
          <p
            v-if="bedroomAmenities"
            class="s-mb-4 s-text-sm s-font-semibold s-tracking-[1px] s-text-primary s-uppercase"
          >
            Living Room
          </p>
          <div
            class="s-grid s-w-full s-grid-cols-1 s-mb-2.5 s-gap-y-3 s-grid-rows-[auto]"
          >
            <p
              v-for="(
                { amenity_name: { icon, name } }, index
              ) in bedroomAmenities"
              :key="index"
            >
              <img
                :src="icon"
                :alt="name"
                class="s-w-5 s-max-w-full s-mr-2.5 s-h-[auto] s-inline-block"
              />
              <span class="s-text-[#413e5f]">{{ name }}</span>
            </p>
          </div>
        </div>
        <div>
          <p
            v-if="bathroomAmenities"
            class="s-mb-4 s-text-sm s-font-semibold s-tracking-[1px] s-text-primary s-uppercase"
          >
            Bathroom
          </p>
          <div
            class="s-grid s-w-full s-grid-cols-1 s-mb-2.5 s-gap-y-3 s-grid-rows-[auto]"
          >
            <p
              v-for="(
                { amenity_name: { icon, name } }, index
              ) in bathroomAmenities"
              :key="index"
            >
              <img
                :src="icon"
                :alt="name"
                class="s-w-5 s-max-w-full s-mr-2.5 s-h-[auto] s-inline-block"
              />
              <span class="s-text-[#413e5f]">{{ name }}</span>
            </p>
          </div>
        </div>
        <div>
          <p
            v-if="kitchenAmenities"
            class="s-mb-4 s-text-sm s-font-semibold s-tracking-[1px] s-text-primary s-uppercase"
          >
            Kitchen
          </p>
          <div
            class="s-grid s-w-full s-grid-cols-1 s-mb-2.5 s-gap-y-3 s-grid-rows-[auto]"
          >
            <p
              v-for="(
                { amenity_name: { icon, name } }, index
              ) in kitchenAmenities"
              :key="index"
            >
              <img
                :src="icon"
                :alt="name"
                class="s-w-5 s-max-w-full s-mr-2.5 s-h-[auto] s-inline-block"
              />
              <span class="s-text-[#413e5f]">{{ name }}</span>
            </p>
          </div>
        </div>
        <div>
          <p
            v-if="diningRoomAmenities"
            class="s-mb-4 s-text-sm s-font-semibold s-tracking-[1px] s-text-primary s-uppercase"
          >
            Dinning Room
          </p>
          <div
            class="s-grid s-w-full s-grid-cols-1 s-mb-2.5 s-gap-y-3 s-grid-rows-[auto]"
          >
            <p
              v-for="(
                { amenity_name: { icon, name } }, index
              ) in diningRoomAmenities"
              :key="index"
            >
              <img
                :src="icon"
                :alt="name"
                class="s-w-5 s-max-w-full s-mr-2.5 s-h-[auto] s-inline-block"
              />
              <span class="s-text-[#413e5f]">{{ name }}</span>
            </p>
          </div>
        </div>
      </OverflowModal>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
/* eslint-disable no-new */
import { mapActions, mapState } from 'vuex'
import { format, addMonths, addDays } from 'date-fns'
import CoolLightBox from 'vue-cool-lightbox'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
// let Gmap
// let Gmarker
export default {
  components: {
    CoolLightBox,
    VueperSlides,
    VueperSlide,
  },
  layout: 'website',
  data() {
    return {
      date: null,
      showBooking: false,
      index: null,
      showWarning: null,
      showDLSBookingModal: false,
      auto_charge: null,
      loading: false,
      showAmenitiesModal: false,
      spaceName: null,
      spaceDetail: null,
      apartmentId: this.$route.params.id,
      listingId: null,
      slug: this.$route.params.slug,
      images: [],
      latitude: null,
      longitude: null,
      dateRange: null,
      dragValue: null,
      shared: true,
      entire: null,
      duration: null,
      spaceType: null,
      subType: null,
      city: null,
      country: null,
      spaceDescription: null,
      subPlans: null,
      priceList: [],
      spacePrice: null,
      generalAmenities: null,
      kitchenAmenities: null,
      livingRoomAmenities: null,
      diningRoomAmenities: null,
      bathroomAmenities: null,
      bedroomAmenities: null,
      spaceLayout: [],
      numberBedroom: '',
      sameDayBooking: null,
      advanceBooking: null,
      discount: null,
      securityDeposit: null,
      bookingFee: null,
      vat: null,
      serviceCharge: null,
      totalPrice: null,
      totalRent: null,
      loadingPrice: false,
      hostId: null,
      success: false,
      successMessage: '',
      error: false,
      errorMessage: '',
      powerDuration: '',
      allAmenities: [],
      commission: null,
      rules: [],
      furnishStatus: null,
      availability: null,
      cardCheck: null,
      disabledBtn: false,
      managedBySpleet: null,
      goodToKnow: [],
      bathroomType: '',
      numberBathroom: '',
      nearbySpaces: [],
      randomImgKey: null,
      isSuccess: false,
      staus: '',
      snackBarText: '',
      viewingDays: [],
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD h:mm A',
      },
      errorMsg: null,
      viewBookingLoader: false,
      availabilityFrom: null,
    }
  },
  computed: {
    ...mapState('auth', ['isLoggedIn']),
    ...mapState('user', ['userData']),
    setAvailableDate() {
      const days = this.viewingDays.map((el) => {
        switch (el) {
          case 'sunday':
            return 1
          case 'monday':
            return 2
          case 'tuesday':
            return 3
          case 'wednesday':
            return 4
          case 'thursday':
            return 5
          case 'friday':
            return 6
          case 'saturday':
            return 7
          default:
            return 0
        }
      })
      return days
    },
    returnedSpaces() {
      return this.nearbySpaces.map((item) => ({
        name: item.title,
        beds: item.no_rooms,
        bath: item.no_baths,
        spaceType: item.listing_type,
        managed_by_spleet: item.managed_by_spleet,
        service: true,
        country: item.country,
        slug: item.apartment_slug,
        subType: this.setPrice(item.prices, item.is_furnished),
        images: item.images
          .map((el) => {
            return el.image_path
          })
          .slice(0, 3),
        id: item.apartment_id,
      }))
    },
    subPlanDuration() {
      return [
        {
          text: 'Monthly',
          value: 'monthly',
        },
        {
          text: 'Quarterly',
          value: 'quarterly',
        },
        {
          text: 'Annually',
          value: 'yearly',
        },
      ]
    },
    bills() {
      return [
        { icon: 'BulbIcon', desc: 'Power Supply' },
        { icon: 'CleaningIcon', desc: 'Cleaning Services' },
        { icon: 'WaterIcon', desc: 'Water Supply' },
        { icon: 'SupportIcon', desc: '24-hours Support' },
        { icon: 'GasIcon', desc: 'Gas supply' },
        { icon: 'WasteManagementIcon', desc: 'Waste management' },
        { icon: 'HouseIcon', desc: 'Estate dues' },
        { icon: 'UmbrellaIcon', desc: 'Amenities' },
      ]
    },
    media() {
      return this.images.map((image) => ({
        src: image,
      }))
    },
    imageGrid() {
      return this.images.slice(0, 3)
    },
    amenitiesShown() {
      if (this.allAmenities.length > 0) {
        return this.allAmenities.filter((el) => el.name !== 'None')
      } else {
        return []
      }
    },
    guarantor() {
      if (this.userData && this.userData.guarantor) {
        return true
      }
      return false
    },
  },
  watch: {
    duration(newValue) {
      this.commission = null
      this.priceList.forEach((price) => {
        if (price.sub_plan === newValue) {
          this.spacePrice = price.amount
        }
      })

      this.getPriceBreakdown()
    },
    dateRange() {
      this.getPriceBreakdown()
    },
  },
  mounted() {
    this.getDetails(this.slug)
  },
  methods: {
    ...mapActions('renters/spaces', [
      'getSpaceDetail',
      'getPrcBreakdown',
      'createUserBooking',
      'userViewBooking',
    ]),
    ...mapActions('user', ['getUser']),
    showSnackbar(value, delay = 8000) {
      let timerId
      clearTimeout(timerId)
      this.isSuccess = true
      this.staus = value
      new Promise(
        (resolve) =>
          (timerId = setTimeout(() => {
            resolve()
            this.isSuccess = false
            this.staus = ''
          }, delay))
      )
    },
    openGallery(index) {
      this.index = index
    },
    handleSelectDuration(value) {
      this.duration = value
    },
    setPrice(value, furnished) {
      if (value.length === 1) {
        return value[0]
      }
      return value.find((e) => {
        if (!furnished) {
          if (e.sub_plan === 'quarterly') {
            return e
          } else if (e.sub_plan === 'biannual') {
            return e
          }
          return null
        } else {
          if (e.sub_plan === 'monthly' || e.sub_plan === 'daily') {
            return e
          }
          return null
        }
      })
    },
    showMap() {
      const lat = Number(this.latitude)
      const lng = Number(this.longitude)
      const latlng = {
        lat,
        lng,
      }
      const mapOptions = {
        center: latlng,
        zoom: 7,
      }
      const mapDom = document.getElementById('map')
      new window.google.maps.Map(mapDom, mapOptions)
      // this.createMarker()
    },
    // createMarker() {
    //   const lat = Number(this.latitude)
    //   const lng = Number(this.longitude)
    //   const iconBase =
    //     'https://res.cloudinary.com/spleetng/image/upload/v1602105135/map_marker.svg'
    //   const latlng = {
    //     lat,
    //     lng,
    //   }
    //   const markerOptions = {
    //     position: latlng,
    //     map: Gmap,
    //     animation: google.maps.Animation.BOUNCE,
    //     clickable: true,
    //     draggable: false,
    //     icon: iconBase,
    //   }
    //   let cityCircle = new google.maps.Circle({
    //     strokeColor: '#2E48DA',
    //     // strokeOpacity: 0.8,
    //     strokeWeight: 0.3,
    //     fillColor: 'rgb(46, 72, 218)',
    //     fillOpacity: 0.3,
    //     map: Gmap,
    //     center: latlng,
    //     radius: 118,
    //   })
    //   Gmarker = new google.maps.Marker(markerOptions)
    //   console.log(Gmarker, cityCircle)
    // },
    randomIKeys() {
      this.randomImgKey = Math.floor(Math.random() * Date.now())
    },
    async getDetails(slug) {
      this.loading = true
      try {
        const data = await this.getSpaceDetail(slug)

        const returnedData = data.data
        if (data.statusCode === 200) {
          this.viewingDays = returnedData.viewingDays
          this.nearbySpaces = returnedData.nearby_spaces
          this.apartmentId = returnedData.id
          this.listingId = returnedData.parent_listing.id
          this.rules = returnedData.parent_listing.rules
          this.subType =
            returnedData.parent_listing.subscription_option.sub_type_code
          this.managedBySpleet = returnedData.managed_by_spleet
          this.city = returnedData.parent_listing.city
          this.country = returnedData.parent_listing.country
          this.spaceType = returnedData.listing_type
          this.spaceDescription = returnedData.parent_listing.description
          this.latitude = returnedData.parent_listing.latitude
          this.longitude = returnedData.parent_listing.longitude
          this.hostId = returnedData.parent_listing.user_id
          this.goodToKnow = returnedData.parent_listing.good_to_know
            ? returnedData.parent_listing.good_to_know.split(';')
            : []
          this.furnishStatus = returnedData.is_furnished
            ? 'Furnished'
            : 'Unfurnished'
          this.availability = returnedData.parent_listing.property_availability
            ? format(
                new Date(returnedData.parent_listing.property_availability.to),
                'dd MMMM yyyy'
              )
            : null
          this.availabilityFrom = returnedData.parent_listing
            .property_availability
            ? returnedData.parent_listing.property_availability.from
            : null
          // this.showMap()
          this.powerDuration = returnedData.parent_listing.maintenance_option
            ? returnedData.parent_listing.maintenance_option.power_duration
            : 0

          if (
            returnedData.parent_listing.subscription_option.subscription_plan
              .length
          ) {
            this.subPlans =
              returnedData.parent_listing.subscription_option.subscription_plan.map(
                (subs) => {
                  return subs.plan
                }
              )
            if (
              returnedData.parent_listing.subscription_option.sub_type_code ===
              'RLS'
            ) {
              if (returnedData.is_furnished) {
                if (this.subPlans.includes('monthly')) {
                  const monthIndex = this.subPlans.indexOf('monthly')
                  this.subPlans.splice(monthIndex, 1)
                  this.subPlans.splice(0, 0, 'monthly')
                }
              } else {
                const monthIndex = this.subPlans.indexOf('monthly')
                this.subPlans.splice(monthIndex, 1)
              }
            }
          }

          if (
            returnedData.parent_listing.subscription_option.sub_plan !== null
          ) {
            this.subPlans =
              returnedData.parent_listing.subscription_option.sub_plan.split(
                ','
              )
            if (
              returnedData.parent_listing.subscription_option.sub_type_code ===
              'RLS'
            ) {
              if (returnedData.is_furnished) {
                if (this.subPlans.includes('monthly')) {
                  const monthIndex = this.subPlans.indexOf('monthly')
                  this.subPlans.splice(monthIndex, 1)
                  this.subPlans.splice(0, 0, 'monthly')
                }
              } else {
                const monthIndex = this.subPlans.indexOf('monthly')
                this.subPlans.splice(monthIndex, 1)
              }
            }
          }
          const allAmenities = []
          returnedData.parent_listing.amenities.forEach((amenity) => {
            allAmenities.push(amenity.amenity_name)
          })
          this.generalAmenities = returnedData.parent_listing.amenities.filter(
            (amenity) => {
              return amenity.amenity_category.name === 'General'
            }
          )
          this.diningRoomAmenities =
            returnedData.parent_listing.amenities.filter((amenity) => {
              return amenity.amenity_category.name === 'Dinning Room'
            })

          this.kitchenAmenities = returnedData.parent_listing.amenities.filter(
            (amenity) => {
              return amenity.amenity_category.name === 'Kitchen'
            }
          )

          this.livingRoomAmenities =
            returnedData.parent_listing.amenities.filter((amenity) => {
              return amenity.amenity_category.name === 'Living Room'
            })

          returnedData.parent_listing.space_layout.forEach((layout) => {
            this.spaceLayout.push(layout.space_layout_name)
          })

          for (let i = 0; i < this.subPlans.length; i++) {
            if (this.subPlans[i] === 'monthly') {
              this.duration = this.subPlans[i]
              break
            } else if (this.subPlans[i] === 'quarterly') {
              this.duration = this.subPlans[i]
              break
            } else if (this.subPlans[i] === 'biannual') {
              this.duration = this.subPlans[i]
              break
            } else if (this.subPlans[i] === 'yearly') {
              this.duration = this.subPlans[i]
              break
            }
          }

          returnedData.parent_listing.images.forEach((image) => {
            this.images.push(image.image_path)
          })

          this.numberBedroom = returnedData.parent_listing.no_rooms

          if (returnedData.listing_type === 'entire') {
            this.spaceName = returnedData.parent_listing.title
            returnedData.entire_property.images.forEach((image) => {
              this.images.push(image.image_path)
            })

            this.numberBathroom =
              returnedData.parent_listing.no_baths &&
              returnedData.parent_listing.no_baths.endsWith('.5')
                ? returnedData.parent_listing.no_baths
                : Number(returnedData.parent_listing.no_baths)

            this.priceList = returnedData.entire_property.prices

            this.priceList.forEach((price) => {
              this.subPlans.forEach((subPlan) => {
                if (price.sub_plan === subPlan) {
                  this.spacePrice = price.amount
                }
              })
            })
          }
          if (returnedData.listing_type === 'shared') {
            this.spaceName = returnedData.shared_bedroom.name
            // returnedData.shared_bedroom.images.forEach((image) => {
            //   this.images.push(image.image_path)
            // })

            this.priceList = returnedData.parent_listing.prices

            this.priceList.forEach((price) => {
              this.subPlans.forEach((subPlan) => {
                if (price.sub_plan === subPlan) {
                  this.spacePrice = price.amount
                }
              })
            })

            this.bathroomAmenities =
              returnedData.parent_listing.amenities.filter((amenity) => {
                return amenity.amenity_category.name === 'Bath Room'
              })

            this.bedroomAmenities =
              returnedData.parent_listing.amenities.filter((amenity) => {
                return amenity.amenity_category.name === 'Bedroom'
              })
            returnedData.parent_listing.amenities.forEach((amenity) => {
              allAmenities.push(amenity.amenity_name)
            })
            this.bathroomType = returnedData.shared_bedroom.bathroom_type
          }
          allAmenities.forEach((amenity) => {
            const i = this.allAmenities.findIndex(
              (x) => x.name === amenity.name
            )
            if (i <= -1) {
              this.allAmenities.push(amenity)
            }
            return null
          })
        }
        this.loading = false
      } catch (error) {
        this.loading = false
        this.$errorHandler(error)
      }
    },
    getPriceBreakdown() {
      this.loadingPrice = true
      if (this.subType === 'RLS') {
        let endDate
        if (this.duration === 'monthly') {
          endDate = addMonths(new Date(), 1)
        } else if (this.duration === 'quarterly') {
          endDate = addMonths(new Date(), 3)
        } else if (this.duration === 'biannual') {
          endDate = addMonths(new Date(), 6)
        } else if (this.duration === 'yearly') {
          endDate = addMonths(new Date(), 12)
        }
        this.getPrcBreakdown({
          listingId: this.listingId,
          apartmentId: this.apartmentId,
          subType: this.subType,
          subPlan: this.duration,
          endDate: format(new Date(endDate), 'yyyy-MM-dd'),
          startDate: format(new Date(), 'yyyy-MM-dd'),
          currency: this.country === 'Ghana' ? 'GHS' : 'NGN',
        })
          .then((data) => {
            this.loadingPrice = false
            if (data.statusCode === 200) {
              const returnedData = data.data
              this.bookingFee = returnedData.booking_fee
              this.totalPrice = Number(returnedData.total_payable)
              this.vat = returnedData.vat
              this.commission = Number(returnedData.commission)
              this.totalRent =
                returnedData.total_rent + Number(returnedData.commission)
              this.discount = returnedData.discount
              this.serviceCharge = returnedData.service_charge.total
              this.securityDeposit =
                Number(returnedData.security_deposit) +
                Number(returnedData.evictionSecurityDeposit)
            }
          })
          .catch((error) => {
            this.loadingPrice = false
            this.$errorHandler(error)
          })
      }
    },
    async createBooking() {
      this.loadingPrice = true
      if (
        this.userData &&
        (this.userData.user.kycStatus === 'none' ||
          this.userData.user.kycStatus === 'declined')
      ) {
        this.loadingPrice = false
        this.snackBarText =
          'Profile Incomplete. Kindly update your profile before you can book a space.'
        this.showSnackbar('error', 6000)
        setTimeout(() => {
          this.$router.push('/renter/account-settings')
        }, 6000)
      } else if (!this.date) {
        this.loadingPrice = false
        this.showBooking = true
        this.errorMsg = 'Please choose from the available dates for viewing'
      } else {
        const [viewingDate, viewingTime] = this.date.split(' ')
        const selectedDate = new Date(viewingDate).getTime()
        let availFrom = new Date(this.availabilityFrom).getTime()
        if (selectedDate < availFrom) {
          availFrom = format(addDays(new Date(availFrom), 1), 'MMMM dd yyyy')
          this.loadingPrice = false
          this.snackBarText = `This space is only available for viewing from ${availFrom}`
          this.showSnackbar('error')
          return null
        }

        // if (response && response.statusCode === 201) {
        if (this.furnishStatus === 'Unfurnished') {
          if (this.guarantor) {
            let endDate
            if (this.duration === 'monthly') {
              endDate = addMonths(new Date(), 1)
            } else if (this.duration === 'quarterly') {
              endDate = addMonths(new Date(), 3)
            } else if (this.duration === 'biannual') {
              endDate = addMonths(new Date(), 6)
            } else if (this.duration === 'yearly') {
              endDate = addMonths(new Date(), 12)
            }

            try {
              const data = await this.createUserBooking({
                property_listing_id: this.listingId,
                apartment_id: this.apartmentId,
                host_user_id: this.hostId,
                booking_type: this.subType,
                sub_plan: this.duration,
                start_date: format(new Date(), 'yyyy-MM-dd'),
                end_date: format(new Date(endDate), 'yyyy-MM-dd'),
                auto_charge: false,
                currency: this.country === 'Ghana' ? 'GHS' : 'NGN',
              })

              if (data.statusCode === 201) {
                const data = {
                  apartmentId: this.apartmentId,
                  hostUserId: this.hostId,
                  viewingDate,
                  viewingTime,
                }

                try {
                  await this.userViewBooking(data)
                  // this.snackBarText = response.message
                  this.snackBarText =
                    'Booking created successfully. Check your mail. You will be redirected shortly'
                  this.showSnackbar('success')
                  this.errorMsg = ''
                  this.showBooking = false
                  this.date = null
                  this.loadingPrice = false
                  setTimeout(() => {
                    this.$router.push('/renter/bookings')
                  }, 5000)
                } catch (error) {
                  this.loadingPrice = false
                  this.snackBarText = Array.isArray(error.response.data.message)
                    ? error.response.data.message[0]
                    : error.response.data.message
                  this.showSnackbar('error')
                }
              }
            } catch (error) {
              this.loadingPrice = false
              this.showSnackbar('error')
              this.snackBarText = Array.isArray(error.response.data.message)
                ? error.response.data.message[0]
                : error.response.data.message
            }
          } else {
            this.snackBarText =
              "When booking an unfurnished space, you are expected to fill a guarantor's form in your profile"
            this.showSnackbar('error')
            this.$router.push('/renter')
            // this.$router.push(
            //   `/renter/account-settings?index=5&redirect=${this.$route.fullPath}`
            // )
          }
        } else {
          let endDate
          if (this.duration === 'monthly') {
            endDate = addMonths(new Date(), 1)
          } else if (this.duration === 'quarterly') {
            endDate = addMonths(new Date(), 3)
          } else if (this.duration === 'biannual') {
            endDate = addMonths(new Date(), 6)
          } else if (this.duration === 'yearly') {
            endDate = addMonths(new Date(), 12)
          }

          try {
            const data = await this.createUserBooking({
              property_listing_id: this.listingId,
              apartment_id: this.apartmentId,
              host_user_id: this.hostId,
              booking_type: this.subType,
              sub_plan: this.duration,
              start_date: format(new Date(), 'yyyy-MM-dd'),
              end_date: format(new Date(endDate), 'yyyy-MM-dd'),
              auto_charge: false,
              currency: this.country === 'Ghana' ? 'GHS' : 'NGN',
            })
            this.loadingPrice = false
            if (data.statusCode === 201) {
              this.snackBarText =
                'Booking created successfully. Check your mail. You will be redirected shortly'
              this.showSnackbar('success')
              setTimeout(() => {
                this.$router.push('/renter/bookings')
              }, 5000)
            }
          } catch (error) {
            this.loadingPrice = false
            if (error.response.data.statusCode === 409) {
              this.$router.push('/renter/bookings')
              return null
            }
            this.$errorHandler(error)
          }
        }
      }
    },
  },
}
</script>

<style lang="scss">
.grid_style {
  &:nth-child(1) {
    grid-column: 1 / span 4;
    grid-row: span 1;
  }
  &:nth-child(2) {
    grid-column: 1 / 3;
  }
  &:nth-child(3) {
    grid-column: 3 / 5;
  }
}
@media screen and (min-width: 640px) {
  .grid_style {
    &:nth-child(1) {
      grid-column: 1 / span 3;
      grid-row: span 2;
    }
    &:nth-child(2) {
      grid-column: 4 / span 2;
    }
    &:nth-child(3) {
      grid-column: 4 / span 2;
    }
  }
}

.image_overlay {
  &:nth-child(1) {
    width: 100;
  }
}

.bg {
  box-shadow: 0 4px 4px 4px rgba(33, 33, 33, 0.05);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}
.bg::before {
  content: '';
  display: block;
  position: absolute;
  left: -150px;
  top: 0;
  height: 100%;
  width: 150px;
  background: linear-gradient(
    to right,
    transparent 0%,
    #e8e8e8 50%,
    transparent 100%
  );
  animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes load {
  from {
    left: -150px;
  }
  to {
    left: 100%;
  }
}
</style>
