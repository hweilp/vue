<template>
  <div>
    <el-col :span="12">
      <el-form-item :label="label">
        <div class="group">
          <el-form-item prop="dateStart">
            <el-date-picker type="date" placeholder="选择起始日期"
                            v-model="dateStart"></el-date-picker>
          </el-form-item>
          <i class="fa fa-minus linkIcon"></i>
          <el-form-item prop="dateEnd">
            <el-date-picker type="date" placeholder="选择日期" v-model="dateEnd"
                            :picker-options="pickerOptionsEnd"></el-date-picker>
          </el-form-item>
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
<style lang="scss" scoped="">

</style>
<script>
  import Helper from '@/assets/admin/js/helper.js'
  export default {
    props:["label"],
    data (){
      return{
        dateStart:"",
        dateEnd:"",
        dateType:4,
        dateRange:{
          dateStart:'',
          dateEnd:''
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
    watch:{
      dateStart:"passDateValue",
      dateEnd:"passDateValue",
      dateType:"changeDate"
    },
    created(){
      this.changeDate(this.dateType)
    },
    methods:{

      changeDate(curVal,oldVal){
        let date = new Date()
        switch(curVal){
          case 0:
            this.dateStart = this.dateEnd =  date
            this.passDateValue()
            break;
          case 1:
            this.dateStart = date.setTime(date.getTime() - 3600 * 1000 * 24);
            this.dateEnd = this.dateStart;
            this.passDateValue()
            break;
          case 2:
            this.dateEnd = new Date()
            this.dateStart = date.setTime(date.getTime() - 3600 * 1000 * 24 * (date.getDay() - 1));

            this.passDateValue()
            break;
          case 3:
            this.dateStart = date.setTime(date.getTime() - 3600 * 1000 * 24 * (date.getDay() - 1 + 7));
            this.dateEnd = date.setTime( date.getTime() + 3600 * 1000 * 24 * (7 - date.getDay()));
            this.passDateValue()

            break;
          case 4:
            this.dateStart = date.setTime(date.getTime() - 3600 * 1000 * 24 * (date.getDate() - 1));
            this.dateEnd =  new Date()
            this.passDateValue()
            break;
          case 5:
            let preMonthDayCount = new Date(date.getFullYear(),date.getMonth(),0).getDate();
            this.dateStart = date.setTime(date.getTime() - 3600 * 1000 * 24 * (date.getDate() - 1 + preMonthDayCount));
            this.dateEnd = date.setTime( date.getTime() + 3600 * 1000 * 24 * (preMonthDayCount - 1 ) );
            this.passDateValue()
            break;
          default:
        }

      },
      passDateValue(){

        if(this.dateStart){
          this.dateRange.dateStart =  Helper.FG.formatDate(this.dateStart)
        }else{
          this.dateRange.dateStart =  ''
        }

        if(this.dateEnd){
          this.dateRange.dateEnd = Helper.FG.formatDate(this.dateEnd)
        }else{
          this.dateRange.dateEnd =  ''
        }

        this.$emit("on-get-date",this.dateRange)
      }
    },
    components:{

    }
  }
</script>
