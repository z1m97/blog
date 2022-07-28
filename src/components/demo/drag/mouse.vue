<template>
  <div class="w-full">
    <button
      @click="vm.add"
      class="rounded-sm shadow bg-blue-500 hover:bg-blue-400 transition-all ease-in-out duration-300 text-white px3 py-1 text-xs mb-4"
    >
      添加
    </button>
    <div
      ref="root"
      class="relative w-full aspect-3/2 rounded"
      :class="{
        'cursor-move': vm.moveId,
      }"
    >
      <template v-if="vm">
        <div
          v-for="item in vm.list"
          :key="item.id"
          :style="vm.genStyle(item)"
          :class="{
            '!bg-purple-400/40 border-purple-500': vm.moveId === item.id,
          }"
          class="absolute bg-green-500/40 border border-green-500"
          @mousedown="vm.onDown($event, item)"
        >
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { nanoid } from 'nanoid'

  type Pos = {
    x: number
    y: number
  }

  type Size = {
    w: number
    h: number
  }
  type Grid = {
    color: string
    bgColor: string
    rows?: number
    cols?: number
    w: number
    h: number
  }

  class VM {
    id = nanoid()
    grid: Grid = {
      color: '#fff',
      bgColor: 'rgb(242, 242, 242)',
      rows: 30,
      // cols: 20, // 不设置则根据rows计算
      w: 0, // 单元格尺寸
      h: 0,
    }

    // 数据列表
    list = []
    // 拖拽中的id
    moveId: string = null
    moveStartPos: Pos = null
    moveEndPos: Pos = null

    init(root: HTMLElement) {
      root.id = this.id
      this.dragGridBg(root)

      // 不能在当前节点定义因为鼠标也能移出当前节点
      useEventListener(window, 'mousemove', (evt) => this.moveId && this.onMove(evt))
      useEventListener(window, 'mouseup', (evt) => this.onUp(evt))
    }
    add() {
      const obj = new Obj()
      this.list.push(obj)
    }
    // 生成Obj的style
    genStyle(item: Obj) {
      const attrs = [
        `width:${this.grid.w * item.size.w}px`,
        `height:${this.grid.h * item.size.h}px`,
        `z-index:${item.zIndex}`,
        `left:${this.grid.w * item.pos.x}px`,
        `top:${this.grid.h * item.pos.y}px`,
      ]
      if (this.moveId && item.id === this.moveId) {
        const dist = this.getMoveDist()
        dist && attrs.push(`transform: translate(${dist.distX}px, ${dist.distY}px)`)
      }
      return attrs.join(';')
    }
    // 绘制网格背景
    dragGridBg(root: HTMLElement) {
      const canvas = document.createElement('canvas')
      canvas.id = `${this.id}-grid-bg`
      const rect = root.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      const grid = this.grid
      const scale = window.devicePixelRatio
      canvas.width = width * scale
      canvas.height = height * scale
      canvas.className = 'absolute top-0 left-0 z-0 w-full h-full pointer-events-none'

      const ctx = canvas.getContext('2d')
      ctx.strokeStyle = grid.color
      ctx.lineWidth = 1
      ctx.scale(scale, scale)

      ctx.fillStyle = grid.bgColor
      ctx.fillRect(0, 0, width, height)

      let rows = grid.rows || 0
      let cols = grid.cols || 0

      const setCell = () => {
        if (!rows && cols) {
          rows = (width * cols) / height
        } else if (!cols && rows) {
          cols = (height * rows) / width
        } else if (!rows && !cols) {
          rows = 40
          setCell()
        }
      }
      setCell()

      const w = width / rows
      const h = height / cols

      for (let i = 1; i < rows; i++) {
        ctx.beginPath()
        const x = w * i
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.closePath()
        ctx.stroke()
      }
      for (let i = 1; i < cols; i++) {
        ctx.beginPath()
        const y = h * i
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.closePath()
        ctx.stroke()
      }

      root.appendChild(canvas)
      this.grid.w = w
      this.grid.h = h
    }
    onDown(evt: MouseEvent, item: Obj) {
      this.moveId = item.id

      this.moveStartPos = {
        x: evt.clientX,
        y: evt.clientY,
      }
    }
    onMove(evt: MouseEvent) {
      this.moveEndPos = {
        x: evt.clientX,
        y: evt.clientY,
      }
    }
    onUp(evt: MouseEvent) {
      const pos = this.getMoved()
      const moveItem = this.list.find((i) => i.id === this.moveId)
      moveItem.pos.x += pos?.rows || 0
      moveItem.pos.y += pos?.cols || 0

      this.moveId = null
      this.moveStartPos = null
      this.moveEndPos = null
    }
    getMoved() {
      const dist = this.getMoveDist()
      if (dist) {
        const { distX, distY } = dist
        const rows = Math.round(distX / this.grid.w)
        const cols = Math.round(distY / this.grid.h)
        return { rows, cols }
      }
      return null
    }
    getMoveDist() {
      if (!this.moveEndPos || !this.moveStartPos) return
      return {
        distX: this.moveEndPos.x - this.moveStartPos.x,
        distY: this.moveEndPos.y - this.moveStartPos.y,
      }
    }
  }

  class Obj {
    id = nanoid()
    pos: Pos = {
      x: 1,
      y: 1,
    }
    size: Size = {
      w: 4,
      h: 4,
    }
    zIndex = 100
  }

  let vm = reactive<VM>(new VM())
  const root = ref<HTMLElement>()

  onMounted(() => {
    vm.init(root.value)
  })
</script>
