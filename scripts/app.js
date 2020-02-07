const noteTemplate = {
    title: '',
    subject: '',
    content: '',
    category: 'normal',
};

const app = new Vue({
    el: '#app',
    data: {
        creating: false,
        search: '',
        newNote: { ...noteTemplate },
        notes: []
    },
    methods: {
        createNote(){
            this.newNote = { ...noteTemplate };
            this.creating = true;
        },
        saveNewNote(){
            if(this.newNote.title){
                this.notes.push({ ...this.newNote });
                window.localStorage.setItem('notes', JSON.stringify(this.notes));
                this.creating = false;
            }
        },
        cancelNewNote(){
            this.creating = false;
        },
        isInCategory(note, catName){
            return note.category === catName;
        }
    },
    computed: {
        notesToDisplay: function() {
            if(this.search === ''){
                return this.notes;
            }else{
                return this.notes.filter(note => note.title.includes(this.search) || note.subject.includes(this.search) || note.subject.includes(this.content));
            }
        },
    },
    mounted: function () {
        this.notes = JSON.parse(window.localStorage.getItem('notes')) || [];
    }
});
