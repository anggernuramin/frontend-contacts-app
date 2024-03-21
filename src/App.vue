<script setup lang="ts">


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
              <img src="/assets/images/user.jpg" alt="User Angger" class="img-logo" />
            </a>
            <ul class="nav">
              <li class="scroll-to-section">
                <router-link to="/">Home</router-link>
              </li>
              <li class="scroll-to-section">
                <a href="/contacts">Contacts</a>
              </li>
              <li class="scroll-to-section">
                <router-link to="/about">About</router-link>
              </li>
              <li class="scroll-to-section">
                <a href="/cli">CLI</a>
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
  <main>
    <router-view />
  </main>
 
</template>

<style scoped></style>
