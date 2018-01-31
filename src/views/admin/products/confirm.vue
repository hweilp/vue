<template>

    <!-- 确认提示框 -->

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        size="tiny"
        :before-close="handleClose">
        <span>确认删除数据</span>
        <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
      </el-dialog>

</template>

<style lang="scss" scoped="">

</style>
<script type="text/javascript">
  import MIXIN from "@/assets/admin/js/mixins.js"
  export default{
    mixins: [MIXIN],
    data() {
      return {

      };
    },
    methods: {

    }

  }
</script>
