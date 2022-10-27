<template>
    <div class="container">
        <div class="row" v-if="store.isLogin">
            <div class="col-md-5 col-sm-8 mx-auto">
                <div class="alert alert-primary rounded-pill text-center mb-2" role="alert">
                    {{store.custpdesc}}
                    <!-- <span style="cursor:pointer" @click="logout"><i class="fas fa-sign-out-alt float-end text-danger" ></i></span> -->
                </div>
            </div>
        </div>
        <router-view></router-view>
        
    </div>
   <!-- <h1>Main</h1>
   <button class="btn btn-primary" @click="logout">logout</button> -->
    
</template>
<style scoped>
    div.alert.alert-primary{
        font-size:20px;
        font-weight: bolder;
    }
    
</style>
<script setup>
    import { useAuthStore } from '@/store';
    // import { onMounted } from 'vue';
    const store = useAuthStore()
    // const logout =()=>{
    //     store.logout()
    // }
    // onMounted(()=>{
    //     // console.log(store.isLogin,store.custpdesc)
    // })
</script>