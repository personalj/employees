<template>
    <div class="app-main">
        <Header />
        <router-view />
    </div>
</template>
<script>
import Header from '@/components/header'
export default {
    components: {
        Header
    }
}
</script>
