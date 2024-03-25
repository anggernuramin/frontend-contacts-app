<script lang="ts" setup>
// menggunakan vue composition Api
import { onMounted, ref } from "vue";
import Services from "../components/Services.vue";
import Table from "../components/Table.vue";
import Jumbotron from "../components/Jumbotron.vue";
import { fetchDataContacts } from "../libs/fetchDataContacts";

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

// akan di jalankan ketika component pertama kali  dimuat
onMounted(async () => {
  try {
    const { data, loading, error } = await fetchDataContacts();
    contacts.value = data;
    isLoading.value = loading;
    isError.value = error;
  } catch (err) {
    console.error("Failed to fetch data:", err);
  }
});
</script>

<template>
  <section class="wrapper-main">
    <Jumbotron />
    <section class="container home-contact">
      <div class="row">
        <div class="col-11 col-lg-9 mx-auto">
          <h2 class="fs-1 mb-1 fw-semibold">View all in one place</h2>
          <p class="my-3 mx-auto" style="width: 80%">
            In our Contacts Manager application, you can search by name, making
            it easier to navigate the list and find specific contacts quickly.
          </p>

          <Table :data="contacts" />
        </div>
      </div>
    </section>
    <Services />
  </section>
</template>
