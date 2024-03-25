<script lang="ts" setup>

interface Contact {
  _id: string;
  name: string;
  nohp: number | string;
  email?: string;
  __v?: number;
}

defineProps<{ data: Contact[] }>();
</script>

<template>
  <table class="table wrapper-table">
    <thead>
      <tr>
        <th scope="col">No</th>
        <th scope="col">Name</th>
        <th scope="col">No HandPhone</th>

        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <th class="py-3" scope="row">{{ index + 1 }}</th>
        <td class="py-3">{{ item.name }}</td>
        <td class="py-3">{{ item?.nohp }}</td>
        <td class="d-flex gap-3 py-3 mt-1">
          <span class="badge text-bg-success bg-success d-flex gap-2">
            <i class="bi bi-info-circle"></i>
            Detail</span
          >
          <span class="badge text-bg-danger bg-danger d-flex gap-2">
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
</template>
