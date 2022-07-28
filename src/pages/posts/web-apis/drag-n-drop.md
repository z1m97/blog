---
title: 前端拖拽原理与实践
description: HTML5 拖拽API与自定义拖拽行为
---

[[toc]]

拖拽：用户使用指针设备选择可拖拽元素，将元素拖拽到可放置元素，并释放鼠标按钮以放置这些元素的过程

什么元素是可拖拽的，可拖拽元素产生的反馈类型，以及可放置的元素

## HTML5 拖拽API

### `draggable` 属性

`draggable` 是一个全局枚举类型(非布尔类型)的属性，必须显式的定义为 `true` 或 `false`，否则默认值 为 `auto`，使用浏览器定义的默认行为。选中的部分根据系统的不同会有不同的渲染效果，并在拖拽时跟随着鼠标指针。

```html
<div draggable></div>
<div draggable="true"></div>
```

<div overflow-hidden mb-3>
  <div w-20 h-20 bg-green-500 float-left mr-4 draggable></div>
  <div w-20 h-20 bg-green-500 float-left draggable="true"></div>
</div>



默认情况下，已选中的文本、图片、链接可以拖动，也可以通过 `draggable="false"` 禁用



- 这是一段文本
- <img src="/avatar.png" w-40 h-40 />
- [www.zhipin.com](https://www.zhipin.com)

### 拖拽事件

`DragEvent` 是一个表示拖、放交互的DOM event接口，继承了 `MouseEvent` 和 `Event`

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
<div bg-red-500
  ondragover="event.preventDefault()"
  ondrop="console.log('drop')"></div>
```

<div overflow-hidden mb-3 flex justify-center>
  <div w-20 h-20 bg-green-500 mr-4 draggable="true" 
    ondrag="console.log('drag')"
    ondragstart="event.dataTransfer.setData('text/plain', 'Text to drag');console.log('dragstart')"
    ondragend="console.log('dragend')"
  ></div>
  <div w-20 h-20 bg-blue-500 mr-4
    ondragenter="console.log('dragenter')"
    ondragover="console.log('dragover')"
    ondragleave="console.log('dragleave')"
    ondrop="console.log('drop')"
  ></div>
  <div w-20 h-20 bg-red-500
    ondragover="event.preventDefault()"
    ondrop="console.log('drop')"
  ></div>
</div>

网页的大多数区域都不是放置数据的有效位置，要指定放置目标元素，则需要阻止其 `dragover` 的默认行为才能触发 `drop` 事件，另外放置可发生在同一窗口或另一个应用程序中，两种情况都会触发 `dragend` 事件。


### 数据传递


### 设置拖拽图像

当拖拽发生时，会生成拖拽目标的一个半透明图像（触发"dragstart" 事件的元素），并在拖拽过程中跟踪鼠标指针，这个图像是自动创建的，但可以通过 `setDragImage()` 方法来自定义拖拽反馈图像。

```js
/**
 * image：图像的引用
 * xOffset：图像位置相对于鼠标指针位置的横向偏移量
 * yOffset：图像位置相对于鼠标指针位置的纵向偏移量
 */
event.dataTransfer.setDragImage(image, xOffset, yOffset);
```

图像的引用。这个引用通常是一个 `<img>` 元素，但也可以是 `<canvas>` 或任何其他元素。生成的反馈图像就是该图像在屏幕上的样子，以图像原始的大小绘制。

<DemoDragImg />

### 拖拽效果

拖拽过程中可能会执行一些操作

- `copy` 被拖拽的数据将从当前位置复制到放置位置
- `move` 被拖拽的数据会被移动
- `link` 在源和放置位置之间将会创建某种形式的关系或连接

可以在 `dragstart` 事件监听程序中设置 `effectAllowed` 属性进行指定

```js
event.dataTransfer.effectAllowed = 'copy'
```

可以不同的方式组合这些值：

<DemoDragEffect />

被放置元素可以在 `dragenter` 或 `dragover` 事件中检查 `effectAllowed` 的值，以查看哪些操作是允许的。相关的 `dropEffect` 属性应该在其中的一个事件中设置，来指定应该执行哪一个单项操作。`dropEffect` 是 `none`, `copy`, `move`, 或 `link`，不可使用组合值，只有 `effectAllowed` 和 `dropEffect` 相匹，放置元素的 `drop` 事件才会被触发。

`dropEffect` 在 `dragenter` 或 `dragover` 中初始化为用户请求的效果，但可以通过按下修饰键（如 `Shift`/`Ctrl`）来修改为所需的效果。

在 `drop` 和 `dragend` 事件中，可以检查 `dropEffect` 属性，以确定最终选择了哪种效果。如果所选的效果是 `move`，那么应该在 `dragend` 事件中从拖拽源头删除拖拽数据。

### 放置反馈

向用户反馈哪些区域可以放置有几种方式：

1. 鼠标指针自动根据 `dropEffect` 属性的值进行更新，如 `copy` 显示加号
2. 利用CSS伪类 `-moz-drag-over`
  <DemoDragDrop />

  ```css
  .droparea:-moz-drag-over {
    border: 1px solid black;
  }
  ```
3. 通过 `dragenter` 和 `dragleave` 事件组合更改放置元素的样式
<DemoDragDropEffect />


## 利用鼠标事件实现拖拽

除了使用HTML5 原生的拖拽API实现拖拽外，还可以通过鼠标事件 `MouseEvent` 来实现拖拽

- `mousedown`
- `mouseup`
- `mousemove`

<DemoDragMouse />



## 拖拽相关库

### sortable.js

Vue.Draggable

### vue-draggable-resizable

[playground](https://mauricius.github.io/vue-draggable-resizable/)

### interact.js

