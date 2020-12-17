import Vue from 'vue'

let recorder = new Vue({
    data() {
        return {
            mediaRecorder: null,
            audioChunks: [],
            audioBlob: null
        }
    },
    methods: {
        configure: function() {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    this.mediaRecorder = new window.MediaRecorder(stream);
                    this.audioChunks = [];
                
                    this.mediaRecorder.addEventListener("dataavailable", event => {
                        this.audioChunks.push(event.data);
                    });
            
                });
        },
        start: function() {
            this.mediaRecorder.start();
        },
        stop: function() {

            this.mediaRecorder.addEventListener('stop', () => {
                this.audioBlob = new window.Blob(this.audioChunks);
                const audioUrl = window.URL.createObjectURL(this.audioBlob);
                const audioFile = new Audio(audioUrl);
                audioFile.play();
              });
            
            this.mediaRecorder.stop();
                    
        },
        getLastAudio: function() {
            return this.audioBlob;
        }
    },
    created() {
        this.configure();
    }
});

export default recorder;