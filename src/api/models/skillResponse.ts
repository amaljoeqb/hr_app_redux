export interface SkillGlobal {
    id: number;
    skill: string;
}

export interface SkillResponse {
    data: SkillGlobal[];
    message: string;
}