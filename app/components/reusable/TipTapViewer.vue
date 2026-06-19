<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { watch } from "vue";

const props = defineProps<{ content: string }>();

const editor = useEditor({
  editable: false,
  extensions: [
    StarterKit.configure({
      bulletList: { HTMLAttributes: { class: "list-disc ml-6 my-2" } },
      orderedList: { HTMLAttributes: { class: "list-decimal ml-6 my-2" } },
      listItem: { HTMLAttributes: { class: "my-1" } },
      heading: { levels: [1, 2, 3], HTMLAttributes: { class: "font-bold" } },
    }),
    TextAlign.configure({ types: ["heading", "paragraph"] }),
  ],
  content: (() => {
    try {
      return props.content ? JSON.parse(props.content) : "";
    } catch {
      return props.content;
    }
  })(),
  editorProps: {
    attributes: {
      class:
        "tiptap prose prose-slate prose-sm md:prose-base max-w-none text-slate-600 leading-relaxed focus:outline-none cursor-default prose-headings:text-slate-950 prose-headings:font-bold prose-p:my-2 prose-li:my-1 prose-strong:text-slate-900",
    },
  },
});

watch(
  () => props.content,
  (newContent) => {
    if (editor.value && newContent) {
      try {
        editor.value.commands.setContent(JSON.parse(newContent));
      } catch {
        editor.value.commands.setContent(newContent);
      }
    }
  },
);
</script>

<template>
  <EditorContent v-if="editor" :editor="editor" />
</template>
