import { useRoute } from 'vue-router';
<template>
    <h1>Search Page</h1>
    <h1>Search query : {{ query }}</h1>
    <section class="container list-contact">
    <div v-if="isError">
      <h1>{{ isError }}</h1>
    </div>
    <div v-else class="row">
      <div class="col-11 col-lg-11 mx-auto wrapper-contact">
        <div class="d-flex justify-content-between my-3">
          <h1>List Contact</h1>


          <form @submit.prevent="handleSearchContact" class="d-flex search" role="search">
            <input class="" type="search" v-model="querySearch" name="search" placeholder="Search" aria-label="Search" />
            <button class="button" type="submit">
              <i class="bi bi-search"></i>
            </button>
          </form>
        </div>

        <div v-if="notification" id="notification" class="alert alert-success" role="alert">
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
                  <span class="badge text-bg-primary bg-success d-flex gap-1"><i
                      class="bi bi-info-circle"></i>Detail</span>
                </router-link>
                <!-- Mengoverride http method -->
                <button @click="() => handleDeleteContact(item._id)">
                  <span class="badge text-bg-primary bg-danger d-flex gap-1">
                    <i class="bi bi-trash3-fill"></i>
                    Delete</span>
                </button>

                <router-link :to="`/contact/update/${item._id}`">
                  <span class="badge text-bg-primary bg-warning d-flex gap-1">
                    <i class="bi bi-pencil-fill"></i>Update</span>
                </router-link>
                <!-- moda box confirm delete -->
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>
            <h1>{{ alertContactEmpty }}</h1>
        </div>

        <div v-if="contacts.length > 0" class="d-flex justify-content-end align-items-center gap-2">
          <form action="/contact/download" method="post">
            <select name="downloadFile" id="downloadFile">
              <option value="Json" selected>Json</option>
              <option value="Pdf">Pdf</option>
              <option value="csv">Csv</option>
            </select>
            <button type="submit">Unduh</button>
          </form>
        </div>

          <div class="d-flex justify-content-end my-4 gradient-button">
            <a href="/contact/add" class="btn btn-primary border-0">Add Contact</a>
          </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute()
const query = route.query.q 
import { onMounted, ref } from "vue";
import axios from "axios";
import { fetchData } from "../libs/fetchDetailContacts";
import { useRouter } from "vue-router";
// import ModalBox from "../components/ModalBox.vue";

// interface Notification {

// }

interface Contact {
  _id: string;
  name: string;
  nohp: number | string;
  email?: string;
  __v: number;
}
const router = useRouter()
let querySearch = ref<string>("");
let contacts = ref<Contact[]>([]);
let alertContactEmpty = ref<string>("")
let isLoading = ref<boolean>(false);
let isError = ref<any>("");
let notification = ref<string>("")

const handleDeleteContact = async (id: any) => {
  try {
    const response: any = await axios.delete(
      `http://localhost:3000/contact?id=${id}`
    );
    const messageNotif = await response?.data?.message
    showNotification(messageNotif)


    const { data, loading, error } = await fetchData();
    contacts.value = data;
    isLoading.value = loading;
    isError.value = error;
    console.log(error);

    // router.push("/contacts")
  } catch (error: any) {
    console.log("error", error);
  }
};

const fetchContactSearch = async () => {
    try {
        // q sesuai dengan search?q=
           const response = await axios.get('http://localhost:3000/contact/search', {
            params: {q: route.query.q}
           });
           contacts.value = await response?.data?.contacts
           console.log("res",);
           if(response?.data?.message){
            alertContactEmpty.value = response?.data?.message
           }
           
    } catch (error) {
        console.log("🚀 ~ fetchContactSearch ~ error:", error)
        
    }
}

const handleSearchContact = async () => {
  try {
    const response = await axios.post(`http://localhost:3000/search/contact`, {
      search: querySearch.value
    })
    console.log("🚀 ~ handleSearchContact ~ response:", response)

    router.push(response?.data?.searchUrl)
  } catch (error) {
    console.log("🚀 ~ handleSearchContact ~ error:", error)
    
  }
  console.log(querySearch.value);
}
const showNotification = (message: string)  => {
  notification.value = message
  setTimeout(() => {
    // hapus notification setelah 3 detik
  notification.value = ""
  },3000)
}



onMounted(async () => {
  
  if(query){
    console.log("ada query");
    fetchContactSearch()
  }else{
    const { data, loading, error } = await fetchData();
  contacts.value = data;
  isLoading.value = loading;
  isError.value = error;
  console.log(error);

    console.log("query tidak ada");
  }
});

</script>