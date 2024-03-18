<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { fetchData } from "../../libs/fetchDetailContacts";

// interface Notification {

// }
interface Contact {
  _id: string;
  name: string;
  nohp: number | string;
  email?: string;
  __v: number;
}

let contacts = ref<Contact[]>([]);
let isLoading = ref<boolean>(false);
let isError = ref<any>("");


onMounted(async () => {
  const { data, loading, error } = await fetchData();
  contacts.value = data;
  isLoading.value = loading;
  isError.value = error;
  console.log(error);
});
</script>
<template>
  <section class="container list-contact">
    <!-- <table id="my-table">
    
  </table> -->
  <div v-if="isError">
        <h1>{{ isError }}</h1>
        </div>
    <div v-else class="row">
      <div class="col-11 col-lg-11 mx-auto wrapper-contact">
        <div class="d-flex justify-content-between my-3">
          <h1>List Contact</h1>
          <form
            action="/search/contact"
            method="post"
            class="d-flex search"
            role="search"
          >
            <input
              class=""
              type="search"
              name="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="button" type="submit">
              <i class="bi bi-search"></i>
            </button>
          </form>
        </div>

        

        <!-- <% if (notification.length !== 0) { %>
      <div id="notification" class="alert alert-success" role="alert">
        <%= notification %>
      </div>
      <% } %> <% if (contacts.length > 0) { %> -->
        <div v-if="isLoading">
          <h1>Loading....</h1>
        </div>

        <table v-else class="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">No HandPhone</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in contacts" :key="item._id">
              <th class="py-3" scope="row">{{ index + 1 }}</th>
              <td class="py-3">{{ item?.name }}</td>
              <td class="py-3">{{ item?.nohp }}</td>
              <td class="py-3">
                {{ item?.email ? item?.email : "none" }}
              </td>
              <td class="d-flex gap-3 py-3">
                <a href="/contact/<%= item.id %>">
                  <span class="badge text-bg-primary bg-success d-flex gap-1"
                    ><i class="bi bi-info-circle"></i>Detail</span
                  >
                </a>
                <!-- Mengoverride http method -->
                <button
                  id="button-delete"
                  type="button"
                  class="button"
                  data-bs-toggle="modal"
                  data-bs-target="#modalDelete"
                  data-id="<%= item.id %>"
                >
                  <span class="badge text-bg-primary bg-danger d-flex gap-1">
                    <i class="bi bi-trash3-fill"></i>

                    Delete</span
                  >
                </button>

                <a href="/contact/update/<%= item.id %>">
                  <span class="badge text-bg-primary bg-warning d-flex gap-1">
                    <i class="bi bi-pencil-fill"></i>Update</span
                  >
                </a>
                <!-- moda box confirm delete -->
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="contacts.length > 0" class="d-flex justify-content-end align-items-center gap-2">
          
          <form action="/contact/download" method="post">
            <select name="downloadFile" id="downloadFile">
              <option value="Json" selected>Json</option>
              <option value="Pdf">Pdf</option>
              <option value="csv">Csv</option>
            </select>
            <button type="submit">Unduh</button>
          </form>
          <div class="d-flex justify-content-end my-4 gradient-button">
            <a href="/contact/add" class="btn btn-primary border-0"
              >Add Contact</a
            >
          </div>
        </div>

        
      </div>
    </div>
  </section>
</template>
