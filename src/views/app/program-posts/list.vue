<template>
  <div class="main-content">
    <breadcumb :page="'Program Posts'" :folder="'Program Posts'" />
    <!-- <div class="wrapper"> -->
    <b-row>
      <b-col md="12" class="mt-4 mb-4">
        <b-card title="Programs">
          <b-row>
            <b-col md="9">
              <vue-tags-input
                v-model="searchTerm"
                :tags="selectedProgram"
                :max-tags="1"
                class="tag-custom text-15"
                :add-only-from-autocomplete="true"
                :autocomplete-items="filteredProgramItems"
                @tags-changed="(newTags) => (selectedProgram = newTags)"
                placeholder="Type Program Name"
              />
              {{ searchingStatus }}
            </b-col>
            <b-col md="3">
              <b-button
                variant="primary"
                class="btn-rounded d-none d-sm-block"
                @click="save()"
                >Save
              </b-button>
              {{ savingStatus }}
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
          enabled: false,
          placeholder: 'Search this table',
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
        }"
        styleClass="tableOne vgt-table"
        :rows="programPosts"
      >
        <div slot="table-actions-bottom" class="mb-1 mr-2 mt-3 pull-right">
          <b-button
            variant="primary"
            class="btn-rounded d-none d-sm-block"
            @click="addEmptyProgramPost()"
            ><i class="i-Add text-white mr-2"></i>Add Row
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'sr_no'">
            <b-button
              variant="primary"
              class="btn-rounded d-none d-sm-block"
              @click="deleteProgramPost(props.row.originalIndex)"
              >X
            </b-button>
          </span>
          <span v-if="props.column.field == 'serial_no'">
            <b-form-input
              class="mb-2"
              label="Serial No"
              v-model="props.row.serial_no"
              placeholder="Enter Serial No"
              @change="
                changeCell(
                  props.row.serial_no,
                  props.row.originalIndex,
                  props.column.field
                )
              "
            >
            </b-form-input>
          </span>
          <span v-if="props.column.field == 'post_id'">
            <vue-tags-input
              v-model="searchPost"
              :tags="selectedPost"
              :max-tags="1"
              class="tag-custom text-15"
              :add-only-from-autocomplete="true"
              :autocomplete-items="postfilteredItems"
              @tags-changed="
                (newTags) =>
                  changeCell(
                    newTags[0]['id'],
                    props.row.originalIndex,
                    props.column.field
                  )
              "
              placeholder="Type Post Name"
            />
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
    title: "Program Post",
  },
  data() {
    return {
      columns: [
        {
          label: "Sr No",
          field: "sr_no",
        },
        {
          label: "Serial No",
          field: "serial_no",
        },
        {
          label: "Post ID",
          field: "post_id",
        },
      ],
      tag: "",

      programPosts: [
        {
          serial_no: "",
          post_id: "",
        },
      ],
      //   auto complete
      program: "",
      selectedProgram: [],
      programItems: [],
      searchPost: "",
      selectedPost: [],
      postItems: [],
      searchingStatus: "",
      savingStatus: "",
      searchTerm: "",
    };
  },
  computed: {
    filteredProgramItems() {
      return this.programItems.filter((p) => {
        return (
          p.text.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1
        );
      });
    },
    postfilteredItems() {
      return this.postItems.filter((pp) => {
        return (
          pp.text.toLowerCase().indexOf(this.searchPost.toLowerCase()) !== -1
        );
      });
    },
  },
  watch: {
    selectedProgram: "search",
  },
  mounted() {
    this.getMasters();
  },
  methods: {
    async getMasters() {
      let masters = await axios.get("program_posts/masters");
      masters = masters.data;
      masters.programs.forEach((program) => {
        this.programItems.push({
          id: program.id,
          text: program.program_name,
        });
      });
      masters.posts.forEach((post) => {
        this.postItems.push({
          id: post.id,
          text: post.description,
        });
      });
    },
    async search() {
      console.log('123')
      this.isLoading = true;
      this.savingStatus = "";
      this.searchingStatus = "Searching...";
      if (this.selectedProgram.length > 0) {
        this.programId = this.selectedProgram[0].id;
        let programPosts = await axios.get(
          `/programs/${this.programId}/program_posts`
        );
        this.programPosts = programPosts.data.data;
        this.programPosts.forEach((programPost) => {
          // console.log(i);
          this.selectedPost.push({
            id: programPost.post.id,
            text: programPost.post.description,
          });
        });
        // console.log(this.selectedPosts);
      }
      this.searchingStatus = "";
      this.isLoading = false;
    },
    changeCell(changedData, row, column) {
      this.selectedPosts = this.newTags;
      this.programPosts[row][column] = changedData;
      console.log(this.programPosts);
    },
    async save() {
      this.savingStatus = "Saving...";
      if (this.programPosts.length > 0) {
        this.isSaving = true;
        let payload = {
          datas: this.programPosts,
        };
        console.log(this.programPosts);
        let response = await axios.post(
          `/programs/${this.programId}/program_posts_multiple`,
          payload
        );
        this.programPosts = response.data.data;
        this.isSaving = false;
      }
      this.savingStatus = "Saved.";
    },
    addEmptyProgramPost() {
      // this.selectedPosts="";
      this.programPosts.push({
        program_id: this.programId,
        site_id: this.site.id,
        serial_no: "",
        post_id: "",
        is_active: 1,
      });
    },
    deleteProgramPost(row) {
      // this.selectedPosts[row]='';
      console.log(row);
      this.programPosts = this.programPosts.filter((pp) => pp.id != row.id);
      // this.progranPosts.splice(this.progranPosts.index, 1);
    },
  },
};
</script>
<style >
</style>
