<template>
  <div class="main-content">
    <breadcumb :page="'Permissions | List'" :folder="'Permissions'" />
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
        :rows="permissions"
      >
        <div slot="table-actions" class="mb-3">
          <!-- <b-button variant="primary" class="btn-rounded d-none d-sm-block" v-b-modal.modal-1  -->
          <!-- <b-button variant="primary" class="btn-rounded d-none d-sm-block"  to="/app/permissions/create"
            ><i class="i-Add-User text-white mr-2"> </i>Add Site
          </b-button> -->

          <!-- <b-modal id="modal-1" title="BootstrapVue">
            <b-form>
              <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  id="input-1"
                  type="email"
                  required
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Your Name:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  required
                  placeholder="Enter name"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-3"
                label="Food:"
                label-for="input-3"
              >
                <b-form-select
                  id="input-3"
                  :options="foods"
                  required
                ></b-form-select>
              </b-form-group>

              <b-form-group id="input-group-4">
                <b-form-checkbox-group id="checkboxes-4">
                  <b-form-checkbox value="me">Check me out</b-form-checkbox>
                  <b-form-checkbox value="that">Check that out</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
            </b-form>
          </b-modal> -->
        </div>

        <template slot="table-row" slot-scope="props">
          
          <span v-if="props.column.field == 'checkbox'">
            <label class="switch switch-success mr-3">
              <input type="checkbox" checked="checkbox"
              ><span class="slider"></span>
              </label>
           
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
    title: "Permission Manage",
  },
  data() {
    return {
      // foods: ["apple", "orrange"],
      columns: [
        {
          label: "Sr No",
          field: "sr_no",
        },
        {
          label: "Permissions",
          field: "name",
        },
        {
          label: "Admin",
          field: "checkbox",
        },
        {
          label: "Employee",
          field: "checkbox",
        },
        {
          label: "Supervisor",
          field: "checkbox",
        },
        {
          label: "Client",
          field: "checkbox",
        },
      ],
      permissions: [],
      items: [],
    loading: true,
    selected: [],
    };
  },
 async mounted() {
    let permissions = await axios.get('/permissions');
    let roles = await axios.get('/roles?search=all');
    this.permissions = permissions.data.data.filter(p => (p.id != 1) & (p.id != 2) & (p.id != 3) & (p.id != 4) & (p.id != 5))
    this.roles = roles.data.data
    this.roles = this.restrictRolesList(this.roles)
    this.roles.forEach(role => {
      this.headers.push({
        text: role.name,
        value: role.id
      })
    });
    this.updateSelected(this.roles)
    // this.permissions = this.restrictPermissions(this.permissions)
    this.permissions.forEach(item => {
      this.items.push({
        id: item.id,
        name: item.name
      })
    });
    this.loading = false
  },
  methods: {
    async updatePermission(rowId, columnId) { // rowId is permission and columnId is role
      // Assign or unassign permission to role
      let permission_payload = {
        role_id: columnId,
        permission_id: rowId,
      }
      if(this.selected.indexOf(rowId + '' + columnId) == -1)
        await axios.post('/assign_permissions', permission_payload)
      else
        await axios.post('/unassign_permissions', permission_payload)
      this.updateSelected();
    },
    async updateSelected() {
      let roles = await axios.get('/roles?search=all');
      this.roles = roles.data.data
      this.roles = this.restrictRolesList(this.roles)
      this.selected = [];
      roles.data.data.forEach(role => {
        role.permissions.forEach(per => {
          this.selected.push(per.id + '' + role.id)
        })
      })
    },
    restrictRolesList(roles) {
      roles = roles.filter(role => role.name != 'Super Admin')
      // roles = roles.filter(role => role.name != 'Admin')
      return roles;
    },
    restrictPermissions(permissions) {
      permissions = permissions.filter(permission => permission.name != 'Manage Organizations')
      permissions = permissions.filter(permission => permission.name != 'Super Admin Settings')
      return permissions;
    }
  }
};
</script>
<style >
</style>