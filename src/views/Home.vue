<script lang="ts" setup>
// menggunakan vue composition Api
import { Ref, onMounted, ref } from "vue";
import { fetchData } from '../../libs/fetchContacts';
import HelloWorld from "../components/HelloWorld.vue";
import Table from "../components/Table.vue";
import Jumbotron from "../components/Jumbotron.vue";

interface Contact {
    name: string
    email: string
    nohp: number
}

const laga = ref<Contact[]>([]); 

// akan di jalankan ketika component pertama kali  dimuat
onMounted(async () => {
  try {
    const response = await fetchData();
    laga.value = response.data; // Isi variabel laga dengan hasil pemanggilan fetchData
    laga.value.map((item) => {
      Number(item.nohp); // Membuat nomor handphone menjadi tipe data number
    })
  } catch (err) {
    console.error('Failed to fetch data:', err);
  }
});

</script>

<template>
     <main class="wrapper-main">
    <Jumbotron />
    <section class="container home-contact">
      <div class="row">
        <div class="col-11 col-lg-9 mx-auto">
          <h2 class="fs-1 mb-1 fw-semibold">
            View all your contacts in one place.
          </h2>
          <p class="mb-3">
            In our Contacts Manager application, you can search by name, making
            it easier to navigate the list and find specific contacts quickly.
          </p>

          <Table :data="laga" />
        </div>
      </div>
      
    </section>
  </main>
  <HelloWorld msg="Vite + Vue" />
</template>