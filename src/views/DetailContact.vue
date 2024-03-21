<script lang="ts" setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const router = useRoute();
const { id } = router.params;
interface Contact {
  _id: string;
  name: string;
  nohp: number;
  email?: string;
  __v: number;
}
const contact = ref<Contact>({
  _id: "",
  name: "",
  nohp: 0,
  __v: 0,
});
const handleDeleteContact = async (id: any) => {
  try {
    const response: any = await axios.delete(
      `https://backend-contacts-apps.vercel.app/contact?id=${id}`
    );
    console.log("klik", id);

    console.log("res", response);
  } catch (error: any) {
    console.log("error", error);
  }
};
const fetchDetailContact = async (id: string) => {
  console.log(id);

  try {
    const response = await axios.get(
      `https://backend-contacts-apps.vercel.app/contact/${id}`
    );
    contact.value = response?.data?.data;
  } catch (error: any) {
    console.log("🚀 ~ fetchDetailContact ~ error:", error.message);
  }
};

onMounted(async () => {
  await fetchDetailContact(String(id));
});
</script>

<template>
  <div class="row pt-5">
    <div v-if="contact" class="col-11 col-lg-9 mx-auto pt-5">
      <h2 class="mb-2">Detail Contact</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">No HandPhone</th>
            <th v-if="contact?.email" scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="py-3" scope="row">{{ contact?.name }}</td>
            <td class="py-3">{{ contact?.nohp }}</td>
            <td v-if="contact?.email" class="py-3">{{ contact?.email }}</td>

            <td class="d-flex gap-3 py-3 mt-1">
              <span @click.prevent="() => handleDeleteContact(contact?._id)" class="badge text-bg-danger bg-danger d-flex gap-2">
                <i class="bi bi-trash3-fill"></i>
                Delete</span
              ><span class="badge text-bg-warning bg-warning d-flex gap-2">
                <i class="bi bi-arrow-repeat"></i>
                Update</span
              >
            </td>
          </tr>
        </tbody>
      </table>

      <a href="/contacts" class="card-link">Back</a>
    </div>

    <div v-else>
      <h1>Loading....</h1>
    </div>
  </div>
</template>
