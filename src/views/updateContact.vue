<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const dataContact: any = ref<any>({
  name: "",
  oldname: "",
  email: "",
  nohp: "",
});

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://backend-contacts-apps.vercel.app/contact/${route.params.id}`
    );
    const data = await response?.data?.data;

    if (data) {
      dataContact.value.name = data?.name;
      dataContact.value.oldname = data?.name
      dataContact.value.email = data?.email;
      dataContact.value.nohp = data?.nohp;
    }


  } catch (error) {
    console.log("🚀 ~ onMounted ~ error:", error);
  }
});
const errorMessage = ref<any>([]);
const updateContact = async () => {
    try {
        const response = await axios.put("https://backend-contacts-apps.vercel.app/contact", {
            _id: route.params.id,
            oldname: dataContact.value.oldname,
            name: dataContact.value.name,
            email: dataContact.value.email,
            nohp: dataContact.value.nohp,
        })
        console.log("🚀 ~ updateContact ~ response:", response)
       router.push("/contacts")
    } catch (error: any) {
        errorMessage.value = error?.response?.data?.message
        console.log("🚀 ~ updateContact ~ error:", error)
        
    }
}
</script>
<template>
  <section class="home-contact">
    <div class="row">
      <div class="col-11 col-lg-6 mx-auto">
        <h2 class="mb-3">Form Update Contact</h2>
        <!-- Menampilkan error jika ada -->
        <ul
          v-if="typeof errorMessage != undefined"
          :class="errorMessage.length > 0 ? 'list-errors pt-5' : 'd-none'"
        >
          <div class="alert alert-danger" role="alert">
            <li v-for="(item, index) in errorMessage" :key="index">
              • {{ item?.msg }}
            </li>
          </div>
        </ul>

        <form @submit.prevent="updateContact">
            <input type="text" name="oldname" v-model="dataContact.oldname" />
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
            <button type="submit" class="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
