class App {

    constructor(){

        this.$form = $("form");
        this.$title = $("#title");
        this.$content = $("#content");
        this.$add = $("#add");

        this.notes = [];

        //On declenche des l'instanciation
        this.readNotes();
        this.reinit();
    }

    reinit() {
        this.$form.slideUp(300);
        this.$title.val("");
        this.$content.val("");
    }

    addNote( note ){
        this.notes.push( note );
    }

    saveNote( note ){

        var that = this;
        $.ajax({
            url : "http://localhost/API/note",
            method : "POST",
            data : {
                title : note.title,
                content : note.content
            },
            dataType : "json",
            success : function( data ){

                if( data.success == true ){
                    note.id = data.id;
                    note.display();
                    that.addNote( note );
                }
                else {
                    alert( "Une erreur est survenue lors de l'enregistrement !" );
                }

            },
            error : function( error ){
                console.log( error );
            }
        })

    }

    readNotes(){
        var that = this;
        $.ajax({
            url : "http://localhost/API/notes",
            method : "get",
            dataType : "json",
            success : function( data ){
                
                for( var data_note of data ){
                    var note = new Note( data_note.title, data_note.content );
                    note.id = data_note.id;
                    that.addNote( note );
                }

                that.displayNotes();

            },
            error : function( error ){
                console.log( error );
            }
        });
    }

    displayNotes(){
        for( var note of this.notes ) {
            note.display();
        }
    }

    removeNote(index){
        var note = this.notes[index];
        note.destroy();
        this.notes.splice(index, 1); //supprime 1 élément à l'index indiqué
    }

}