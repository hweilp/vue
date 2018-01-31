<template>
  <div id="DateTimePicker">
    <el-col :span="12">
      <el-form-item :label="label">
        <div class="group1">
          <el-date-picker
            v-model="dateStart"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
          <i class="fa fa-minus linkIcon"></i>
          <el-date-picker
            v-model="dateEnd"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </el-form-item>
    </el-col>

    <el-col :span="12">
      <el-form-item label=""  prop="dateType">
        <el-radio-group v-model="dateType">
          <el-radio
            v-for="item in dateTypeOptions"
            :key="item.value"
            :label="item.value"
          >{{item.label}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-col>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script type="text/javascript">

  export default {
    props: ["label"],
    data(){
      return {
        dateStart: '',
        dateEnd: '',
        dateType:4,
        dateRange: {
          dateStart: '',
          dateEnd: ''
        },
        pickerOptionsEnd: {
          disabledDate: (time) => {
            let beginDateVal = this.dateStart;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        dateTypeOptions: [
          {value: 0, label: "今日"},
          {value: 1, label: "昨天"},
          {value: 2, label: "本周"},
          {value: 3, label: "上周"},
          {value: 4, label: "本月"},
          {value: 5, label: "上月"},
        ],
      }
    },
    watch: {
      dateStart: function (val) {
        this.passDateValue()
      },
      dateEnd: function (val) {
        this.passDateValue()
      },
    },
    methods: {
      formatDate(date){
        if (date) {
          date = new Date(date);
          let y = date.getFullYear();
          let m = date.getMonth() + 1;
          let d = date.getDate();
          let h = date.getHours()
          let min = date.getMinutes()
          let s = date.getSeconds()
          m = m < 10 ? ("0" + m) : m;
          d = d < 10 ? ("0" + d) : d;
          h = h < 10 ? ('0' + h) : h;
          min = min < 10 ? ('0' + min) : min;
          s = s < 10 ? ('0' + s) : s;

          return y + "-" + m + "-" + d + ' ' + h + ':' + min + ':' + s;
        }

      },
      passDateValue(){

        if (this.dateStart) {
          this.dateRange.dateStart = this.formatDate(this.dateStart)
        } else {
          this.dateRange.dateStart = ''
        }

        if (this.dateEnd) {
          this.dateRange.dateEnd = this.formatDate(this.dateEnd)
        } else {
          this.dateRange.dateEnd = ''
        }

        this.$emit("on-get-date", this.dateRange)
      }
    }
  }
</script>
