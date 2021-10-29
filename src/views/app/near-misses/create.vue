<template>
  <div class="main-content">
    <breadcumb :page="'Create Near Miss'" :folder="'Near Misss'" />

    <b-row class="justify-content-md-center">
      <b-col md="9">
        <b-card title="Near Miss">
          <b-form @submit.prevent="submit">
            <b-row>
              <b-col>
                <b-form-group label="Number reported">
                  <b-form-input
                    class="mb-2"
                    label="Number reported"
                    placeholder="Enter Number reported"
                    v-model.trim="$v.form.number_reported.$model"
                  >
                  </b-form-input>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.number_reported.required"
                    >Field is required</b-alert
                  >
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.number_reported.numeric"
                    >Only Numeric Value</b-alert
                  >
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label="Location">
                  <vue-tags-input
                    v-model="searchLocation"
                    :tags="selectedLocation"
                    :max-tags="1"
                    class="tag-custom text-15 mb-2"
                    :autocomplete-items="filteredlocationItems"
                    :add-only-from-autocomplete="true"
                    @tags-changed="(newTags) => (selectedLocation = newTags)"
                    placeholder="Type Location"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label="Category">
                  <vue-tags-input
                    v-model="searchCategory"
                    :tags="selectedCategory"
                    :max-tags="1"
                    class="tag-custom text-15 mb-2"
                    :autocomplete-items="filteredcategoryItems"
                    :add-only-from-autocomplete="true"
                    @tags-changed="(newTags) => (selectedCategory = newTags)"
                    placeholder="Type Category"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label="Activity">
                  <vue-tags-input
                    v-model="searchActivity"
                    :tags="selectedActivity"
                    :max-tags="1"
                    class="tag-custom text-15 mb-2"
                    :autocomplete-items="filteredactivityItems"
                    :add-only-from-autocomplete="true"
                    @tags-changed="(newTags) => (selectedActivity = newTags)"
                    placeholder="Type Activity"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label="Basic Cause">
                  <vue-tags-input
                    v-model="searchBasicCause"
                    :tags="selectedBasicCause"
                    :max-tags="1"
                    class="tag-custom text-15 mb-2"
                    :autocomplete-items="filteredbasic_causeItems"
                    :add-only-from-autocomplete="true"
                    @tags-changed="(newTags) => (selectedBasicCause = newTags)"
                    placeholder="Type Basic Cause"
                  />
                </b-form-group>
              </b-col>
            </b-row>

            <b-button
              type="submit"
              variant="primary"
              :disabled="submitStatus === 'PENDING'"
              >Submit</b-button
            >

            <p v-once class="typo__p" v-if="submitStatus === 'OK'">
              {{ makeToastTwo("success") }}
            </p>
            <p v-once class="typo__p" v-if="submitStatus === 'ERROR'">
              {{ makeToast("danger") }}
            </p>
            <div v-once class="typo__p" v-if="submitStatus === 'PENDING'">
              <div class="spinner sm spinner-primary mt-3"></div>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import { numeric, required } from "vuelidate/lib/validators";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Near Miss Create",
  },
  data() {
    return {
      form: {
        number_reported: "",
      },

      searchLocation: "",
      selectedLocation: [],
      locationItems: [],

      searchCategory: "",
      selectedCategory: [],
      categoryItems: [],

      searchActivity: "",
      selectedActivity: [],
      activityItems: [],

      searchBasicCause: "",
      selectedBasicCause: [],
      basic_causeItems: [],

      submitStatus: null,
    };
  },
  validations: {
    form: {
      number_reported: {
        required,
        numeric,
      },
    },
  },
  mounted() {
    this.form.site_id = this.site.id;
    this.getMasters();
  },
  computed: {
    filteredlocationItems() {
      return this.locationItems.filter((c) => {
        return (
          c.text.toLowerCase().indexOf(this.searchLocation.toLowerCase()) !== -1
        );
      });
    },
    filteredcategoryItems() {
      return this.categoryItems.filter((c) => {
        return (
          c.text.toLowerCase().indexOf(this.searchCategory.toLowerCase()) !== -1
        );
      });
    },
    filteredactivityItems() {
      return this.activityItems.filter((c) => {
        return (
          c.text.toLowerCase().indexOf(this.searchActivity.toLowerCase()) !== -1
        );
      });
    },
    filteredbasic_causeItems() {
      return this.basic_causeItems.filter((c) => {
        return (
          c.text.toLowerCase().indexOf(this.searchBasicCause.toLowerCase()) !==
          -1
        );
      });
    },
  },
  methods: {
    async getMasters() {
      this.isLoading = true;
      let masters = await axios.get("near_misses/masters");
      masters = masters.data;
      masters.locations.forEach((location) => {
        this.locationItems.push({
          id: location.id,
          text: location.description,
        });
      });

      masters.categories.forEach((category) => {
        this.categoryItems.push({
          id: category.id,
          text: category.description,
        });
      });

      masters.activities.forEach((activity) => {
        this.activityItems.push({
          id: activity.id,
          text: activity.description,
        });
      });
      masters.basic_causes.forEach((basic_cause) => {
        this.basic_causeItems.push({
          id: basic_cause.id,
          text: basic_cause.description,
        });
      });
      this.isLoading = false;
    },
    //   validate form
    async submit() {
      console.log("submit!");
      this.form.location_id = this.selectedLocation[0].id;
      this.form.category_id = this.selectedCategory[0].id;
      this.form.activity_id = this.selectedActivity[0].id;
      this.form.basic_cause_id = this.selectedBasicCause[0].id;

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        try {
          console.log(this.form);
          this.isLoading = true;
          await axios.post("/near_misses", this.form);
          this.isLoading = false;
        } catch (e) {
          this.isLoading = false;
        }
        this.submitStatus = "PENDING";
        this.submitStatus = "OK";
        this.$router.push("/app/near-misses");
      }
    },
    makeToast(variant = null) {
      this.$bvToast.toast("Please fill the form correctly.", {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },
    makeToastTwo(variant = null) {
      // this.save();
      this.$bvToast.toast("Successfully Submitted", {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },

    inputSubmit() {
      // this.save();
    },
  },
};
</script>
<style>
.spinner.sm {
  height: 2em;
  width: 2em;
}
</style>
