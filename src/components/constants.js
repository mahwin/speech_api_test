export const SPEECH_SYSTHESISUTTERANCE_OPTION_MIN_MAX = {
    RATE: { MIN: 0.1, MAX: 10, STEP:0.1 },
    PITCH: { MIN: 0, MAX: 2, STEP:0.1 },
    VOLUMN: { MIN: 0, MAX: 1, STEP:0.1 }
}

export const EVENT_LIST = [
    "경고: 시스템에서 심각한 오류가 발생했습니다. 즉시 확인이 필요합니다.",
    "주의: 예상치 못한 문제가 발생했습니다. 작업을 지속하기 전에 확인이 요구됩니다.",
    "위험: 중요한 시스템 오류가 감지되었습니다. 빠른 대응이 필요합니다.",
    "경고: 심각한 에러가 발생했습니다. 시스템에 큰 영향을 미칠 수 있으므로 주의가 필요합니다."
]

export const SLIDER_ARRAY = ['PITCH', 'RATE', 'VOLUMN'];
