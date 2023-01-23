class TextEditor {
    constructor() {
        this.text = "";
        this.history = [];
        this.currentCommand = 0;
    }

    executeCommand(command) {
        command.execute();
        this.history.push(command);
        this.currentCommand++;
    }

    undo() {
        if (this.currentCommand > 0) {
            this.history[this.currentCommand - 1].undo();
            this.currentCommand--;
        }
    }

    redo() {
        if (this.currentCommand < this.history.length) {
            this.history[this.currentCommand].execute();
            this.currentCommand++;
        }
    }

}

class InsertCommand {
    constructor(textEditor, text) {
        this.textEditor = textEditor;
        this.text = text;
    }

    execute() {
        this.textEditor.text += this.text;
    }

    undo() {
        this.textEditor.text = this.textEditor.text.slice(0, -this.text.length);
    }
}


class DeleteCommand {
    constructor(textEditor, start, end) {
        this.textEditor = textEditor;
        this.start = start;
        this.end = end;
        this.deletedText = textEditor.text.slice(start, end);
    }

    execute() {
        this.textEditor.text = this.textEditor.text.slice(0, this.start) + this.textEditor.text.slice(this.end);
    }

    undo() {
        this.textEditor.text = this.textEditor.text.slice(0, this.start) + this.deletedText + this.textEditor.text.slice(this.start);
    }
}


const textEditor = new TextEditor();
console.log(textEditor.text); // Output: ""

const insertCommand = new InsertCommand(textEditor, "Hello, ");
textEditor.executeCommand(insertCommand);
console.log(textEditor.text); // Output: "Hello, "

const insertCommand2 = new InsertCommand(textEditor, "world!");
textEditor.executeCommand(insertCommand2);
console.log(textEditor.text); // Output: "Hello, world!"

textEditor.undo();
console.log(textEditor.text);

textEditor.redo();
console.log(textEditor.text);


textEditor.redo();
console.log(textEditor.text);

const deleteCommand = new DeleteCommand(textEditor, 7, 12);
textEditor.executeCommand(deleteCommand);
console.log(textEditor.text); // Output: "Hello, !"

textEditor.undo();
console.log(textEditor.text);

textEditor.redo();
console.log(textEditor.text);

