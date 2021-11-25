<template>
  <div class="main-content">
    <breadcumb :page="'Permissions | List'" :folder="'Permissions'" />
    <b-card>

      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Id</th>
            <th
            v-for="(header, h) in headers"
            :key="`header${h}`"
            >
            {{ header.text }}
            </th>
          </tr>
        </thead>
        <tbody>
        <tr
            v-for="(item, i) in items"
            :key="`item${i}`"
        > 
            <td>{{ i + 1 }}</td>
            <td>PER{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td 
            v-for="(header, i) in headers.slice(1)"
            :key="i"
            >
            <div class="form-check">
                <input type="checkbox"
                hide-details 
                v-model="selected"
                :value="item.id + '' + header.value"
                @click="updatePermission(item.id, header.value)"
                >
            </div>
            </td>
        </tr>
        </tbody>
      </table>
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
          label: "Main Admin",
          field: "checkbox",
        },
        {
          label: "Admin",
          field: "checkbox",
        }
      ],
      headers: [
        { text: 'Permissions', value: 'permissions' }
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
    // this.permissions = permissions.data.data.filter(p => (p.id != 1) & (p.id != 2) & (p.id != 3) & (p.id != 4) & (p.id != 5))
    this.permissions = permissions.data.data
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