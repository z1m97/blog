module.exports = {
  //可选类型
  types: [
    { name: '✨ feat:     新功能', value: ':sparkles: feat' },
    { name: '🐛 fix:      修复bug', value: ':bug: fix' },
    { name: '🚀 chore:    构建/工程依赖/工具', value: ':rocket: chore' },
    { name: '✏️  docs:     文档变更', value: ':pencil2: docs' },
    { name: '🎉 init:     初始化', value: ':tada: init' },
    { name: '💄 style:    代码的样式美化', value: ':lipstick: style' },
    { name: '♻️  refactor: 重构', value: ':recycle: refactor' },
    { name: '⚡️ perf:     性能优化', value: ':zap: perf' },
    { name: '✅ test:     测试', value: ':white_check_mark: test' },
    { name: '⏪️ revert:   回退', value: ':rewind: revert' },
    { name: '📦️ build:    打包', value: ':package: build' },
    { name: '👷 ci:       CI 相关变更', value: ':construction_worker: ci' },
  ],
  //消息步骤
  messages: {
    type: '请选择提交类型',
    customScope: '请输入修改范围(可选)',
    subject: '请简要描述提交(必填)',
    body: '请输入详细描述(可选)',
    footer: '请输入要关闭的issue(可选)',
    confirmCommit: '确认以上信息提交?(y/n)',
  },
  // allowCustomScopes: true,
  // allowBreakingChanges: [':sparkles: feat', ':bug: fix'],
  //跳过问题
  skipQuestion: ['body', 'footer'],
  //subject文字长度默认是
  subjectLimit: 72,
}
