<template>
    <div class="slider-container">
      <div class="slider-label">
        <span class="slider-title">{{ title }}</span>
        <span class="slider-value">
          {{ displayValue }}
        </span>
      </div>
      <input 
        type="range" 
        :min="min" 
        :max="max"
        :step="step"
        :value="value" 
        @input="updateValue"
        ref="slider"
      >
    </div>
  </template>
  
  <script>
  export default {
    name: 'SliderComp',
    
    props: {
      value: {
        type: [Number, String],
        required: true
      },
      min: {
        type: [Number, String],
        required: true
      },
      max: {
        type: [Number, String],
        required: true
      },
      step: {
        type: [Number, String],
        required: true
      },
      title: {
        type: String, 
        required: true
      },
      option :{
        type: String,
        required: true
      }
    },
    computed: {
      displayValue() {
        return `${this.value}`
      }
    },
  
    methods: {
      updateValue(event) {
        const newValue = Number(Number(event.target.value).toFixed(1));
        this.$emit('change', {option: this.option, value : newValue})
        
        this.updateSliderBackground()
      },
  
      updateSliderBackground() {
        const value = ((this.value - this.min) / (this.max - this.min)) * 100
        this.$refs.slider.style.background = 
          `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${value}%, #e2e8f0 ${value}%, #e2e8f0 100%)`
      }
    },
  
    mounted() {
      // 초기 배경 설정
      this.updateSliderBackground()
    },
  
    watch: {
      value: {
        handler() {
          this.$nextTick(() => {
            this.updateSliderBackground()
          })
        },
        immediate: true
      }
    }
  }
  </script>
  
  <style scoped>
  .slider-container {
    width: 100%;
    background: white;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    transition: .2s ease-in-out;

  }
  
  .slider-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .slider-title {
    font-size: 1.1rem;
    font-weight: 500;
    color: #2c3e50;
  }
  
  .slider-value {
    padding: 0.3rem 0.8rem;
    background: #e0e7ff;
    border-radius: 20px;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  /* 기본 슬라이더 스타일 제거 */
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    outline: none;
    padding: 0;
    margin: 0;
  }
  
  /* Webkit (Chrome, Safari, Opera) */
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    background: #4f46e5;
    border-radius: 50%;
    transform: translateY(-30%);
    border: none;
    cursor: pointer;
    transition: .2s ease-in-out;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
  

  
  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    background: #e2e8f0;
    border-radius: 4px;
  }
  
  /* 비활성화 상태 스타일 */
  input[type="range"]:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  input[type="range"]:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
    background: #a0aec0;
  }
  
  /* 값 변경 애니메이션 */
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  .value-change {
    animation: pulse 0.3s ease-in-out;
  }
</style>