<template>
  <section id="speech-container">
    <div class="text-box">
      <h1> 발생한 이벤트 목록 </h1>
      <p v-for="(eventText,index) in eventQueue" :key="index">
        {{ eventText }}
      </p>
    </div>
    <div class="speech-option">
        <slider-comp v-for="(option, index) in SLIDER_ARRAY" 
          @change="updateSpeechOptionValue"
          :key="index"
          :value="sliderValue[option.toLowerCase()]"
          :min="SPEECH_SYSTHESISUTTERANCE_OPTION_MIN_MAX[option].MIN"
          :max="SPEECH_SYSTHESISUTTERANCE_OPTION_MIN_MAX[option].MAX"
          :step="SPEECH_SYSTHESISUTTERANCE_OPTION_MIN_MAX[option].STEP"
          :title="option"
          :option="option"
        />
      <button class="voiceTypeBtn" @click="toggleVoiceType">
         목소리 타입 : {{ VOICE_TYPE[selected_voice_type] }}
      </button>
      <div class="eventAddBtnContainer">
        <button class="eventAddBtn" @click="addEvent(0)">Event 1 Add</button>
        <button class="eventAddBtn" @click="addEvent(1)">Event 2 Add</button>
      </div>
      <div class="eventAddBtnContainer">
        <button class="eventAddBtn" @click="addEvent(2)">Event 3 Add</button>
        <button class="eventAddBtn" @click="addEvent(3)">Event 4 Add</button>
      </div>
      <button class="muteBtn" @click="toggle"> SOUND {{ isSoundOn ? 'OFF' : 'ON' }}</button>
    </div>
  </section>
</template>

<script>
import SliderComp from './SliderComp.vue';
import { SPEECH_SYSTHESISUTTERANCE_OPTION_MIN_MAX, SLIDER_ARRAY, EVENT_LIST } from './constants';

const VOICE_TYPE = {
  0: 'Google 한국의',
  1: 'Microsoft Heami - Korean (Korean)',
}

export default {
  name: 'SpeechComp',
  components: {
    SliderComp
  },
  
  mounted() {
    this.speechSynthesis = window.speechSynthesis
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },
  
  data() {
    return {

      // 음성 소리 설정

      // 설정할 수 있는 옵션 리스트
      SLIDER_ARRAY,

      // 설정한 값
      sliderValue: {
        pitch:1,
        rate:1,
        volumn:1,
      },

      // 목소리 타입
      selected_voice_type: 0,
      VOICE_TYPE:VOICE_TYPE,
      
      // 각 옵션별 최소, 최대, 스텝 값
      SPEECH_SYSTHESISUTTERANCE_OPTION_MIN_MAX: SPEECH_SYSTHESISUTTERANCE_OPTION_MIN_MAX,
  
      // 음성 객체
      // SpeechSysnthesis 인스턴스 객체
      speechSynthesis: null,
      utterance: null,
      eventQueue: [],
      isSoundOn: false,
      isMakingSound: false,
      interval : null,
    };
  },

  methods: {
    toggle() {
      this.isSoundOn = !this.isSoundOn;
      this.isSoundOn ? this.createSoundInterval() : this.mute();
    },

    toggleVoiceType() {
      this.selected_voice_type = this.selected_voice_type === 0 ? 1 : 0;
    },

    updateSpeechOptionValue({option, value}) {
      this.sliderValue[option.toLowerCase()] = value;
    },

    addEvent(eventIndex) {
      if(!this.isSoundOn) {
        return;
      }
      this.eventQueue.push(EVENT_LIST[eventIndex]);
    },
    mute() {
      this.isSoundOn = false;
      this.eventQueue = [];
      this.speechSynthesis.cancel();
      clearInterval(this.interval);
    },

    createSoundInterval() {
      this.interval = setInterval(() => {
        if (!this.speechSynthesis.speaking && this.eventQueue.length > 0) {
          this.makeSound();
        }
      }, 2000);
    },

    makeSound() {
      const text = this.eventQueue[0];
      this.utterance = new SpeechSynthesisUtterance(text);
      this.utterance.pitch = this.sliderValue.pitch;
      this.utterance.rate = this.sliderValue.rate;
      this.utterance.volume = this.sliderValue.volumn;
      this.utterance.voice = this.speechSynthesis.getVoices().find(voice => voice.name === this.VOICE_TYPE[this.selected_voice_type]);
      
      this.speechSynthesis.cancel();
      this.speechSynthesis.speak(this.utterance);
      
      this.utterance.onend = () => {
        this.eventQueue.shift();
        this.utterance.onend = null;
      };
    }
  },
}
</script>

<style scoped>
#speech-container {
  width: 1200px;
  height: 500px;
  display: flex;
  border: 1px solid #ccc;
  gap: 8px;
  border-radius: 8px;
  padding: 24px 36px;
  > div {
    border: #ccc 4px solid;
    border-radius: 8px;
    padding: 12px;
  }
}

.text-box {
  flex:2;
}
.speech-option {
  flex:1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.muteBtn {
  width: 100%;
  height: 36px;
  background-color: lightsalmon;
  color: white;
  font-size: 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.eventAddBtn {
  width: 100%;
  height: 24px;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.eventAddBtnContainer {
  display: flex;
  width: 100%;
  gap: 8px;
  justify-content: center;
}

.voiceTypeBtn {
  width: 100%;
  height: 36px;
  background-color: lightsalmon;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
</style>
