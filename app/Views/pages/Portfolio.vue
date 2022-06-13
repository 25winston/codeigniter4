<template>
  <div>
    <h1>Portfolio {{ text }}</h1>

    <p>The page you are looking at is being generated dynamically by CodeIgniter.</p>

    <p>If you would like to edit this page you will find it located at:</p>

    <pre><code>app/Views/welcome_message.php</code></pre>

    <p>The corresponding controller for this page can be found at:</p>

    <pre><code>app/Controllers/Home.php</code></pre>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  components: {},
  setup() {
    const text = 'test'
    // const count = ref(0)
    // const inc = () => {
    //   count.value++
    // }
    return {
      text,
      // count,
      // inc,
    }
  },
  mounted() {},
}
</script>
