class TextEditorOrg {
    constructor() {
        this.text = "";        
    }

    insert(addtext){
        this.text += addtext;
    }

    remove(){
        this.text = ""
    }



}

const textEditor = new TextEditorOrg();

textEditor.insert("Hello ")
console.log(textEditor.text);

textEditor.insert(" World!")
console.log(textEditor.text); 

textEditor.remove()
console.log(textEditor.text); 

