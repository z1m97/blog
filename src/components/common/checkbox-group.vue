<template>
  <div class="flex items-center mt-4 mb-4 -mr-6 flex-wrap">
    <div
      class="mr-6 mb-2 flex items-center"
      v-for="(item, idx) in options"
      :key="`${item.value}${idx}`"
    >
      <input
        :id="`${compId}-${idx}`"
        type="checkbox"
        :checked="modelValue.includes(item.value)"
        @change="onChange(item.value)"
      />
      <label :for="`${compId}-${idx}`" ml-2 cursor-pointer>{{ item.label }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { nanoid } from 'nanoid'
  const compId = nanoid()

  type ValueType = string | number | boolean
  type Option = {
    value: ValueType
    label: string
  }
  const props = defineProps<{
    modelValue: ValueType[]
    options: Option[]
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: ValueType): void
    (event: 'change', value: ValueType[]): void
  }>()

  const onChange = (value: ValueType) => {
    emits('update:modelValue', value)
    emits('change', props.modelValue)
  }
</script>
