<template>
  <div>
    <Top></Top>
    <Middle></Middle>
    <Footer></Footer>
  </div>
</template>

<script>
import Top from '../../components/statistics/top/Top'
import Middle from '../../components/statistics/middle/Middle'
import Footer from '../../components/statistics/footer/Footer'
export default {
  name: '',
  props:{},
  data () {
    return {
    }
  },
  components: {
    Top,
    Middle,
    Footer
  },
  methods: {},
  mounted() {},
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>

</style>