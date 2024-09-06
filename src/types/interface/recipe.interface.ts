export default interface Recipe {
    boardNumber: number;
    title: string;
    content: string;
    boardImageList: string[];
    writeDatetime: string;
    writerEmail: string
    writerNickname: string;
    writerProfileImage: string | null;
    type: number;
    cookingTime: number; 
    step1_content: string | null;
    step1_image: string | null;
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
}