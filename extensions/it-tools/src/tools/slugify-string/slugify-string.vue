<script setup lang="ts">
import slugify from '@sindresorhus/slugify';
import { withDefaultOnError } from '@/utils/defaults';
import { useCopy } from '@/composable/copy';

const input = ref('');
const slug = computed(() => withDefaultOnError(() => slugify(input.value), ''));
const { copy } = useCopy({ source: slug, text: '已复制到剪切板' });
</script>

<template>
  <div>
    <c-input-text v-model:value="input" multiline placeholder="输入需要处理的文本 (ex: My file path)" label="需要slugify的字符串" autofocus raw-text mb-5 />

    <c-input-text :value="slug" multiline readonly placeholder="您的slug将会生成在这里 (ex: my-file-path)" label="您的slug值" mb-5 />

    <div flex justify-center>
      <c-button :disabled="slug.length === 0" @click="copy()">
        复制slug
      </c-button>
    </div>
  </div>
</template>
