import { useCallback, useEffect, useMemo, useReducer } from "react";

import {
  QUOTE_STEPS,
  TOTAL_STEPS,
  getAnswerText,
} from "../data/quoteQuestions.js";
import { calculateQuote } from "../utils/calculateQuote.js";
import { formatTime } from "../utils/formatQuote.js";

const ADVANCE_DELAY = 350;

const FINAL_MESSAGE =
  "¡Listo! Con tus respuestas generé una estimación preliminar. Revísala en el resumen y, si te parece bien, solicita tu propuesta completa.";

const INITIAL_ANSWERS = {
  projectType: null,
  sections: null,
  integrations: [],
  designStatus: null,
  deadline: null,
  additionalDetails: "",
};

function createInitialMessages() {
  return [
    {
      id: "assistant-intro",
      role: "assistant",
      text: "Hola, soy tu asistente de cotización. Comencemos con algunos datos sobre tu proyecto.",
      time: formatTime(),
    },
    {
      id: `assistant-${QUOTE_STEPS[0].id}`,
      role: "assistant",
      text: QUOTE_STEPS[0].question,
      time: formatTime(),
    },
  ];
}

function createInitialState() {
  return {
    stepIndex: 0,
    answers: { ...INITIAL_ANSWERS, integrations: [] },
    messages: createInitialMessages(),
    detailDraft: "",
    status: "idle",
  };
}

function applyAnswer(state, value, text) {
  const step = QUOTE_STEPS[state.stepIndex];
  if (!step) return state;

  const answers = { ...state.answers, [step.id]: value };
  const messages = [
    ...state.messages,
    {
      id: `user-${step.id}`,
      role: "user",
      text: text ?? getAnswerText(step, value),
      time: formatTime(),
    },
  ];

  const isLast = state.stepIndex >= TOTAL_STEPS - 1;

  if (isLast) {
    return {
      ...state,
      answers,
      messages: [
        ...messages,
        {
          id: "assistant-complete",
          role: "assistant",
          text: FINAL_MESSAGE,
          time: formatTime(),
        },
      ],
      status: "complete",
    };
  }

  return { ...state, answers, messages, status: "advancing" };
}

function reducer(state, action) {
  switch (action.type) {
    case "ANSWER":
      return applyAnswer(state, action.value);

    case "ANSWER_INTEGRATIONS":
      return applyAnswer(state, [...state.answers.integrations]);

    case "ANSWER_DETAIL":
      return applyAnswer(state, state.detailDraft);

    case "SHOW_NEXT": {
      const nextIndex = state.stepIndex + 1;
      if (nextIndex >= TOTAL_STEPS) return state;
      const step = QUOTE_STEPS[nextIndex];

      return {
        ...state,
        stepIndex: nextIndex,
        messages: [
          ...state.messages,
          {
            id: `assistant-${step.id}`,
            role: "assistant",
            text: step.question,
            time: formatTime(),
          },
        ],
        status: "idle",
      };
    }

    case "TOGGLE_INTEGRATION": {
      const current = state.answers.integrations;
      let next;

      if (action.value === "none") {
        next = current.includes("none") ? [] : ["none"];
      } else {
        const withoutNone = current.filter((item) => item !== "none");
        next = withoutNone.includes(action.value)
          ? withoutNone.filter((item) => item !== action.value)
          : [...withoutNone, action.value];
      }

      return {
        ...state,
        answers: { ...state.answers, integrations: next },
      };
    }

    case "SET_DETAIL":
      return { ...state, detailDraft: action.value };

    case "RESET":
      return createInitialState();

    default:
      return state;
  }
}

export default function useQuoteFlow() {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  const { stepIndex, answers, messages, detailDraft, status } = state;

  const activeStep = stepIndex < TOTAL_STEPS ? QUOTE_STEPS[stepIndex] : null;
  const isComplete = status === "complete";
  const isIdle = status === "idle";

  useEffect(() => {
    if (status !== "advancing") return undefined;
    const timer = setTimeout(() => dispatch({ type: "SHOW_NEXT" }), ADVANCE_DELAY);
    return () => clearTimeout(timer);
  }, [status]);

  const selectOption = useCallback((value) => {
    dispatch({ type: "ANSWER", value });
  }, []);

  const toggleIntegration = useCallback((value) => {
    dispatch({ type: "TOGGLE_INTEGRATION", value });
  }, []);

  const continueMulti = useCallback(() => {
    dispatch({ type: "ANSWER_INTEGRATIONS" });
  }, []);

  const setDetail = useCallback((value) => {
    dispatch({ type: "SET_DETAIL", value: value.slice(0, 500) });
  }, []);

  const submitDetail = useCallback(() => {
    dispatch({ type: "ANSWER_DETAIL" });
  }, []);

  const skipDetail = useCallback(() => {
    dispatch({ type: "ANSWER", value: "" });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const progress = useMemo(() => {
    const current = isComplete ? TOTAL_STEPS : Math.min(stepIndex + 1, TOTAL_STEPS);
    return { current, total: TOTAL_STEPS };
  }, [isComplete, stepIndex]);

  const quote = useMemo(() => calculateQuote(answers), [answers]);

  const selectedValues = useMemo(() => {
    if (!activeStep) return [];
    if (activeStep.type === "multiple") return answers.integrations;
    const value = answers[activeStep.id];
    return value == null ? [] : [value];
  }, [activeStep, answers]);

  return {
    messages,
    activeStep,
    progress,
    status,
    isComplete,
    isIdle,
    answers,
    quote,
    detailDraft,
    selectedValues,
    selectOption,
    toggleIntegration,
    continueMulti,
    setDetail,
    submitDetail,
    skipDetail,
    reset,
  };
}