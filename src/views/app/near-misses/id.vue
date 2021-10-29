<template>
  <div class="main-content">
    <breadcumb :page="'Update Near Miss'" :folder="'Near Misses'" />
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
                    :autocomplete-items="filteredLocationItems"
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
                    :autocomplete-items="filteredCategoryItems"
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
                    :autocomplete-items="filteredActivityItems"
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
                    :autocomplete-items="filteredBasicCauseItems"
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
    title: "Update Near Miss",
  },
  data() {
    return {
      form: {
        number_reported: "150",
      },

      searchLocation: "",
      selectedLocation: [
        {
          text: "Desk",
        },
      ],
      LocationItems: [
        {
          text: "China",
        },
        {
          text: "Japan",
        },
        {
          text: "India",
        },
        {
          text: "Hongkong",
        },
        {
          text: "Siveria",
        },
        {
          text: "Dubai",
        },
        {
          text: "Russia",
        },
      ],

      searchCategory: "",
      selectedCategory: [
        {
          text: "Navigation",
        },
      ],
      CategoryItems: [
        {
          text: "China",
        },
        {
          text: "Japan",
        },
        {
          text: "India",
        },
        {
          text: "Hongkong",
        },
        {
          text: "Siveria",
        },
        {
          text: "Dubai",
        },
        {
          text: "Russia",
        },
      ],

      searchActivity: "",
      selectedActivity: [
        {
          text: "Maintenance",
        },
      ],
      ActivityItems: [
        {
          text: "China",
        },
        {
          text: "Japan",
        },
        {
          text: "India",
        },
        {
          text: "Hongkong",
        },
        {
          text: "Siveria",
        },
        {
          text: "Dubai",
        },
        {
          text: "Russia",
        },
      ],

      searchBasicCause: "",
      selectedBasicCause: [{ text: "Lack Of Self Awareness" }],
      BasicCauseItems: [
        {
          text: "China",
        },
        {
          text: "Japan",
        },
        {
          text: "India",
        },
        {
          text: "Hongkong",
        },
        {
          text: "Siveria",
        },
        {
          text: "Dubai",
        },
        {
          text: "Russia",
        },
      ],

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
  },
  computed: {
    filteredLocationItems() {
      return this.LocationItems.filter((c) => {
        return (
          c.text.toLowerCase().indexOf(this.searchLocation.toLowerCase()) !== -1
        );
      });
    },
    filteredCategoryItems() {
      return this.CategoryItems.filter((c) => {
        return (
          c.text.toLowerCase().indexOf(this.searchCategory.toLowerCase()) !== -1
        );
      });
    },
    filteredActivityItems() {
      return this.ActivityItems.filter((c) => {
        return (
          c.text.toLowerCase().indexOf(this.searchActivity.toLowerCase()) !== -1
        );
      });
    },
    filteredBasicCauseItems() {
      return this.BasicCauseItems.filter((c) => {
        return (
          c.text.toLowerCase().indexOf(this.searchBasicCause.toLowerCase()) !==
          -1
        );
      });
    },
  },
  methods: {
    //   validate form
    async submit() {
      console.log("submit!");

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        try {
          this.isLoading = true;
          this.current_vessel = await axios.post("/vessels", this.form);
          this.isLoading = false;
        } catch (e) {
          this.isLoading = false;
        }
        this.submitStatus = "PENDING";
        // setTimeout(() => {
        this.submitStatus = "OK";
        this.$router.push("/app/vessels");
        // }, 1000);
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
      this.$bvToast.toast("Successfully Submitted", {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },

    inputSubmit() {
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
