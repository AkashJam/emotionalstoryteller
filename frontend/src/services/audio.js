import Vue from 'vue'
import RecordRTC from 'recordrtc';
// import api from './api';


let recorder = new Vue({
    data() {
        return {
            mediaRecorder: null,
            audioChunks: [],
            audioBlob: null,
            outputSource: null
        }
    },
    methods: {
        configure: function() {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    // this.mediaRecorder = new window.MediaRecorder(stream);
                    // this.audioChunks = [];
                
                    // this.mediaRecorder.addEventListener("dataavailable", event => {
                    //     this.audioChunks.push(event.data);
                    // });

                    // this.mediaRecorder.addEventListener('stop', () => {
                    //     this.audioBlob = new window.Blob(this.audioChunks);
                    //     const audioUrl = window.URL.createObjectURL(this.audioBlob);
                    //     const audioFile = new Audio(audioUrl);
                    //     audioFile.play();
                    // });

                    this.mediaRecorder = RecordRTC(stream, {
                        type: 'audio',
                        mimeType: 'audio/webm',
                        sampleRate: 44100, // this sampleRate should be the same in your server code
        
                        // MediaStreamRecorder, StereoAudioRecorder, WebAssemblyRecorder
                        // CanvasRecorder, GifRecorder, WhammyRecorder
                        recorderType: RecordRTC.StereoAudioRecorder,
        
                        // Dialogflow / STT requires mono audio
                        numberOfAudioChannels: 1,
        
                        // get intervals based blobs
                        // value in milliseconds
                        // as you might not want to make detect calls every seconds
                        timeSlice: 4000,
        
                        // only for audio track
                        // audioBitsPerSecond: 128000,
        
                        // used by StereoAudioRecorder
                        // the range 22050 to 96000.
                        // let us force 16khz recording:
                        desiredSampRate: 16000
                    });
            
                });
        },
        startRec: function() {
            this.mediaRecorder.reset();
            this.mediaRecorder.startRecording();
        },
        stopRec: async function() {

            return new Promise((resolve, reject) => {

                this.mediaRecorder.stopRecording(() => {

                    // after stopping the audio, get the audio data
                    this.mediaRecorder.getDataURL(async (audioDataURL) => {
                        if(!audioDataURL) {
                            reject(null);
                        }
                        var files = {
                            audio: {
                                type: this.mediaRecorder.getBlob().type || 'audio/wav',
                                dataURL: audioDataURL
                            }
                        };
                        // submit the audio file to the server
                        this.audioBlob = files;
                        resolve(this.audioBlob);
                        
                    });
                });   

            });
           
        },
        getLastAudio: function() {
            return this.audioBlob;
        },
        playMessage: async(arrayBuffer, endHandler) => {
            let buffer = new Uint8Array(arrayBuffer).buffer;            
            let audioContext = new AudioContext();
            try {
                if(buffer.byteLength > 0){
                    console.log(buffer.byteLength);
                    audioContext.decodeAudioData(
                        buffer,
                        function(buffer){
                            audioContext.resume();
                            recorder.outputSource = audioContext.createBufferSource();
                            recorder.outputSource.connect(audioContext.destination);
                            recorder.outputSource.buffer = buffer;
                            recorder.outputSource.onended = endHandler;
                            recorder.outputSource.start(0);

                        },
                        function() {
                            console.log(arguments);
                        }
                    );
                }
            } catch(e) {
                console.log(e);
            }
        },
        stopPlayingMessage: () => {
            recorder.outputSource.stop();
        }
    },
    created() {
        this.configure();
    }
});

export default recorder;