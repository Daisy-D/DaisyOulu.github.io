<template>
  <div>
    <Menu mode="horizontal" theme="light" active-name="1">
      <MenuItem name="1">
      <Icon type="ios-paper"></Icon>
      内容管理
      </MenuItem>
      <MenuItem name="2">
      <Icon type="ios-people"></Icon>
      用户管理
      </MenuItem>
      <Submenu name="3">
        <template slot="title">
          <Icon type="stats-bars"></Icon>
          统计分析
        </template>
        <MenuGroup title="使用">
          <MenuItem name="3-1">新增和启动</MenuItem>
        </MenuGroup>
      </Submenu>
      <MenuItem name="4">
      <Icon type="settings"></Icon>
      综合设置
      </MenuItem>
    </Menu>
    <router-view></router-view>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>

</style>

