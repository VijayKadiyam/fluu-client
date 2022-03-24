<template>
  <div class="main-content">
    <breadcumb :page="'Login Question Lists'" :folder="'Login Questions'" />
    <!-- <div class="wrapper"> -->
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
        :rows="loginQuestions"
      >
        <div slot="table-actions" class="mb-3">
          <b-button
            variant="primary"
            class="btn-rounded d-none d-sm-block"
            to="/app/login-questions/create"
            ><i class="i-Add text-white mr-2"> </i>Add Login Question
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'button'">
            <router-link
              :to="'/app/login-questions/' + props.row.id"
              class="btn btn-primary d-none d-sm-block mb-2 mr-2"
              v-b-tooltip.hover
              title="Edit User Details"
            >
              <i class="i-Eraser-2"></i> EDIT
            </router-link>
          </span>
          <span v-else-if="props.column.field == 'is_active'">
            {{ props.row.is_active == 1 ? "Yes" : "No" }}
          </span>
          <span v-else-if="props.column.field == 'is_mcq'">
            {{ props.row.is_mcq == 1 ? "Yes" : "No" }}
          </span>
          <span v-else-if="props.column.field == 'is_text'">
            {{ props.row.is_text == 1 ? "Yes" : "No" }}
          </span>
          <span v-else-if="props.column.field == 'is_voice'">
            {{ props.row.is_voice == 1 ? "Yes" : "No" }}
          </span>
          <span v-else-if="props.column.field == 'is_video'">
            {{ props.row.is_video == 1 ? "Yes" : "No" }}
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
    title: "User Lits",
  },
  data() {
    return {
      columns: [
        {
          label: "Description",
          field: "description",
        },
        {
          label: "Sub Description",
          field: "sub_description",
        },
        {
          label: "Option 1",
          field: "option_1",
        },
        {
          label: "Option 2",
          field: "option_2",
        },
        {
          label: "Option 3",
          field: "option_3",
        },
        {
          label: "Option 4",
          field: "option_4",
        },
        {
          label: "Is Active",
          field: "is_active",
        },
        {
          label: "Is MCQ",
          field: "is_mcq",
        },
        {
          label: "Is Text",
          field: "is_text",
        },
        {
          label: "Is Voice",
          field: "is_voice",
        },
        {
          label: "Is Video",
          field: "is_video",
        },
        {
          label: "Action",
          field: "button",
          html: true,
          tdClass: "text-right",
          thClass: "text-right",
        },
      ],
      loginQuestions: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.isLoading = true;
      let loginQuestions = await axios.get(`login_questions`);
      this.loginQuestions = loginQuestions.data.data;
      // this.count = users.data.count;
      // this.serialNoStarting = (page - 1) * this.rowsPerPage;
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
