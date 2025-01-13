import { strings } from "@/assets/strings";
import { ProfileOpt } from "@/enums/ProfileOpt";

export type ProfileOptionParameter = {
    type: ProfileOpt,
    name: string,
    onSelected: (type: ProfileOpt) => void
}
