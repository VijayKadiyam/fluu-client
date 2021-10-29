<template>
  <div class="main-content">
    <breadcumb :page="'User Program Task'" :folder="'User Program Tasks'" />
    <!-- <div class="wrapper"> -->
    <b-row>
      <b-col md="12" class="mt-4 mb-4">
        <b-card title="Users">
          <vue-tags-input
            v-model="searchUser"
            :tags="selectedUser"
            :max-tags="1"
            class="tag-custom text-15 mb-2"
            :autocomplete-items="filteredUserItems"
            :add-only-from-autocomplete="true"
            @tags-changed="(newTags) => (selectedUser = newTags)"
            placeholder="Type User Name"
          />
          <!-- {{ searchingStatus }} -->
          <!-- <div v-if="searchingStatus" class="spinner spinner-primary mr-3"></div> -->
          <b-progress
            v-if="searchingStatus"
            :value="changeValue"
            :max="max"
            animated
          ></b-progress>
        </b-card>
      </b-col>
    </b-row>
    <b-card>
      <vue-good-table
        :columns="columns"
        :line-numbers="true"
        :search-options="{
          enabled: false,
          placeholder: 'Search this table',
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
        }"
        styleClass="tableOne vgt-table"
        :rows="user_programs"
        foot-clone
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'button'">
            <b-button
              variant="primary"
              class="btn-rounded d-none d-sm-block"
              :to="'/app/user-program/' + props.row.id + '/user-program-tasks'"
              ><i class="i-Eye text-white mr-2"> View Tasks</i>
            </b-button>
          </span>
          <span v-if="props.column.field == 'program'">
            {{ props.row.program.program_name || "" }}
          </span>
          <span v-if="props.column.field == 'description'">
            {{ props.row.program.program_description || "" }}
          </span>
          <span v-if="props.column.field == 'instructor'">
            {{ props.row.program.instructor || "" }}
          </span>
          <span v-if="props.column.field == 'hours'">
            {{ props.row.program.hours || "" }}
          </span>
        </template>
      </vue-good-table>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "User Program Tasks",
  },
  data() {
    return {
      columns: [
        {
          label: "Program Name",
          field: "program",
        },
        {
          label: "Description",
          field: "description",
        },
        {
          label: "Instructor",
          field: "instructor",
        },
        {
          label: "Hours",
          field: "hours",
        },
        {
          label: "Task Detail",
          field: "button",
        },
      ],
      searchingStatus: "",
      user_programs: [],
      //   auto complete
      searchUser: "",
      selectedUser: [],
      userItems: [],

      // Progress Bar
      changeValue: 0,
      changeMax: 100,
    };
  },
  watch: {
    selectedUser: "searchUserProgram",
  },
  computed: {
    filteredUserItems() {
      return this.userItems.filter((u) => {
        return (
          u.text.toLowerCase().indexOf(this.searchUser.toLowerCase()) !== -1
        );
      });
    },
  },
  mounted() {
    // this.form.site_id = this.site.id;
    this.getMasters();
  },
  methods: {
    async getMasters() {
      this.isLoading = true;
      let users = await axios.get(`users`);
      this.users = users.data.data;

      // User
      this.users.forEach((user) => {
        this.userItems.push({
          id: user.id,
          text: user.user_name,
        });
      });

      this.isLoading = false;
    },
    async searchUserProgram() {
      this.isLoading = true;
      this.savingStatus = "";
      this.searchingStatus = "Searching...";
      this.changeValue = 50;

      if (this.selectedUser.length > 0) {
        this.changeValue = 100;
        this.user_Id = this.selectedUser[0].id;
        let user_programs = await axios.get(
          `/user_programs?search=${this.user_Id}`
        );
        this.user_programs = user_programs.data.data;
      } else {
        this.user_programs = [];
      }
      this.searchingStatus = "";
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
