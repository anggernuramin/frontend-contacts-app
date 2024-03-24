<script setup lang="ts">
import { useRoute } from 'vue-router';
import { watch, ref, onMounted } from 'vue';
const route = useRoute()
const currentUrl = ref<any>("")

onMounted(() => {
  currentUrl.value = route.path
  console.log("🚀 ~ onMounted ~ value:", currentUrl.value)
})

watch(() => route.path, (newValue: any, oldValue: any) => {
  if(newValue !== oldValue){
    currentUrl.value = newValue
  console.log("🚀 ~ onMounted ~ value:", currentUrl.value)

  }
})
</script>

<template>
  <header
    class="header-area position-fixed header-sticky wow slideInDown"
    data-wow-duration="0.75s"
    data-wow-delay="0s"
  >
    <div class="container">
      <div class="row">
        <div class="col-11 mx-auto">
          <nav class="main-nav">
            <a href="index.html" class="logo">
              <img
                src="/assets/images/user.jpg"
                alt="User Angger"
                class="img-logo"
              />
            </a>
            <ul class="nav">
              <li class="scroll-to-section">
                <router-link to="/" :class="currentUrl.value === '/' ? 'link-active ' : 'link-not-active ' ">Home</router-link>
              </li>
              <li class="scroll-to-section">
                <router-link to="/contacts" :class="currentUrl.value === '/contacts' ? 'link-active' : 'link-not-active' ">Contacts</router-link>
              </li>
              <li class="scroll-to-section">
                <router-link to="/about" :class="currentUrl.value === '/about' ? 'link-active' : 'link-not-active' ">About</router-link>
              </li>
              <li class="scroll-to-section">
                <router-link to="/contacts/cli" :class="currentUrl.value === '/contacts/cli' ? 'link-active' : 'link-not-active' ">CLI</router-link>
              </li>
              <li>
                <div class="gradient-button">
                  <a id="modal_trigger" href="/contact">Create Contacts</a>
                </div>
              </li>
            </ul>
            <a class="menu-trigger">
              <span>Menu</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </header>
  <!-- Semua component akan ada didlam main., ini karena diset router pada file main.ts -->
  <div class="main">
    <router-view />
  </div>

</template>

<style scoped></style>
