<template>
  <div>
    <Top></Top>
    <BrokenLine></BrokenLine>
    <Radar></Radar>
    <Footer></Footer>
  </div>
</template>

<script>
import Top from '../components/home/top/Top'
import BrokenLine from '../components/home/brokenline/BrokenLine'
import Radar from '../components/home/radar/Radar'
import Footer from '../components/home/footer/Footer'
export default {
  name: '',
  props:{},
  data () {
    return {
    }
  },
  components: {
    Top,
    BrokenLine,
    Radar,
    Footer
  },
  methods: {
    
  },
  mounted() {
  },
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>

</style>