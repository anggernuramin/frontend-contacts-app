<script setup lang="ts">
import { useRoute } from "vue-router";
import { watch, ref, onMounted } from "vue";
import Footer from "./components/Footer.vue";
const route = useRoute();
const currentUrl = ref<any>(route.path);

const activeClassName: string = "text-primary"
const defaultClassName: string = "text-dark"

let pageHome: any = "";
let pageAbout: any = "";
let pageContact: any = "";
let pageCli: any = "";

const updatePageClasses = () => {
  pageHome = currentUrl.value === "/" ? activeClassName : defaultClassName;
  pageAbout = currentUrl.value === "/" ? activeClassName : defaultClassName;
  pageContact = currentUrl.value === "/contacts" ? activeClassName : defaultClassName;
  pageCli = currentUrl.value === "/contacts/cli" ? activeClassName : defaultClassName;
}

const showNav = ref<any>("")
  const headerNav = ref<any>("")

onMounted(() => {
  currentUrl.value = route.path;
  updatePageClasses()

  showNav.value = document.querySelector(".menu-trigger")
  headerNav.value = document.querySelector(".header-area .nav")

  console.log("🚀 ~ onMounted ~ showNav:", headerNav.value)

})
const toggleNav = () => {
  console.log("test");
  showNav.value.classList.toggle("active");
  headerNav.value.classList.toggle("active");
}

watch(
  () => route.path,
  (newValue: any, oldValue: any) => {
    if (newValue !== oldValue) {
      currentUrl.value = newValue;
      updatePageClasses()
      // update path sesuai dengan page yang sedang dibuka (memantau ketika ada peubahan maka value dari currentUrl akan berubah)
    }
  }
);
</script>

<template>
  <header class="header-area position-fixed header-sticky wow slideInDown" data-wow-duration="0.75s"
    data-wow-delay="0s">
    <div class="container">
      <div class="row">
        <div class="col-11 mx-auto">
          <nav class="main-nav">
            <a href="index.html" class="logo">
              <img src="/assets/images/user.jpg" alt="User Angger" class="img-logo" />
            </a>
            <ul class="nav">
              <li class="scroll-to-section">
                <router-link to="/" :class="pageHome">Home</router-link>
              </li>
              <li class="scroll-to-section">
                <router-link to="/about" :class="pageAbout
                  ">About</router-link>
              </li>
              <li class="scroll-to-section">
                <router-link to="/contacts" :class="pageContact
                  ">Contacts</router-link>
              </li>

              <li class="scroll-to-section">
                <router-link to="/contacts/cli" :class="pageCli
                  ">CLI</router-link>
              </li>
              <li>
                <div class="gradient-button">
                  <a id="modal_trigger" href="/contacts">Create Contacts</a>
                </div>
              </li>
            </ul>
            <a @click.prevent="toggleNav" class="menu-trigger">
              <span>Menu</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </header>
  <!-- Semua component akan ada didlam main., ini karena diset router pada file main.ts -->
  <main class="">
    <router-view />
  </main>
  <Footer />
</template>

<style scoped></style>
