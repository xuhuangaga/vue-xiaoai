<template>
  <div class="flex statistics_top f-c-w m-b20">
    <div class="s_top_one">
      <div class="flex-j-between a-center">
        <div></div>
        <div>
          <div>今日发布</div>
          <div>{{ releasedTodayCount }}</div>
        </div>
        <div>
          <i class="iconfont icon-gou"></i>
        </div>
      </div>
    </div>
    <div class="s_top_two">
      <div class="flex-j-between a-center">
        <div></div>
        <div>
          <div>原创文章</div>
          <div>{{ original }}</div>
        </div>
        <div>
          <i class="iconfont icon-wenzhang"></i>
        </div>
      </div>
    </div>
    <div class="s_top_three">
      <div class="flex-j-between a-center">
        <div></div>
        <div>
          <div>新留言</div>
          <div>0</div>
        </div>
        <div>
          <i class="iconfont icon-lingdang"></i>
        </div>
      </div>
    </div>
    <div class="s_top_four">
      <div class="flex-j-between a-center">
        <div></div>
        <div>
          <div>新消息</div>
          <div>0</div>
        </div>
        <div>
          <i class="iconfont icon-dianhua"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      releasedTodayCount: 0,
      original: 0
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("/api/article/allArticle")
        .then(res => {
          // console.log(res);
          if (res.data.code === 200) {
            //获取今日日期
            let now = dayjs().format("YYYY-MM-DD");
            let date = null;
            this.releasedTodayCount = res.data.data.filter(item => {
              if (item.date.includes("Z")) {
                date = dayjs(item.date).format("YYYY-MM-DD");
              } 
              return date === now;
            }).length;
            this.original = res.data.data.filter(item => {
              return item.source === "原创";
            }).length;
          }
        })
        .catch(error => {
          console.log(`请求失败.${error}`);
        });
    }
  },
  mounted() {
    //请求数据
    this.getData();
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.statistics_top {
  .s_top_one,
  .s_top_two,
  .s_top_three,
  .s_top_four {
    height: 40px;
    width: 25%;
    padding: 10px 30px;
    text-align: center;
  }
  .s_top_one {
    background: rgb(124, 202, 191);
  }
  .s_top_two {
    background: rgb(232, 138, 135);
  }
  .s_top_three {
    background: rgb(131, 117, 163);
  }
  .s_top_four {
    background: rgb(159, 206, 193);
  }
  .iconfont {
    font-size: 25px;
  }
}
</style>