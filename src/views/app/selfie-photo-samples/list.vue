<template>
  <div class="main-content">
    <breadcumb
      :page="'Selfie Photo Samples Lists'"
      :folder="'Selfie Photo Sampless'"
    />
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
        :rows="selfie_photo_samples"
      >
        <div slot="table-actions" class="mb-3">
          <b-button
            variant="primary"
            class="btn-rounded d-none d-sm-block"
            to="/app/selfie-photo-samples/create"
            ><i class="i-Add text-white mr-2"> </i>Add Selfie Photo Samples
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'button'">
            <router-link
              :to="'/app/selfie-photo-samples/' + props.row.id"
              class="btn btn-primary d-none d-sm-block mb-2 mr-2"
              v-b-tooltip.hover
              title="Edit User Details"
            >
              <i class="i-Eraser-2"></i> EDIT
            </router-link>
          </span>
          <span v-else-if="props.column.field == 'image_path'">
            <a target="_blank" :href="`${mediaUrl}${props.row.image_path}`">
              <img
                :src="`${mediaUrl}${props.row.image_path}`"
                width="50"
                height="50"
              />
            </a>
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
          label: "Title",
          field: "title",
        },
        {
          label: "Image",
          field: "image_path",
        },
        {
          label: "Action",
          field: "button",
          html: true,
          tdClass: "text-right",
          thClass: "text-right",
        },
      ],
      selfie_photo_samples: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.isLoading = true;
      let selfie_photo_samples = await axios.get(`selfie_photo_samples`);
      this.selfie_photo_samples = selfie_photo_samples.data.data;
      // this.count = users.data.count;
      // this.serialNoStarting = (page - 1) * this.rowsPerPage;
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
