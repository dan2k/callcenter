<template>
  <nav class="navbar navbar-expand-lg bg-info">
    <div class="container-fluid">
      <!-- <a class="navbar-brand justify-content-center" href="#">HOME</a> -->
      <div><h1><i class="fas fa-people-carry"></i> &nbsp;MOVEMENT</h1></div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              :class="{
                active: $route.path == '/',
              }"
              class="nav-link"
              to="/"
              ><i class="fas fa-home"></i
            ></router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ระบบจัดส่งอุปกรณ์
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link
                  :class="{
                    active: $route.path == '/send/prepare',
                  }"
                  class="nav-link"
                  to="/send/prepare"
                  ><i class="fas fa-shopping-cart"></i> จัดเตรียมอุปกรณ์</router-link>
              </li>
              <li>
                <router-link
                  :class="{
                    active: $route.path == '/send/approve',
                  }"
                  class="nav-link"
                  to="/send/approve"
                  ><i class="far fa-check-square"></i> ยืนยันการจัดส่ง</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ระบบรับอุปกรณ์
            </a>
            <ul class="dropdown-menu">
              <li><router-link
                  :class="{
                    active: $route.path == '/receive',
                  }"
                  class="nav-link"
                  to="/receive"
                  ><i class="fas fa-download"></i> ตรวจรับอุปกรณ์</router-link>
              </li>
              <li><router-link
                  :class="{
                    active: $route.path == '/receive/approve',
                  }"
                  class="nav-link"
                  to="/receive/approve"
                  ><i class="far fa-check-square"></i> ยืนยันการตรวจรับอุปกรณ์</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ระบบรายงาน
            </a>
            <ul class="dropdown-menu">
              <li><router-link
                  :class="{
                    active: $route.path == '/report/send',
                  }"
                  class="nav-link"
                  to="/report/send"
                  ><i class="fas fa-list"></i> รายงานใบจัดส่งอุปกรณ์</router-link>
              </li>
              <li><router-link
                  :class="{
                    active: $route.path == '/report/receive',
                  }"
                  class="nav-link"
                  to="/report/receive"
                  ><i class="fas fa-list"></i> รายงานใบตรวจรับอุปกรณ์</router-link>
              </li>
              <li><router-link
                  :class="{
                    active: $route.path == '/report/equip',
                  }"
                  class="nav-link"
                  to="/report/equip"
                  ><i class="fas fa-list"></i> รายงานสถานะอุปกรณ์</router-link>
              </li>
              
            </ul>
          </li>
          <li class="nav-item" v-if="store.isLogin">
            <a class="nav-link" @click="logout()"><i class="fas fa-sign-out-alt"></i></a>
          </li>
          <!-- <li class="nav-item" v-if="!store.isLogin">
            <a class="nav-link" @click="setLogin()">setLogin</a>
          </li> -->
        </ul>
        
        <i class="fas fa-user"></i> &nbsp;<span v-if="store.isLogin">{{ `${store.userData.ses_empfname} ${store.userData.ses_emplname}`}}</span>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { useAuthStore } from "@/store";
const store = useAuthStore();
const logout = () => {
  store.logout();
};
const setLogin = () => {
  store.setLogin();
};
</script>
<style scoped>
a {
  cursor: pointer;
}
</style>
