---
title: Web文本编辑器原理与开发
description: Web API在文本编辑器中的综合实践
---

文本编辑器是一项用途广泛的应用，比如说各大文本媒介的网站创作者中心、leetcode中的代码编辑器、到大名鼎鼎的VS Code编辑器，在很多页面和应用中可以看到他的身影，而它需要用到的基础的API并不复杂，包括Selection、contenteditable属性，以及其他第三方的文本解析渲染库，如markdown解析、AST语法树的构建与渲染等等

本篇文章计划从两个方面来入手，最终目的是完成一个具有广泛应用场景，具有较强扩展性的文本编辑器插件

谋定而后动，首先从下功能、接口以及最终构建产品方面进行相应的规划

功能
[]
用我自己开发的xmind图展示

接口
[]
用我自己开发的xmind图展示

生产环境
可用于react、vue、sevlte环境
兼容性处理