<template>
  <div class="main-content">
    <breadcumb :page="'User Login Question Lists'" :folder="'User Login Questions'" />
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
        :rows="userLoginQuestins"
      >
        <div slot="table-actions" class="mb-3">
          <b-button
            variant="primary"
            class="btn-rounded d-none d-sm-block"
            to="/app/user-login-questions/create"
            ><i class="i-Add text-white mr-2"> </i>Add User Login Question
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'button'">
            <router-link
              :to="'/app/user-login-questions/' + props.row.id"
              class="btn btn-primary d-none d-sm-block mb-2 mr-2"
              v-b-tooltip.hover
              title="Edit User Login Question Details"
            >
              <i class="i-Eraser-2"></i> EDIT
            </router-link>
          </span>
          <span v-else-if="props.column.field == 'gender'">
            {{ props.row.gender == 0 ? "Male" : "Female" }}
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
    title: "User Login Question Lits",
  },
  data() {
    return {
      columns: [
        {
          label: "First Name",
          field: "user.first_name",
        },
        {
          label: "Last Name",
          field: "user.last_name",
        },
        {
          label: "Middle Name",
          field: "user.middle_name",
        },
        {
          label: "Description",
          field: "login_question.description",
        },
        {
          label: "Answer",
          field: "answer",
        },
        {
          label: "Selected Option",
          field: "selected_option",
        },
        {
          label: "Action",
          field: "button",
          html: true,
          tdClass: "text-right",
          thClass: "text-right",
        },
      ],
      userLoginQuestins: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.isLoading = true;
      let userLoginQuestins = await axios.get(`user_login_questions`);
      // let userLoginQuestins = await axios.get(`user_login_questions?user_id=3`);
      this.userLoginQuestins = userLoginQuestins.data.data;
      // this.count = userLoginQuestins.data.count;
      // this.serialNoStarting = (page - 1) * this.rowsPerPage;
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
