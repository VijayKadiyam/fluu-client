<template>
  <div class="main-content">
    <breadcumb :page="'Value-List'" :folder="'Value-Lists'" />
    <!-- <div class="wrapper"> -->
    <b-row>
      <b-col md="12" class="mt-4 mb-4">
        <b-card title="Values">
          <b-row>
            <b-col md="9">
              <vue-tags-input
                v-model="searchTerm"
                :tags="selectedValues"
                :max-tags="1"
                class="tag-custom text-15 mb-2"
                :add-only-from-autocomplete="true"
                :autocomplete-items="filteredValueItems"
                @tags-changed="(newTags) => (selectedValues = newTags)"
                placeholder="Type Value Name"
              />
              <!-- {{ searchingStatus }} -->

              <b-progress
                v-if="searchingStatus"
                :value="changeValue"
                :max="max"
                animated
              ></b-progress>
            </b-col>
            <b-col md="3">
              <b-button
                variant="primary"
                class="btn-rounded d-none d-sm-block mb-2"
                @click="save()"
                >Save
              </b-button>
              <div
                v-if="savingStatus"
                class="spinner spinner-primary mr-3"
              ></div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-card>
      <vue-good-table
        :columns="columns"
        :line-numbers="true"
        :search-options="{
          enabled: true,
          placeholder: 'Search this table',
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
        }"
        styleClass="tableOne vgt-table"
        :rows="valueLists"
      >
        <div slot="table-actions-bottom" class="mb-1 mr-2 mt-3 pull-right">
          <b-button
            variant="primary"
            class="btn-rounded d-none d-sm-block"
            @click="addEmptyValueList()"
            ><i class="i-Add text-white mr-2"></i>Add Row
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'sr_no'">
            <b-button
              variant="primary"
              class="btn-rounded d-none d-sm-block"
              @click="deleteValueList(props.row)"
              >X
            </b-button>
          </span>
          <span v-if="props.column.field == 'checked'">
            <label class="switch switch-success mr-3">
              <input
                type="checkbox"
                checked="checkbox"
                v-model="props.row.is_active"
              /><span class="slider"></span>
            </label>
          </span>
          <span v-if="props.column.field == 'description'">
            <b-form-input
              class="mb-2"
              label="Description"
              v-model="props.row.description"
              placeholder="Enter Description"
              @change="
                changeCell(
                  props.row.description,
                  props.row.originalIndex,
                  props.column.field
                )
              "
            >
            </b-form-input>
          </span>
          <span v-if="props.column.field == 'code'">
            <b-form-input
              class="mb-2"
              label="Code"
              v-model="props.row.code"
              placeholder="Enter Code"
              @change="
                changeCell(
                  props.row.code,
                  props.row.originalIndex,
                  props.column.field
                )
              "
            >
            </b-form-input>
          </span>
        </template>
      </vue-good-table>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ValueList",
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Value List",
  },
  data() {
    return {
      columns: [
        {
          label: "Sr No",
          field: "sr_no",
        },
        {
          label: "Description",
          field: "description",
        },
        {
          label: "Code",
          field: "code",
        },
        {
          label: "Active",
          field: "checked",
        },
      ],
      valueLists: [],
      searchingStatus: "",
      savingStatus: "",
      searchTerm: "",
      selectedValues: [],
      valueItems: [],
      // Progress Bar
      changeValue: 0,
      changeMax: 100,
    };
  },
  computed: {
    filteredValueItems() {
      return this.valueItems.filter((v) => {
        return (
          v.text.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1
        );
      });
    },
  },
  watch: {
    selectedValues: "search",
  },
  mounted() {
    this.getMasters();
  },
  methods: {
    async getMasters() {
      let masters = await axios.get("value_lists/masters");
      masters = masters.data;
      masters.values.forEach((value) => {
        this.valueItems.push({
          id: value.id,
          text: value.name,
        });
      });
    },
    async search() {
      this.isLoading = true;
      this.savingStatus = "";
      this.searchingStatus = "Searching...";
      this.changeValue = 50;
      if (this.selectedValues.length > 0) {
        this.changeValue = 100;
        this.valueId = this.selectedValues[0].id;
        let valueLists = await axios.get(`/values/${this.valueId}/value_lists`);
        this.valueLists = valueLists.data.data;
      }
      this.searchingStatus = "";
      this.isLoading = false;
    },
    changeCell(changedData, row, column) {
      this.valueLists[row][column] = changedData;
    },
    async save() {
      this.savingStatus = "Saving...";
      if (this.valueLists.length > 0) {
        this.isSaving = true;
        let payload = {
          datas: this.valueLists,
        };
        let response = await axios.post(
          `/values/${this.valueId}/value_lists_multiple`,
          payload
        );
        this.valueLists = response.data.data;
        this.isSaving = false;
      }
      this.savingStatus = "Saved.";
      this.savingStatus = "";
    },
    addEmptyValueList() {
      this.valueLists.push({
        value_id: this.valueId,
        site_id: this.site.id,
        description: "",
        code: "",
        is_active: 1,
      });
    },
    deleteValueList(row) {
      this.valueLists = this.valueLists.filter((vL) => vL.id != row.id);
    },
  },
};
</script>
<style></style>
