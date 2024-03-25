<template>
  <section class="container list-contact">
    <div v-if="isError">
      <h1>{{ isError }}</h1>
    </div>
    <div v-else class="row">
      <div class="col-11 col-lg-12 mx-auto wrapper-contact">
        <div class="d-flex justify-content-between my-3">
          <h1>List Contact</h1>

          <form
            @submit.prevent="handleSearchContact"
            class="d-flex search"
            role="search"
          >
            <input
              class=""
              type="search"
              v-model="querySearch"
              name="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="button" type="submit">
              <i class="bi bi-search"></i>
            </button>
          </form>
        </div>

        <div
          v-if="notification"
          id="notification"
          class="alert alert-success"
          role="alert"
        >
          {{ notification }}
        </div>
        <div v-if="isLoading">
          <h1>Loading....</h1>
        </div>
        <table v-if="contacts.length > 0" class="table">
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
                <router-link :to="`/contacts/${item?._id}`">
                  <span class="badge text-bg-primary bg-success d-flex gap-1"
                    ><i class="bi bi-info-circle"></i>Detail</span
                  >
                </router-link>

                <button
                  class="border-0 bg-white"
                  data-bs-toggle="modal"
                  data-bs-target="#modalDelete"
                  @click="() => selectIdDelete(item._id)"
                >
                  <span class="badge text-bg-primary bg-danger d-flex gap-1">
                    <i class="bi bi-trash3-fill"></i>
                    Delete</span
                  >
                </button>

                <router-link :to="`/contact/update/${item._id}`">
                  <span class="badge text-bg-primary bg-warning d-flex gap-1">
                    <i class="bi bi-pencil-fill"></i>Update</span
                  >
                </router-link>
                <!-- moda box confirm delete -->
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>
          <h1>{{ alertContactEmpty }}</h1>
        </div>

        <div class="d-flex justify-content-end align-items-center gap-3">

        <div
          v-if="contacts.length > 0"
          class="d-flex justify-content-end align-items-center gap-2"
        >
          <form @submit.prevent="handleDownloadFile" class="dropdown-file">
            <select
              v-model="selectedFileType"
              name="downloadFile"
              id="downloadFile"
              class="select-file"
            >
              <option value="json" selected>Json</option>
              <!-- <option value="pdf">Pdf</option> -->
              <option value="csv">Csv</option>
            </select>
            <button class="button-file" type="submit">Unduh</button>
          </form>
        </div>

        <div class="d-flex justify-content-end my-4 gradient-button">
          <a href="/contact/add" class="btn btn-primary border-0"
            >Add Contact</a
          >
        </div>
      </div>

      </div>
    </div>
  </section>

  <!-- Modal box --><!-- Modal -->
  <div
    class="modal fade"
    id="modalDelete"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Hapus Contact</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger bg-danger"
            data-bs-dismiss="modal"
          >
            No
          </button>

          <button
            type="button"
            data-bs-dismiss="modal"
            @click="handleDeleteContact"
            class="btn btn-primary bg-primary"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { downloadFile } from "../libs/downloadFile";
import { fetchDataContacts } from "../libs/fetchDataContacts";

// interface Notification {

// }

interface Contact {
  _id: string;
  name: string;
  nohp: number | string;
  email?: string;
  __v: number;
}
const router = useRouter();
let querySearch = ref<string>("");
let contacts = ref<Contact[]>([]);
let alertContactEmpty = ref<string>("");
let isLoading = ref<boolean>(false);
let isError = ref<any>("");
let notification = ref<string>("");
const selectedFileType = ref<string>("json");
const idDelete = ref<any>("");

const handleDownloadFile = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_VUE_APP_API_BASE}contact/download`,
      {
        typeFile: selectedFileType.value,
      }
    );
    // Mengambil data dari respons
    const data = response.data;

    if (selectedFileType.value === "json") {
      downloadFile(JSON.stringify(data), "json");
    } else if (selectedFileType.value === "csv") {
      downloadFile(data, "csv");
    }
  } catch (error) {
    console.log("🚀 ~ handleDownloadFile ~ error:", error);
  }
};

const selectIdDelete = (id: any) => {
  return (idDelete.value = id);
};
const handleDeleteContact = async () => {
  try {
    const response: any = await axios.delete(
      `${import.meta.env.VITE_VUE_APP_API_BASE}contact?id=${idDelete.value}`
    );
    const messageNotif = await response?.data?.message;
    showNotification(messageNotif);

    const { data, loading, error } = await fetchDataContacts("contact");
    contacts.value = data;
    isLoading.value = loading;
    isError.value = error;
    console.log(error);
  } catch (error: any) {
    console.log("error", error);
  }
};

const fetchContactSearch = async () => {
  try {
    // q sesuai dengan search?q=
    const response = await axios.get(
      `${import.meta.env.VITE_VUE_APP_API_BASE}contact/search`,
      {
        params: { q: route.query.q },
      }
    );
    contacts.value = await response?.data?.contacts;
    if (response?.data?.message) {
      alertContactEmpty.value = response?.data?.message;
    }
  } catch (error) {
    console.log("🚀 ~ fetchContactSearch ~ error:", error);
  }
};

const handleSearchContact = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_VUE_APP_API_BASE}search/contact`,
      {
        search: querySearch.value,
      }
    );
    router.push(response?.data?.searchUrl);
  } catch (error) {
    console.log("🚀 ~ handleSearchContact ~ error:", error);
  }
};

const showNotification = (message: string) => {
  notification.value = message;
  setTimeout(() => {
    // hapus notification setelah 3 detik
    notification.value = "";
  }, 3000);
};

// dijalankan ketika pertamakali diakses
onMounted(async () => {
  if (route.query.q) {
    fetchContactSearch();
  } else {
    const { data, loading, error } = await fetchDataContacts("contact");
    contacts.value = data;
    isLoading.value = loading;
    isError.value = error;
  }
});

// Menggunakan watch untuk memantau perubahan pada route.query.q(jika ada perubahan maka akan dijalankan)
watch(
  () => route.query.q,
  (newValue, oldValue) => {
    // new value akan mengambil nilai dari route.query.q(mengambil nilai query q=) dan oldValue akan mengambil nilai newValue yang lama,newValue akan mempunyai nilai yang berubah-ubah
    if (newValue !== oldValue) {
      fetchContactSearch();
    }
  }
);
</script>
