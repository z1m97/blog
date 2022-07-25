---
title: 前端拖拽原理与实践
description: 用户使用指针设备（鼠标）选择可拖拽（draggable）元素，将元素拖拽到可放置（droppable）元素，并释放鼠标按钮以放置这些元素
---

[[toc]]

> 用户使用指针设备（鼠标）选择可拖拽（draggable）元素，将元素拖拽到可放置（droppable）元素，并释放鼠标按钮以放置这些元素

什么元素是可拖拽的，可拖拽元素产生的反馈类型，以及可放置的元素


## draggable属性

`draggable` 是一个全局枚举类型(非布尔类型)的属性，必须显式的定义为 `true` 或 `false`，否则默认值 为 `auto`，使用浏览器定义的默认行为

选中的部分根据系统的不同会有不同的渲染效果，并在拖拽时跟随着鼠标指针

```html
<div draggable></div>
<div draggable="true"></div>
```

<div overflow-hidden mb-3>
  <div w-20 h-20 bg-green-500 float-left mr-4 draggable></div>
  <div w-20 h-20 bg-green-500 float-left draggable="true"></div>
</div>



默认情况下，已选中的文本、图片、链接可以拖动，也可以通过 `draggable="false"` 禁用

<div mb-3 leading-8>这是一段文本</div>

<img src="/avatar.png" w-40 h-40 />

[www.zhipin.com](https://www.zhipin.com)

## 拖拽事件

`DragEvent` 是一个表示拖、放交互的DOM event接口，继承了 `MouseEvent` 和 `Event` 的属性

```js
interface DragEvent extends MouseEvent {
    /** 在拖放交互期间传输的数据 */
    readonly dataTransfer: DataTransfer | null;
}
```

该接口有一个构造函数，但不可能从脚本创建一个有用的 `DataTransfer` 对象，因为在拖放期间，有一个由浏览器分配的处理中和安全模式的 `DataTransfer` 对象
 
```js
declare var DragEvent: {
    prototype: DragEvent;
    new(type: string, eventInitDict?: DragEventInit): DragEvent;
};
```

### 拖拽事件的类型

所有的拖拽事件类型都有一个对应的拖拽全局事件处理属性

| 事件类型 | 属性 | 触发时刻 |
| ---- | ---- | ---- |
| drag | ondrag | 当拖拽元素或选中的文本时触发（每 100 毫秒触发一次） |
| dragstart | ondragstart | 当用户开始拖拽一个元素或选中的文本时触发 |
| dragend  | ondragend | 当拖拽操作结束时触发 (比如松开鼠标按键或敲“Esc”键) |
| dragenter | ondragenter | 当拖拽元素或选中的文本到一个可释放目标时触发 |
| dragleave | ondragleave | 当拖拽元素或选中的文本离开一个可释放目标时触发 |
| dragover | ondragover | 当元素或选中的文本被拖到一个可释放目标上时触发（每 100 毫秒触发一次）|
| drop| ondrop | 当元素或选中的文本在可释放目标上被释放时触发 |


```html
<div bg-green-500 draggable="true" 
  ondrag="console.log('drag')" 
  ondragstart="console.log('dragstart')" 
  ondragend="console.log('ondragend')"></div>
<div bg-blue-500
  ondragenter="console.log('dragenter')"
  ondragleave="console.log('dragleave')" 
  ondragover="console.log('dragover')" 
  ondrop="console.log('drop')"></div>
<div bg-red-500 float-left
  ondragover="return false"
  ondrop="console.log('drop')"></div>
```

<div overflow-hidden mb-3>
  <div w-20 h-20 bg-green-500 float-left mr-4 draggable="true" 
    ondrag="console.log('drag')"
    ondragstart="event.dataTransfer.setData('text/plain', 'Text to drag');console.log('dragstart')"
    ondragend="console.log('dragend')"
  ></div>
  <div w-20 h-20 bg-blue-500 float-left mr-4
    ondragenter="console.log('dragenter')"
    ondragover="console.log('dragover')"
    ondragleave="console.log('dragleave')"
    ondrop="console.log('drop')"
  ></div>
  <div w-20 h-20 bg-red-500 float-left
    ondragover="return false"
    ondrop="console.log('drop')"
  ></div>
</div>

对于放置目标元素，需要阻止其 `dragover` 的默认行为才能触发 `drop` 事件，另外放置可发生在同一窗口或另一个应用程序中，两种情况都会触发 `dragend` 事件

## 拖拽反馈

### 拖拽图像

### 拖拽效果

### 放置反馈

## 数据传递




## 拖拽相关库的实践

### sortable.js(Vue.Draggable)

### interact.js

### vue-draggable-resizable


## 一些简单的实现

1. simple-draggable
