<template>
  <div class="main-content">
    <breadcumb :page="'Update Vessel'" :folder="'Vessels'" />
    <b-row>
      <b-col md="12">
        <b-card title="Vessel">
          <b-row>
            <b-col md="12">
              <b-button
                @click="$router.back()"
                class="mb-2 pull-right"
                style="margin-top:-45px"
                variant="primary"
                ><i class="i-Arrow-Back-3"></i> BACK</b-button
              >
            </b-col>
          </b-row>
          <b-form @submit.prevent="submit">
            <b-row>
              <b-col md="6">
                <b-form-group label="Serial No">
                  <b-form-input
                    class="mb-2"
                    label="Serial No"
                    placeholder="Enter Serial No"
                    v-model.trim="$v.form.serial_no.$model"
                  >
                  </b-form-input>
                  <!-- <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.serial_no.required"
                    >Field is required</b-alert
                  > -->
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.serial_no.numeric"
                    >Only Numeric Value</b-alert
                  >
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Vessel Name">
                  <b-form-input
                    class="mb-2"
                    label="Vessel Name"
                    placeholder="Enter Vessel Name"
                    v-model.trim="$v.form.name.$model"
                  >
                  </b-form-input>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.name.alphaNum"
                    >Only AlphaNumeric values</b-alert
                  >
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="IMO Number">
                  <b-form-input
                    class="mb-2"
                    label="IMO Number"
                    placeholder="Enter IMO Number"
                    v-model.trim="$v.form.imo_no.$model"
                  >
                  </b-form-input>

                  <!-- <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.imo_no.required"
                    >Field is required</b-alert
                  > -->
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="
                      !$v.form.imo_no.minLength || !$v.form.imo_no.maxLength
                    "
                    >IMO No should have
                    {{ $v.form.imo_no.$params.minLength.min }} Digits.</b-alert
                  >
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.imo_no.numeric"
                    >Only Numeric Value</b-alert
                  >
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Vessel Type">
                  <vue-tags-input
                    v-model="searchVesselType"
                    :tags="selectedVesselType"
                    :max-tags="1"
                    class="tag-custom text-15 mb-2"
                    :autocomplete-items="filteredVesselTypeItems"
                    :add-only-from-autocomplete="true"
                    @tags-changed="(newTags) => (selectedVesselType = newTags)"
                    placeholder="Search Vessel Type..."
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Date Of Built">
                  <b-form-datepicker
                    id="built_date"
                    v-model="form.built_date"
                    class="mb-2"
                    :max="max"
                    placeholder="Date Of Built"
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Place Of Built">
                  <vue-tags-input
                    v-model="searchBuiltPlace"
                    :tags="selectedBuiltPlace"
                    :max-tags="1"
                    class="tag-custom text-15 mb-2"
                    :autocomplete-items="filteredBuiltPlaceItems"
                    :add-only-from-autocomplete="true"
                    @tags-changed="(newTags) => (selectedBuiltPlace = newTags)"
                    placeholder="Search Place Of Built..."
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Summer DWT (M/T)">
                  <b-form-input
                    class="mb-2"
                    label="Summer DWT"
                    placeholder="Enter Summer DWT in Metric Tons"
                    v-model.trim="$v.form.dwt.$model"
                  >
                  </b-form-input>
                  <b-form-text id="input-live-help">in Metric Tons</b-form-text>
                  <!-- <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.dwt.required"
                    >Field is required</b-alert
                  > 
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.dwt.numeric"
                    >Only Numeric Value</b-alert
                  > -->
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.dwt.decimal"
                    >Only Numeric Value</b-alert
                  >
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.dwt.maxLength"
                    >Summer DWT should have
                    {{ $v.form.dwt.$params.maxLength.max }} Digits.</b-alert
                  >
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Remark">
                  <b-form-textarea
                    id="textarea"
                    v-model="form.remarks"
                    placeholder="Remark"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Management IN Date">
                  <b-form-datepicker
                    id="management_in_date"
                    v-model="form.management_in_date"
                    class="mb-2"
                    :min="form.built_date"
                    placeholder="Management IN Date"
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Management OUT Date">
                  <b-form-datepicker
                    id="management_out_date"
                    v-model="form.management_out_date"
                    class="mb-2"
                    :min="form.management_in_date"
                    placeholder="Management OUT Date"
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="No Of Officer">
                  <b-row>
                    <b-col md="6">
                      <b-form-input
                        class="mb-2"
                        label="Deck Officer"
                        placeholder="Deck Officer"
                        v-model.trim="$v.form.no_of_deck_officers.$model"
                      >
                      </b-form-input>
                      <b-form-text id="input-live-help"
                        >No. Of Deck Officers</b-form-text
                      >
                      <!-- <b-alert
                        show
                        variant="danger"
                        class="error mt-1"
                        v-if="!$v.form.no_of_deck_officers.required"
                        >Field is required</b-alert
                      > -->
                      <b-alert
                        show
                        variant="danger"
                        class="error mt-1"
                        v-if="!$v.form.no_of_deck_officers.numeric"
                        >Only Numeric Value</b-alert
                      >
                    </b-col>
                    <b-col md="6">
                      <b-form-input
                        class="mb-2"
                        label="Engine Officer"
                        placeholder="Engine Officer"
                        v-model.trim="$v.form.no_of_engine_officers.$model"
                      >
                      </b-form-input>
                      <b-form-text id="input-live-help"
                        >No. Of Engine Officers</b-form-text
                      >
                      <!-- <b-alert
                        show
                        variant="danger"
                        class="error mt-1"
                        v-if="!$v.form.no_of_engine_officers.required"
                        >Field is required</b-alert
                      > -->
                      <b-alert
                        show
                        variant="danger"
                        class="error mt-1"
                        v-if="!$v.form.no_of_engine_officers.numeric"
                        >Only Numeric Value</b-alert
                      >
                    </b-col>
                  </b-row>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="No Of Rating">
                  <b-row>
                    <b-col md="4">
                      <b-form-input
                        class="mb-2"
                        label="Deck Rating"
                        placeholder="Deck Rating"
                        v-model.trim="$v.form.no_of_deck_rating.$model"
                      >
                      </b-form-input>
                      <b-form-text id="input-live-help"
                        >No. Of Deck Rating</b-form-text
                      >
                      <!-- <b-alert
                        show
                        variant="danger"
                        class="error mt-1"
                        v-if="!$v.form.no_of_deck_rating.required"
                        >Field is required</b-alert
                      > -->
                      <b-alert
                        show
                        variant="danger"
                        class="error mt-1"
                        v-if="!$v.form.no_of_deck_rating.numeric"
                        >Only Numeric Value</b-alert
                      >
                    </b-col>
                    <b-col md="4">
                      <b-form-input
                        class="mb-2"
                        label="Engine Rating"
                        placeholder="Engine Rating"
                        v-model.trim="$v.form.no_of_engine_rating.$model"
                      >
                      </b-form-input>
                      <b-form-text id="input-live-help"
                        >No. Of Engine Rating</b-form-text
                      >
                      <!-- <b-alert
                        show
                        variant="danger"
                        class="error mt-1"
                        v-if="!$v.form.no_of_engine_rating.required"
                        >Field is required</b-alert
                      > -->
                      <b-alert
                        show
                        variant="danger"
                        class="error mt-1"
                        v-if="!$v.form.no_of_engine_rating.numeric"
                        >Only Numeric Value</b-alert
                      >
                    </b-col>
                    <b-col md="4">
                      <b-form-input
                        class="mb-2"
                        label="Galley Rating"
                        placeholder="Galley Rating"
                        v-model.trim="$v.form.no_of_galley_rating.$model"
                      >
                      </b-form-input>
                      <b-form-text id="input-live-help"
                        >No. Of Galley Rating</b-form-text
                      >
                      <!-- <b-alert
                        show
                        variant="danger"
                        class="error mt-1"
                        v-if="!$v.form.no_of_galley_rating.required"
                        >Field is required</b-alert
                      > -->
                      <b-alert
                        show
                        variant="danger"
                        class="error mt-1"
                        v-if="!$v.form.no_of_galley_rating.numeric"
                        >Only Numeric Value</b-alert
                      >
                    </b-col>
                  </b-row>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Nationality Of Officer">
                  <vue-tags-input
                    v-model="searchOfficerNationality"
                    :tags="selectedOfficerNationality"
                    class="tag-custom text-15 mb-2"
                    :autocomplete-items="filteredOfficerNationalityItems"
                    :add-only-from-autocomplete="true"
                    @tags-changed="
                      (newTags) => (selectedOfficerNationality = newTags)
                    "
                    placeholder="Search Nationality Of Officer..."
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Nationality Of Rating">
                  <vue-tags-input
                    v-model="searchRatingNationality"
                    :tags="selectedRatingNationality"
                    class="tag-custom text-15 mb-2"
                    :autocomplete-items="filteredRatingNationalityItems"
                    :add-only-from-autocomplete="true"
                    @tags-changed="
                      (newTags) => (selectedRatingNationality = newTags)
                    "
                    placeholder="Search Nationality Of Rating..."
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
import {
  numeric,
  // required,
  alphaNum,
  minLength,
  decimal,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Vessel Update",
  },
  data() {
    return {
      form: {
        serial_no: "",
        name: "",
        imo_no: "",
        built_date: "",
        dwt: "",
        remarks: "",
        management_in_date: "",
        management_out_date: "",
        no_of_deck_officers: "",
        no_of_engine_officers: "",
        no_of_deck_rating: "",
        no_of_engine_rating: "",
        no_of_galley_rating: "",
        officer_nationalities: [],
        rating_nationalities: [],
      },

      vesseltypeItems: [],
      place_of_builtItems: [],
      countryItems: [],

      searchVesselType: "",
      selectedVesselType: [],

      searchBuiltPlace: "",
      selectedBuiltPlace: [],

      searchOfficerNationality: "",
      selectedOfficerNationality: [],

      searchRatingNationality: "",
      selectedRatingNationality: [],

      submitStatus: null,
    };
  },
  validations: {
    form: {
      serial_no: {
        // required,
        numeric,
      },
      dwt: {
        // required,
        decimal,
        // numeric,
        maxLength: maxLength(9),
      },
      imo_no: {
        // required,
        numeric,
        minLength: minLength(7),
        maxLength: maxLength(7),
      },
      no_of_deck_officers: {
        // required,
        numeric,
      },
      no_of_engine_officers: {
        // required,
        numeric,
      },
      no_of_deck_rating: {
        // required,
        numeric,
      },
      no_of_engine_rating: {
        // required,
        numeric,
      },
      no_of_galley_rating: {
        // required,
        numeric,
      },
      name: {
        alphaNum,
      },
    },
  },
  mounted() {
    this.getMasters();
    this.getData();

    this.form.site_id = this.site.id;
  },
  computed: {
    filteredVesselTypeItems() {
      return this.vesseltypeItems.filter((u) => {
        return (
          u.text.toLowerCase().indexOf(this.searchVesselType.toLowerCase()) !==
          -1
        );
      });
    },
    filteredBuiltPlaceItems() {
      return this.countryItems.filter((c) => {
        return (
          c.text.toLowerCase().indexOf(this.searchBuiltPlace.toLowerCase()) !==
          -1
        );
      });
    },
    filteredOfficerNationalityItems() {
      return this.countryItems.filter((c) => {
        return (
          c.text
            .toLowerCase()
            .indexOf(this.searchOfficerNationality.toLowerCase()) !== -1
        );
      });
    },
    filteredRatingNationalityItems() {
      return this.countryItems.filter((c) => {
        return (
          c.text
            .toLowerCase()
            .indexOf(this.searchRatingNationality.toLowerCase()) !== -1
        );
      });
    },
  },
  methods: {
    async getMasters() {
      this.isLoading = true;
      let masters = await axios.get("vessels/masters");
      masters = masters.data;
      masters.vessel_types.forEach((vesseltype) => {
        this.vesseltypeItems.push({
          id: vesseltype.id,
          text: vesseltype.description,
        });
      });

      masters.place_of_builts.forEach((place_of_built) => {
        this.place_of_builtItems.push({
          id: place_of_built.id,
          text: place_of_built.description,
        });
      });

      masters.countries.forEach((country) => {
        this.countryItems.push({
          id: country.id,
          text: country.description,
        });
      });
      this.isLoading = false;
    },
    async getData() {
      this.isLoading = true;
      let form = await axios.get(`/vessels/${this.$route.params.id}`);
      this.form = form.data.data;
      this.vessel_type = this.form.vessel_type;
      this.place_of_built = this.form.place_of_built;
      this.officer_nationalities = this.form.officer_nationalities;
      this.rating_nationalities = this.form.rating_nationalities;
      this.selectedVesselType.push({
        id: this.vessel_type.id,
        text: this.vessel_type.description,
      });
      this.selectedBuiltPlace.push({
        id: this.place_of_built.id,
        text: this.place_of_built.description,
      });
      this.officer_nationalities.forEach((selected) => {
        let officer = this.countryItems.find((sp) => sp.id == selected);
        this.selectedOfficerNationality.push(officer);
      });
      this.rating_nationalities.forEach((selected) => {
        let rating = this.countryItems.find((sp) => sp.id == selected);
        this.selectedRatingNationality.push(rating);
      });
      this.isLoading = false;
    },
    //   validate form
    async submit() {
      console.log("submit!");
      this.form.dwt = parseFloat(this.form.dwt).toFixed(2)
      if (this.selectedVesselType[0]) {
        this.form.vessel_type_id = this.selectedVesselType[0].id;
      }
      if (this.selectedBuiltPlace[0]) {
        this.form.built_place = this.selectedBuiltPlace[0].id;
      }
      this.form.officer_nationalities = [];
      this.form.rating_nationalities = [];

      this.selectedOfficerNationality.forEach((selected) => {
        this.form.officer_nationalities.push(selected.id);
      });
      this.selectedRatingNationality.forEach((selected) => {
        this.form.rating_nationalities.push(selected.id);
      });
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        try {
          this.isLoading = true;
          await axios.patch(`/vessels/${this.$route.params.id}`, this.form);
          this.isLoading = false;
        } catch (e) {
          this.isLoading = false;
        }
        this.submitStatus = "PENDING";
        this.submitStatus = "OK";
        this.$router.push("/app/vessels");
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
