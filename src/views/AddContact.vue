<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const dataContact: any = ref<any>({
  name: "",
  email: "",
  nohp: "",
});
const router = useRouter();

const errorMessage = ref<any>([]);

const addContact = async () => {
  if (dataContact) {
    try {
      await axios.post("http://localhost:3000/contact", {
        name: dataContact.value.name,
        email: dataContact.value.email,
        nohp: dataContact.value.nohp,
      });
      router.push("/contacts");
    } catch (error: any) {
      errorMessage.value = error?.response?.data?.message;
    }
  }
};
</script>
<template>
  <section class="home-contact">
    <div class="row">
      <div class="col-11 col-lg-6 mx-auto">
        <h2 class="mb-3">Form Add Contact</h2>
        <!-- Menampilkan error jika ada -->
          <ul v-if="typeof errorMessage != undefined" :class="errorMessage.length > 0 ? 'list-errors pt-5' : 'd-none'">
            <div class="alert alert-danger" role="alert">
              <li v-for="(item, index) in errorMessage" :key="index">
                • {{ item?.message }}
              </li>
            </div>
          </ul>

        <form @submit.prevent="addContact">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              name="name"
              placeholder="name"
              required
              v-model="dataContact.name"
            />
          </div>
          <div class="mb-3">
            <label for="nohp" class="form-label">No HP</label>
            <input
              type="tel"
              class="form-control"
              id="nohp"
              name="nohp"
              placeholder="08*******"
              required
              v-model="dataContact.nohp"
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              placeholder="name@example.com"
              v-model="dataContact.email"
            />
          </div>
          <div class="mt-4 d-flex gap-3 justify-content-end">
            <a href="/contacts">
              <button type="button" class="btn btn-danger bg-danger">
                Cancel
              </button>
            </a>
            <button type="submit" class="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
