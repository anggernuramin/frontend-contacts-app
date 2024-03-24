<script lang="ts" setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const { id } = route.params;
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

const idDelete = ref<any>("");

const selectIdDelete = (id: any) => {
  return (idDelete.value = id);
};

const handleDeleteContact = async () => {
  try {
    const response: any = await axios.delete(
      `${import.meta.env.VITE_VUE_APP_API_BASE}contact?id=${idDelete.value}`
    );
    router.push("/contacts");
    console.log("res", response);
  } catch (error: any) {
    console.log("error", error);
  }
};
const fetchDetailContact = async (id: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_VUE_APP_API_BASE}contact/${id}`
    );
    contact.value = response?.data?.data;
  } catch (error: any) {
    console.log("🚀 ~ fetchDetailContact ~ error:", error);
  }
};

onMounted(async () => {
  await fetchDetailContact(String(id));
});
</script>

<template>
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
              <button
                class="border-0 bg-white"
                data-bs-toggle="modal"
                data-bs-target="#modalDelete"
              >
                <span
                  @click="() => selectIdDelete(contact?._id)"
                  class="badge text-bg-danger bg-danger d-flex gap-2"
                >
                  <i class="bi bi-trash3-fill"></i>
                  Delete</span
                >
              </button>

              <router-link :to="`/contact/update/${contact?._id}`">
                <span class="badge text-bg-primary bg-warning d-flex gap-1">
                  <i class="bi bi-pencil-fill"></i>Update</span
                >
              </router-link>
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
