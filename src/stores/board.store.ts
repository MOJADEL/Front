import { create } from 'zustand';

interface BoardStore {
    title: string;
    content: string;
    price: number;
    tradeLocation: string;
    cookingTime: number;
    step1_content: string ;
    step1_image: string ;
    step2_content: string | null;
    step2_image: string | null;
    step3_content: string | null;
    step3_image: string | null;
    step4_content: string | null;
    step4_image: string | null;
    step5_content: string | null;
    step5_image: string | null;
    step6_content: string | null;
    step6_image: string | null;
    step7_content: string | null;
    step7_image: string | null;
    step8_content: string | null;
    step8_image: string | null;
    boardImageFileList: File[];
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    setPrice: (price: number) => void;
    setTradeLocation: (tradeLocation: string) => void;
    setCookingTime: (cookingTime: number) => void;
    setStep1Content: (content: string ) => void;
    setStep1Image: (image: string ) => void;
    setStep2Content: (content: string | null) => void;
    setStep2Image: (image: string | null) => void;
    setStep3Content: (content: string | null) => void;
    setStep3Image: (image: string | null) => void;
    setStep4Content: (content: string | null) => void;
    setStep4Image: (image: string | null) => void;
    setStep5Content: (content: string | null) => void;
    setStep5Image: (image: string | null) => void;
    setStep6Content: (content: string | null) => void;
    setStep6Image: (image: string | null) => void;
    setStep7Content: (content: string | null) => void;
    setStep7Image: (image: string | null) => void;
    setStep8Content: (content: string | null) => void;
    setStep8Image: (image: string | null) => void;
    setBoardImageFileList: (boardImageFileList: File[]) => void;
    resetBoard: () => void;
}

const useBoardStore = create<BoardStore>((set) => ({
    title: '',
    content: '',
    price: 0,
    tradeLocation: '',
    cookingTime: 0,
    step1_content: '',
    step1_image: '',
    step2_content: null,
    step2_image: null,
    step3_content: null,
    step3_image: null,
    step4_content: null,
    step4_image: null,
    step5_content: null,
    step5_image: null,
    step6_content: null,
    step6_image: null,
    step7_content: null,
    step7_image: null,
    step8_content: null,
    step8_image: null,
    boardImageFileList: [],
    setTitle: (title) => set({ title }),
    setContent: (content) => set({ content }),
    setPrice: (price) => set({ price }),
    setTradeLocation: (tradeLocation) => set({ tradeLocation }),
    setCookingTime: (cookingTime) => set({ cookingTime }),
    setStep1Content: (content) => set({ step1_content: content }),
    setStep1Image: (image) => set({ step1_image: image }),
    setStep2Content: (content) => set({ step2_content: content }),
    setStep2Image: (image) => set({ step2_image: image }),
    setStep3Content: (content) => set({ step3_content: content }),
    setStep3Image: (image) => set({ step3_image: image }),
    setStep4Content: (content) => set({ step4_content: content }),
    setStep4Image: (image) => set({ step4_image: image }),
    setStep5Content: (content) => set({ step5_content: content }),
    setStep5Image: (image) => set({ step5_image: image }),
    setStep6Content: (content) => set({ step6_content: content }),
    setStep6Image: (image) => set({ step6_image: image }),
    setStep7Content: (content) => set({ step7_content: content }),
    setStep7Image: (image) => set({ step7_image: image }),
    setStep8Content: (content) => set({ step8_content: content }),
    setStep8Image: (image) => set({ step8_image: image }),
    setBoardImageFileList: (boardImageFileList) => set({ boardImageFileList }),
    resetBoard: () =>
        set(() => ({
            title: '',
            content: '',
            price: 0,
            tradeLocation: '',
            cookingTime: 0,
            step1_content: '',
            step1_image: '',
            step2_content: null,
            step2_image: null,
            step3_content: null,
            step3_image: null,
            step4_content: null,
            step4_image: null,
            step5_content: null,
            step5_image: null,
            step6_content: null,
            step6_image: null,
            step7_content: null,
            step7_image: null,
            step8_content: null,
            step8_image: null,
            boardImageFileList: [],
        })),
}));

export default useBoardStore;