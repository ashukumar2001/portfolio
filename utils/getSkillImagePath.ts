import { SKILLS_BASE_PATH } from "@/constants";

export const getSkillImagePath = (src: string) => {
    return SKILLS_BASE_PATH + src;
};