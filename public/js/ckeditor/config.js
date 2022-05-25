import { CKEditor } from "@ckeditor/ckeditor5-vue";
import { CKEditor } from "@ckeditor/ckeditor5-editor-classic";

CKEditor.editorConfig = function(config){
    config.enterMode = CKEDITOR.ENTER_BR;
}
