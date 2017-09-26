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
                    note.display();
                }

            },
            error : function( error ){
                console.log( error );
            }
        });
    }

    removeNote(index){
        var note = this.notes[index];
        var that = this;
        $.ajax({
            url : "http://localhost/API/note/" + note.id,
            method : "DELETE",
            dataType : "json",
            success : function( data ){

                if( data.success == true ){
                    note.destroy();
                    that.notes.splice(index, 1);
                }
                else {
                    alert("Un problème est survenu lors de la suppression !");
                }

            },
            error : function( error ){
                console.log(error);
            }
        });
    }

}